import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Box,
  Center,
  ListItem,
  UnorderedList,
  VStack,
  Tag,
  Avatar,
  Button,
  IconButton,
  useDisclosure,
  Hide,
  Spinner,
  Link,
  Stack,
} from "@chakra-ui/react";
import CustomHead from "components/CustomHead";
import EmailModal from "components/EmailModal";
import Footer from "components/Footer";
import LoginModal from "components/LoginModal";
import ProfileTag from "components/ProfileTag";
import { supabase } from "lib/supabaseClient";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const africanUniversities = [
  "Al Akhawayn University (AUI)",
  "American University in Cairo",
  "BC in Cape Town: University of Cape Town",
  "BC in Makhanda: Rhodes University",
  "External: SIT Morocco: Migration and Transnational Identity",
  "External: SIT Study Abroad Ghana: Globalization Cultural Legacies and the Afro-Chic",
  "External: SIT Study Abroad Kenya: Global Health and Human Rights",
  "External: SIT Study Abroad Madagascar - Biodiversity and Natural Resource Management",
  "External: SIT Study Abroad Rwanda: Post-Genocide Restoration and Peacebuilding",
  "External: SIT Study Abroad South Africa - Community Health and Social Policy - Durban",
  "External: SIT Study Abroad South Africa - Social and Political Transformation - Durban",
  "External: SIT Study Abroad Tanzania - Wildlife Conservation and Political Ecology",
  "External: SIT Study Abroad Tanzania - Zanzibar Coastal Ecology and Natural Resource Management",
  "External: SIT Study Abroad Uganda - Development Studies",
];

const europeanUniversities = [
  "American College of Greece (ACG)",
  "Amsterdam University College (AUC)",
  "BC in Barcelona: Business and Culture",
  "BC in Barcelona: ESADE",
  "BC in Barcelona: Universidad Pompeu Fabra (UPF)",
  "BC in Champagne: Sciences Po Reims",
  "BC in Croatia: War Peace and Reconciliation",
  "BC in Dublin: Maynooth University",
  "BC in Dublin: Trinity College Dublin",
  "BC in Dublin: University College Dublin (UCD) - Arts",
  "BC in Dublin: University College Dublin (UCD) - Commerce",
  "BC in Dublin: University College Dublin (UCD) - Social  Sciences",
  "BC in Glasgow: University of Glasgow",
  "BC in Granada:  Granada Institute of International Studies (GRIIS)",
  "BC in London: King's College",
  "BC in London: London School of Economics and Political Science (LSE)",
  "BC in London: Queen Mary",
  "BC in London: Royal Holloway",
  "BC in London: SOAS",
  "BC in London: University College London (UCL)",
  "BC in Madrid: Carlos III - English",
  "BC in Madrid: Carlos III - Spanish",
  "BC in Madrid: Pontificia Comillas - ICADE (Business and Law)",
  "BC in Madrid: Pontificia Comillas - Sociales (Liberal Arts and Social Science)",
  "Catolica Lisbon School of Business and Economics",
  "BC in Paris: L'Ecole Superieure de Commerce (ESCP)",
  "BC in Paris: L'Institut Catholique de Paris (ICP)",
  "BC in Paris: L'Institut de Langue et de Culture Francaise (ILCF)",
  "BC in Paris: L'Institut d'Etudes Politiques de Paris (Sciences Po)",
  "BC in Paris: Universite de Paris IV La Sorbonne",
  "BC in Paris: Universite de Paris IX Dauphine",
  "BC in Parma: L'Istituto Dante Alighieri",
  "BC in Parma: University of Parma",
  "Charles University: East and Central European Studies",
  "Copenhagen Business School (CBS)",
  "Durham University",
  "External: Advanced Studies in England (ASE)",
  "External: American University in Bulgaria - Blagoevgrad",
  "External: American University of Rome",
  "External: API in Budapest Hungary - Corvinus University of Budapest International Business and Humanities",
  "External: Boston University - Dublin Internship Program",
  "External: Boston University - Geneva Internship Program - Switzerland",
  "External: Boston University - London Internship Program",
  "External: Budapest Semesters in Mathematics",
  "External: CET Siena",
  "External: DIS - Study Abroad in Stockholm Sweden",
  "External: Heidelberg University - American Junior Year",
  "External: IAU College- Aix-en-Provence France",
  "External: IES Abroad Berlin - Language and Area Studies",
  "External: IES Abroad Berlin - Metropolitan Studies",
  "External: IES Abroad Vienna - European Society and Culture - Austria",
  "External: IES Abroad Vienna - Music - Austria",
  "External: Intercollegiate Center for Classical Studies",
  "External: Loyola University - John Felice Rome Center",
  "External: SIT Study Abroad Cameroon: Development and Social Change",
  "External: SIT Study Abroad Iceland - Climate Change and the Arctic",
  "External: SIT Study Abroad Switzerland - Global Health and Development Policy",
  "External: SIT Study Abroad Switzerland - International Studies and Multilateral Diplomacy",
  "External: Syracuse University in Florence Italy",
  "Frankfurt School of Finance and Management",
  "Jagiellonian University",
  "Katholische Universität Eichstätt-Ingolstadt - Advanced",
  "Katholische Universität Eichstätt-Ingolstadt - Beginner",
  "Lancaster University",
  "Newcastle University",
  "Nova School of Business and Economics - Lisbon",
  "Universidad de Deusto: Bilbao",
  "Universidad de Deusto: San Sebastián",
  "Universita Bocconi",
  "Universita Cattolica del Sacro Cuore (UCSC)",
  "Universitat Tubingen",
  "Universiteit van Amsterdam (UvA)",
  "University College Cork",
  "University College Utrecht (UCU)",
  "University of Bergen",
  "University of Bristol",
  "University of Copenhagen",
  "University of Edinburgh",
  "University of Galway",
  "University of Liverpool",
  "University of Oxford - Mansfield College",
  "Venice International University",
  "Vienna University of Economics and Business (WU)",
];

