import { supabase } from "../../../lib/supabaseClient";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  useDisclosure,
  Card,
  CardBody,
  WrapItem,
  Wrap,
  Button,
  IconButton,
  HStack,
  Spinner,
  Center,
  Show,
  Hide,
} from "@chakra-ui/react";
import SearchModal from "components/SearchModal";
import CountryModal from "../../../components/CountryModal";
import { useRouter } from "next/router";
import LoginModal from "components/LoginModal";
import Footer from "components/Footer";
import EmailModal from "components/EmailModal";
import CustomHead from "components/CustomHead";
import ProfileModal from "components/ProfileModal";

const africaImages = [
  "https://images.unsplash.com/photo-1539768942893-daf53e448371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
  "https://images.unsplash.com/photo-1589104602532-9cee07f8f62c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1328&q=80",
  "https://images.unsplash.com/photo-1570742544137-3a469196c32b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80",
  "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80",
  "https://images.unsplash.com/photo-1546422724-3c4be0b20cb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
  "https://images.unsplash.com/photo-1613864309738-9102a9e22883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
  "https://images.unsplash.com/photo-1557849582-5875ac6dee83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2008&q=80",
];

const europeImages = [
  "https://images.unsplash.com/photo-1463725876303-ff840e2aa8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1567031538362-ee02eefeb68d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1575038860053-e7263d2248c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1533331639-74f1863c7b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1513622118278-bc041b3c13ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
  "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1923&q=80",
  "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1524178388361-dc46c4ddc076?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1602354817989-b9664561ae84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1846&q=80",
  "https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1518124880777-cf8c82231ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1832&q=80",
  "https://images.unsplash.com/photo-1519197924294-4ba991a11128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80",
  "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1620563092215-0fbc6b55cfc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
  "https://images.unsplash.com/photo-1473896100090-53523650d4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80",
];

const middleEastImages = [
  "https://images.unsplash.com/photo-1547483029-77784da27709?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
];

const asiaImages = [
  "https://images.unsplash.com/photo-1547150492-da7ff1742941?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80",
  "https://images.unsplash.com/photo-1476158085676-e67f57ed9ed7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80",
  "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
  "https://images.unsplash.com/photo-1604269949318-10589797d025?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&q=80",
  "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1464&q=80",
  "https://images.unsplash.com/photo-1580424917967-a8867a6e676e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  "https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  "https://images.unsplash.com/photo-1506816561089-5cc37b3aa9b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1875&q=80",
  "https://images.unsplash.com/photo-1470004914212-05527e49370b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
];

const australiaPacificIslandsImages = [
  "https://images.unsplash.com/photo-1546268060-2592ff93ee24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
];

const southAmericaImages = [
  "https://images.unsplash.com/photo-1617548437735-92d875423353?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1551312183-66bca7944e4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80",
  "https://images.unsplash.com/photo-1557974040-3bec341da09b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1580918860823-f0072f5a6719?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
];

const otherImages = [
  "https://images.unsplash.com/photo-1578325413871-62d979ef9629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
];

const centralAmericaImages = [
  "https://images.unsplash.com/photo-1611602316663-92dc58e199ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  "https://images.unsplash.com/photo-1621458036159-7291e0932296?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1540610410855-b4c8877b761c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1948&q=80",
];

const northAmericaImages = [
  "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
];

const regionImages: any = {
  Africa: africaImages,
  Europe: europeImages,
  "Middle East": middleEastImages,
  Asia: asiaImages,
  "Australia/Pacific Islands": australiaPacificIslandsImages,
  "South America": southAmericaImages,
  Other: otherImages,
  "Central America": centralAmericaImages,
  "North America": northAmericaImages,
};

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
  ].map((region) => {
    return {
      params: { region: region.toString() },
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
    .from("full-abroad-locations")
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
  const [isLoading, setIsLoading] = useState(true);

  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();

  const {
    isOpen: isCountryModalOpen,
    onOpen: onCountryModalOpen,
    onClose: onCountryModalClose,
  } = useDisclosure();

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  const {
    isOpen: isEmailOpen,
    onOpen: onEmailOpen,
    onClose: onEmailClose,
  } = useDisclosure();

  const [profile, setProfile] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id);

        if (!data) {
          console.log(error);
        } else {
          setProfile(data[0]);
        }
      }
      setIsLoading(false);
    }

    getUser();
  }, []);

  const [country, setCountry] = useState("");
  const [countryUniversityList, setCountryUniversityList] = useState<string[]>(
    []
  );

  function handleCountryClick(country: string) {
    setCountry(country);
    setCountryUniversityList(countryObject[country]);
    onCountryModalOpen();
  }

  const countryCards = Object.keys(countryObject)
    .sort()
    .map((country, idx) => {
      return (
        <WrapItem key={idx}>
          <Card
            h={["md", "lg"]}
            w={["sm", "2xl"]}
            bgImage={`linear-gradient(rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0)), url(${regionImages[region][idx]})`}
            bgPosition="center"
            bgSize="cover"
            onClick={() => handleCountryClick(country)}
            cursor="pointer"
          >
            <CardBody
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Heading color="#FFF" size="2xl">
                {country}
              </Heading>
            </CardBody>
          </Card>
        </WrapItem>
      );
    });

  return !isLoading ? (
    <>
      <CustomHead />
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding={["3", "5"]}
        borderBottom="1px solid gray"
      >
        <HStack align="center">
          <IconButton
            aria-label="back"
            icon={<ChevronLeftIcon />}
            bg="maroon"
            _hover={{ backgroundColor: "#610018" }}
            color="gold"
            size="lg"
            onClick={() => router.push("/")}
          />
          {profile ? (
            <ProfileModal profile={profile} />
          ) : (
            <Button
              size="lg"
              bgColor={"maroon"}
              _hover={{ backgroundColor: "#610018" }}
              color="gold"
              onClick={onLoginOpen}
            >
              Going Abroad?
            </Button>
          )}
        </HStack>
        <Hide below="sm">
          <InputGroup ml="5" size="lg" w="md" onClick={onSearchOpen}>
            <InputLeftElement cursor={"pointer"}>
              <Search2Icon />
            </InputLeftElement>
            <Input
              placeholder={`Search ${region} programs`}
              onClick={onSearchOpen}
            />
          </InputGroup>
        </Hide>
        <Show below="sm">
          <IconButton
            aria-label="search"
            icon={<Search2Icon />}
            bg="maroon"
            _hover={{ backgroundColor: "#610018" }}
            color="gold"
            size="lg"
            onClick={onSearchOpen}
          />
        </Show>
      </Flex>
      <SearchModal
        isSearchOpen={isSearchOpen}
        onSearchClose={onSearchClose}
        region={region}
        universityList={universityList}
      />
      <CountryModal
        isOpen={isCountryModalOpen}
        onClose={onCountryModalClose}
        universityList={countryUniversityList}
        country={country}
        region={region}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        endpoint={
          region === "Australia/Pacific Islands"
            ? "Australia Pacific Islands"
            : region
        }
      />
      <EmailModal
        isOpen={isEmailOpen}
        onClose={onEmailClose}
        profile={profile}
      />
      <Wrap justify="center" mt="5" mb="5" w="100%">
        {countryCards}
      </Wrap>
      {profile && !profile.abroad_id ? (
        <Footer modalTrigger={onEmailOpen} />
      ) : (
        <></>
      )}
    </>
  ) : (
    <>
      <Center h="100vh" w="100vw">
        <Spinner size="xl" />
      </Center>
    </>
  );
}
