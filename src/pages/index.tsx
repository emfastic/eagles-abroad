import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Account from "../../components/Account";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  HStack,
  VStack,
  Box,
  Heading,
  WrapItem,
  Wrap,
  InputLeftElement,
  InputGroup,
  Input,
  Flex,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { University } from "index";
import { useRouter } from "next/router";
import { Search2Icon } from "@chakra-ui/icons";
import SearchModal from "components/SearchModal";
import LoginModal from "components/LoginModal";

const Home = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [regionState, setRegionState] = useState<any>({});
  const [universityRegionMap, setUniversityRegionMap] = useState<any>({});
  const [universityList, setUniversityList] = useState<string[]>([]);

  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  const regions: {
    Africa: string[];
    Europe: string[];
    "Middle East": string[];
    Asia: string[];
    "Australia/Pacific Islands": string[];
    "South America": string[];
    Other: string[];
    "Central America": string[];
    "North America": string[];
  } = {
    Africa: [],
    Asia: [],
    "Australia/Pacific Islands": [],
    "Central America": [],
    Europe: [],
    "North America": [],
    "Middle East": [],
    "South America": [],
    Other: [],
  };

  useEffect(() => {
    async function getUniversityData() {
      const { data, error } = await supabase
        .from("abroad-locations")
        .select("university, continent");

      if (data) {
        let universityList: string[] = [];
        let universityRegionMap: any = new Map();
        data.forEach((university: University) => {
          regions[university.continent].push(university.university);
          universityList.push(university.university);
          universityRegionMap.set(university.university, university.continent);
        });
        setRegionState(regions);
        setUniversityList(universityList);
        setUniversityRegionMap(universityRegionMap);
      } else {
        console.log(error);
      }
    }

    getUniversityData();
  }, []);

  const continentImages = [
    "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2934&q=80",
    "https://images.unsplash.com/photo-1532236395709-7d70320fec2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1802&q=80",
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2730&q=80",
    "https://images.unsplash.com/photo-1548739699-ec48e06cdea1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1547995886-6dc09384c6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1326&q=80",
    "https://images.unsplash.com/photo-1598343530164-8f8922e123ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1543385426-191664295b58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1895&q=80",
    "https://images.unsplash.com/photo-1553246969-7dcb4259a87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  ];

  function handleRegionClick(region: string) {
    if (region === "Australia/Pacific Islands") {
      region = "Australia Pacific Islands";
    }
    router.push(`/${region}`);
  }

  const universityCards = Object.keys(regionState).map((region, idx) => {
    return (
      <WrapItem key={region}>
        <Card
          h="lg"
          w="2xl"
          bgImage={`linear-gradient(rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0)), url(${continentImages[idx]})`}
          bgPosition="center"
          bgSize="cover"
          onClick={() => handleRegionClick(region)}
          cursor="pointer"
        >
          <CardBody
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Heading color="#FFF" size="2xl">
              {region}
            </Heading>
          </CardBody>
        </Card>
      </WrapItem>
    );
  });

  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding="5"
        borderBottom="1px solid gray"
      >
        <Button
          size="lg"
          bgColor={"maroon"}
          _hover={{ backgroundColor: "#610018" }}
          color="gold"
          onClick={onLoginOpen}
        >
          See Who&apos;s Going Abroad
        </Button>
        <LoginModal
          isOpen={isLoginOpen}
          onOpen={onLoginOpen}
          onClose={onLoginClose}
          text={"test"}
        />
        <Heading size="xl" ml="40">
          Eagles Abroad
        </Heading>
        <InputGroup
          ml="5"
          size="lg"
          w="sm"
          onClick={onSearchOpen}
          cursor={"pointer"}
        >
          <InputLeftElement>
            <Search2Icon />
          </InputLeftElement>
          <Input
            placeholder="Search all programs"
            onClick={onSearchOpen}
            cursor={"pointer"}
            isReadOnly={true}
          />
        </InputGroup>
      </Flex>
      <SearchModal
        isSearchOpen={isSearchOpen}
        onSearchClose={onSearchClose}
        universityList={universityList}
        universityRegionMap={universityRegionMap}
      />
      <Wrap justify="center" mt="5" mb="5" w="100%">
        {universityCards}
      </Wrap>
    </>
  );
};

export default Home;
