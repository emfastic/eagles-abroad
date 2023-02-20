import { supabase } from "../../../lib/supabaseClient";
import React, { useEffect, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import SearchModal from "components/SearchModal";
import { count } from "console";

export async function getStaticPaths() {
  const paths = [
    "Africa",
    "Europe",
    "Middle East",
    "Asia",
    "Australia Pacific Islands",
    "South America",
    "Other",
    "Central America",
    "North America",
  ].map((country) => {
    return {
      params: { region: country.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  let { region } = params;
  if (region === "Australia Pacific Islands") {
    region = "Australia/Pacific Islands";
  }
  let countryObject: any = {};
  let universityList: string[] = [];

  const { data, error } = await supabase
    .from("abroad-locations")
    .select("*")
    .eq("continent", region);

  if (data) {
    data.forEach((university: any) => {
      if (countryObject[university.country]) {
        countryObject[university.country].push(university.university);
      } else {
        countryObject[university.country] = [university.university];
      }
      universityList.push(university.university);
    });
  } else {
    console.log(error);
  }

  return {
    props: {
      region: region,
      countryObject: countryObject,
      universityList: universityList,
    },
  };
}

export default function Region({ region, countryObject, universityList }: any) {
  console.log(Object.keys(countryObject).length);
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();

  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding="5"
        borderBottom="1px solid gray"
      >
        <Heading size="lg">Eagles Abroad</Heading>
        <InputGroup ml="5" size="lg" w="lg" onClick={onSearchOpen}>
          <InputLeftElement cursor={"pointer"}>
            <Search2Icon />
          </InputLeftElement>
          <Input
            placeholder={`Search ${region} programs`}
            onClick={onSearchOpen}
          />
        </InputGroup>
      </Flex>
      <SearchModal
        isSearchOpen={isSearchOpen}
        onSearchClose={onSearchClose}
        region={region}
        universityList={universityList}
      />
    </>
  );
}