const middleEasternUniversities = [
  "American University of Sharjah (AUS)",
  "External: CET - Middle East Studies and Internship in Jordan",
  "External: SIT Study Abroad Jordan - Refugees Health and Humanitarian Action",
  "External: University of Haifa International School",
];

const asianUniversities = [
  "Ateneo de Manila University",
  "Monash University - Malaysia",
  "BC in Kathmandu: Center for Buddhist Studies at RYI",
  "Chinese University of Hong Kong (CUHK)",
  "External: Advanced Russian Language and Area Studies Program (RLASP)",
  "External: CET Harbin",
  "External: CET Kunming",
  "External: CET Osaka Japan",
  "External: IFSA Contemporary India",
  "External: IFSA Study in Shanghai: International Business",
  "External: SIT Study Abroad India - Public Health Gender and Community",
  "External: SIT Study Abroad Indonesia: Arts Religion and Social Change",
  "External: SIT Study Abroad Vietnam: Culture Social Change and Development",
  "Fu Jen Catholic University",
  "Hong Kong University of Science and Technology (HKUST)",
  "Nanjing University",
  "National University of Singapore (NUS)",
  "Seoul National University (SNU)",
  "Sogang University",
  "Sophia University",
  "University of Hong Kong (HKU)",
  "Waseda University",
];

const australianUniversities = [
  "Australian Catholic University (ACU)",
  "University of New South Wales (UNSW)",
  "External: Frontiers Abroad - Earth Systems",
  "External: Frontiers Abroad - Geology",
  "Monash University - Australia",
  "University of Melbourne",
  "University of Notre Dame - Australia",
  "University of Otago",
  "University of Queensland",
  "University of Sydney (USYD)",
  "University of Western Australia",
];

const southAmericanUniversities = [
  "BC in Buenos Aires: Pontificia Universidad Católica Argentina (UCA)",
  "BC in Buenos Aires: Universidad Torcuato Di Tella (UTDT)",
  "BC in Rio: Pontificia Universidade Católica do Rio de Janeiro (PUC-Rio)",
  "BC in Quito: Universidad San Francisco de Quito (USFQ)",
  "External: SIT Study Abroad Peru - Indigenous Peoples and Globalization",
  "Pontificia Universidad Católica de Chile (PUC-Chile)",
  "Pontificia Universidad Javeriana",
  "Universidad Alberto Hurtado (UAH)",
];

const otherUniversities = [
  "External: ACTR (American Councils) Balkan Language Initiative (BLI)",
  "External: ACTR (American Councils) Eurasian Regional Language Program (ERLP)",
  "External: Sea Semester",
];

const centralAmericanUniversities = [
  "External: Augsburg CGEE: New Activisms Human Rights and Social Justice",
  "External: IFSA Universidad de La Habana (Havana Cuba)",
  "External: SIT Study Abroad Panama - Tropical Ecology Marine Ecosystems and Biodiversity Conservation",
];

const northAmericanUniversities = ["Universidad Iberoamericana: Mexico City"];

