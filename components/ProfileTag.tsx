import { AtSignIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Tag,
  Text,
  Flex,
  VStack,
  Avatar,
  Badge,
  Hide,
  Box,
  Show,
  useDisclosure,
  HStack,
  Center,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import InstaIcon from "./InstaIcon";
import ProfileTagModal from "./ProfileTagModal";
import SnapIcon from "./SnapIcon";
import TwitterIcon from "./TwitterIcon";

export default function ProfileTag({ profile, onOpen, setProfile }: any) {
  function handleProfileClick() {
    setProfile(profile);
    onOpen();
  }

  const mobileProfile = (
    <>
      <VStack align="left">
        <Flex align="center">
          <Avatar src={`${profile.avatar_url}`} size="md"></Avatar>
          <Flex fontSize={["md", "xl"]} ml="3">
            {profile.full_name}
          </Flex>
        </Flex>
        <HStack spacing="4">
          <Box>
            <Badge
              variant="subtle"
              fontSize="sm"
              colorScheme={profile.abroad_term === "Spring" ? "red" : "yellow"}
              mr={profile.abroad_term !== "Spring" ? "5" : "0"}
            >
              {profile.abroad_term}
            </Badge>
          </Box>
          {profile.instagram ? (
            <InstaIcon
              boxSize={6}
              cursor="pointer"
              onClick={handleProfileClick}
            />
          ) : (
            <></>
          )}
          {profile.snapchat ? (
            <SnapIcon
              boxSize={6}
              cursor="pointer"
              onClick={handleProfileClick}
            />
          ) : (
            <></>
          )}
          {profile.twitter ? (
            <TwitterIcon
              boxSize={6}
              cursor="pointer"
              onClick={handleProfileClick}
            />
          ) : (
            <></>
          )}
          <IconButton
            aria-label="email"
            bg={"gold"}
            _hover={{ backgroundColor: "#C7A23D" }}
            h={6}
            boxSize={6}
            onClick={handleProfileClick}
            icon={<EmailIcon color="maroon" />}
          />
        </HStack>
      </VStack>
    </>
  );

  const desktopProfile = (
    <>
      <Avatar src={`${profile.avatar_url}`}></Avatar>
      <Box ml="4">{profile.full_name}</Box>
    </>
  );

  return (
    <>
      <Tag
        key={profile.id}
        variant="subtle"
        p="3"
        color="black"
        display={"flex"}
        alignItems="center"
        outlineColor="maroon"
        justifyContent={"space-between"}
      >
        <Flex
          ml="2"
          fontSize={["md", "xl"]}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Hide above="md">{mobileProfile}</Hide>
          <Show above="md">{desktopProfile}</Show>
        </Flex>
        <Show above="md">
          <HStack>
            {profile.instagram ? (
              <InstaIcon
                boxSize={6}
                cursor="pointer"
                onClick={handleProfileClick}
              />
            ) : (
              <></>
            )}
            {profile.snapchat ? (
              <SnapIcon
                boxSize={6}
                cursor="pointer"
                onClick={handleProfileClick}
              />
            ) : (
              <></>
            )}
            {profile.twitter ? (
              <TwitterIcon
                boxSize={6}
                cursor="pointer"
                onClick={handleProfileClick}
              />
            ) : (
              <></>
            )}
            <IconButton
              aria-label="email"
              bg={"gold"}
              _hover={{ backgroundColor: "#C7A23D" }}
              h={6}
              mr={profile.abroad_term !== "Spring" ? "6" : "0"}
              boxSize={6}
              onClick={handleProfileClick}
              icon={<EmailIcon color="maroon" />}
            />
            <Badge
              variant="subtle"
              fontSize="lg"
              colorScheme={profile.abroad_term === "Spring" ? "red" : "yellow"}
            >
              {profile.abroad_term}
            </Badge>
          </HStack>
        </Show>
      </Tag>
    </>
  );
}
