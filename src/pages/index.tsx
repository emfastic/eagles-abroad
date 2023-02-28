import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Center,
  Heading,
  WrapItem,
  Wrap,
  InputLeftElement,
  InputGroup,
  Input,
  Flex,
  useDisclosure,
  Button,
  Spinner,
  Hide,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Search2Icon } from "@chakra-ui/icons";
import SearchModal from "components/SearchModal";
import LoginModal from "components/LoginModal";
import EmailModal from "components/EmailModal";
import Footer from "components/Footer";
import CustomHead from "components/CustomHead";
import ProfileModal from "components/ProfileModal";

const Home = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [profile, setProfile] = useState<any>(null);
  const [regionState, setRegionState] = useState<any>({});
  const [universityRegionMap, setUniversityRegionMap] = useState<any>({});
  const [universityList, setUniversityList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const {
    isOpen: isEmailOpen,
    onOpen: onEmailOpen,
    onClose: onEmailClose,
  } = useDisclosure();

  const regions: any = {
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
        .from("full-abroad-locations")
        .select("university, continent");

      console.log(data);

      if (data) {
        let universityList: string[] = [];
        let universityRegionMap: any = new Map();
        data.forEach((university: any) => {
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
    async function getUser() {
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
          console.log(data[0]);
          setProfile(data[0]);
        }
      }
    }

    async function getData() {
      setIsLoading(true);
      await getUniversityData();
      await getUser();
      setIsLoading(false);
    }

    getData();
  }, []);

  const regionImages = [
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

  const regionCards = Object.keys(regionState).map((region, idx) => {
    return (
      <WrapItem key={region}>
        <Card
          h={["md", "lg"]}
          w={["sm", "2xl"]}
          bgImage={`linear-gradient(rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0)), url(${regionImages[idx]})`}
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
            <Heading color="#FFF" size={["xl", "2xl"]}>
              {region}
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
        justify={"space-between"}
        padding="5"
        borderBottom="1px solid gray"
      >
        {profile ? (
          <ProfileModal profile={profile} />
        ) : (
          <Button
            size={["md", "lg"]}
            bgColor={"maroon"}
            _hover={{ backgroundColor: "#610018" }}
            color="gold"
            onClick={onLoginOpen}
          >
            Going Abroad?
          </Button>
        )}
        <LoginModal
          isOpen={isLoginOpen}
          onOpen={onLoginOpen}
          onClose={onLoginClose}
        />
        <Heading
          size={["lg", "xl"]}
          ml={{ sm: "auto" }}
          transform={{ xl: "translateX(-50%)" }}
          left={{ xl: "50%" }}
          position={{ xl: "absolute" }}
          bgClip="text"
          bgGradient="linear(to-t, #800000, #C68E82)"
        >
          Eagles Abroad
        </Heading>

        <Hide below="sm">
          <InputGroup
            ml="5"
            size="lg"
            w="md"
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
        </Hide>
      </Flex>
      <SearchModal
        isSearchOpen={isSearchOpen}
        onSearchClose={onSearchClose}
        universityList={universityList}
        universityRegionMap={universityRegionMap}
      />
      <EmailModal
        isOpen={isEmailOpen}
        onClose={onEmailClose}
        profile={profile}
      />
      <Wrap justify="center" mt="5" mb="5" w="100%">
        {regionCards}
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
};

export default Home;