export async function getStaticPaths() {
  const regionalUniversities = [
    africanUniversities,
    asianUniversities,
    australianUniversities,
    centralAmericanUniversities,
    europeanUniversities,
    middleEasternUniversities,
    northAmericanUniversities,
    southAmericanUniversities,
    otherUniversities,
  ];
  const regions = [
    "Africa",
    "Asia",
    "Australia Pacific Islands",
    "Central America",
    "Europe",
    "Middle East",
    "North America",
    "South America",
    "Other",
  ];

  const paths: any[] = [];

  regionalUniversities.forEach((universities, index) => {
    const region = regions[index];

    universities.forEach((university) => {
      paths.push({
        params: { region, university: university.toString() },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { university } = params;

  const { data, error } = await supabase
    .from("abroad-locations")
    .select("*")
    .eq("university", university);

  if (!data) {
    return {notFound: true}
  }

  return {
    props: {
      university: data[0],
    },
  };
}

export default function University({ university }: any) {
  let factList = university.facts.split(". ").slice(0, -1);

  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [profiles, setProfiles] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        } else {
          setProfile(data[0]);
        }
      }
    }

    async function getProfiles() {
      const {data: profileResponse, error} = await supabase
      .from("profiles")
      .select("*")
      .eq("abroad_id", university.key);

      if (!profileResponse) {
        console.log("Profile data not found:", error);
    } else {
      setProfiles(profileResponse)
    }
    }

    async function getData() {
      setIsLoading(true);
      await getUser();
      await getProfiles()  
      setIsLoading(false);
    }

    getData()

  }, []);

  let profileTags = profiles.map((profile: any) => {
    return (
      <ProfileTag key={profile.id} profile={profile} />
    );
  });

  if (profileTags.length === 0) {
    profileTags = (
      <>
        <Tag
          variant="subtle"
          p="3"
          size="lg"
          color="black"
          display={"flex"}
          alignItems="center"
          outlineColor="maroon"
          justifyContent={"space-between"}
        >
          <Box ml="4">No one has added this location yet!</Box>
        </Tag>
        <Tag
          variant="subtle"
          p="3"
          color="black"
          size="lg"
          display={"flex"}
          alignItems="center"
          outlineColor="maroon"
          justifyContent={"space-between"}
        >
          <Box ml="4">
            Know someone going?{" "}
            <Link
              color="maroon"
              href={`sms: &body=Heard you're going abroad, signup for eaglesabroad.com to connect with other students going to ${
                university.country === "Multiple Countries"
                  ? university.university
                  : university.country
              }!`}
            >
              Text them about Eagles Abroad!
            </Link>
          </Box>
        </Tag>
      </>
    );
  }

  const hiddenProfileTags = ["user1", "user2", "user3"].map(
    (profile: any, idx: number) => {
      return (
        <Tag
          key={idx}
          variant="subtle"
          p="3"
          color="black"
          display={"flex"}
          alignItems="center"
          outlineColor="maroon"
          justifyContent={"space-between"}
        >
          <Flex ml="2" fontSize="2xl" alignItems={"center"}>
            <Avatar></Avatar>
            <Box ml="4">{idx === 2 ? "You?" : "????"}</Box>
          </Flex>
        </Tag>
      );
    }
  );

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

  return !isLoading ? (
    <>
    <CustomHead/>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding="5"
        pr="10"
        pl="10"
        borderBottom="1px solid gray"
      >
        <Flex>
          <IconButton
            aria-label="back"
            icon={<ChevronLeftIcon />}
            bg="maroon"
            _hover={{ backgroundColor: "#610018" }}
            color="gold"
            onClick={() =>
              router.push(
                `/${
                  university.continent === "Australia/Pacific Islands"
                    ? "Australia Pacific Islands"
                    : university.continent
                }`
              )
            }
            size="lg"
          />
        </Flex>
        <Hide below="sm">
          <Heading size="xl" ml="40" bgClip="text"
  bgGradient="linear(to-t, #800000, #C68E82)">
            Eagles Abroad
          </Heading>
        </Hide>
        <EmailModal
          isOpen={isEmailOpen}
          onClose={onEmailClose}
          profile={profile}
        />
        {profile ? (
          <></>
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
        <LoginModal
          isOpen={isLoginOpen}
          onClose={onLoginClose}
          endpoint={`${university.continent}/${university.university}`}
        />
      </Flex>
      <Heading size={["lg", "xl"]} textAlign={"center"} mt="5">
        {university.university}
      </Heading>
      <Stack
        align="top"
        mt="5"
        mb="10"
        spacing="10"
        ml={['6', '']}
        justify={"center"}
        direction={{ base: "column", md: "row", lg: "row", xl: "row" }}
      >
        <Box w={["95%", "40%"]} bg="#F9F5E1" p="10" pt="7" borderRadius={"3xl"}>
          <Flex justify="center">
            <Heading size="lg" textAlign={"center"} mb="4">
              Who&apos;s Going?
            </Heading>
          </Flex>
          <VStack align="left" spacing="5">
            {profile && profile!.abroad_id
              ? profileTags
              : hiddenProfileTags}
          </VStack>
        </Box>
        <Box w={["95%", "40%"]} bg="#F9F5E1" p="10" pt="7" borderRadius={"3xl"}>
          <Heading size="lg" textAlign={"center"} mb="4">
            Quick Facts
          </Heading>
          <UnorderedList mr="10" spacing={"3"}>
            {factList.map((fact: string, idx: number) => {
              return (
                <ListItem key={idx} fontSize="xl">
                  {fact}
                </ListItem>
              );
            })}
          </UnorderedList>
        </Box>
      </Stack>
      {profile && !profile.abroad_id ? (
        <Footer modalTrigger={onEmailOpen} />
      ) : (
        <></>
      )}
    </>
  ) : (
    <>
      <Center h='100vh' w='100vw'>
        <Spinner size="xl" />
      </Center>
    </>
  );
}
