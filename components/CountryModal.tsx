import React from "react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Text,
  VStack,
  Divider,
  Flex,
} from "@chakra-ui/react";

export default function CountryModal({
  isOpen,
  onClose,
  universityList,
  country,
  region,
}: any) {
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent pb="5">
        <ModalHeader fontSize="3xl">
          <Flex mb="1">{country}</Flex>
          <Divider />
        </ModalHeader>
        <ModalCloseButton />
        <Flex w="80%"></Flex>
        <ModalBody>
          <VStack align="left">
            {universityList.map((university: string, index: number) => (
              <Box
                key={university}
                bg="maroon"
                color="white"
                p="5"
                borderRadius="md"
                cursor={"pointer"}
                fontWeight="semibold"
                _hover={{
                  backgroundColor: "#610018",
                }}
                onClick={() => {
                  if (region === "Australia/Pacific Islands") {
                    region = "Australia Pacific Islands";
                  }
                  router.push(`/${region}/${university}`);
                }}
              >
                {university}
              </Box>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
