import { Tag, Flex, VStack, Avatar, Badge, Hide, Box, Show } from '@chakra-ui/react'
import { profile } from 'console'
import React from 'react'

export default function ProfileTag({ profile }: any) {

    const mobileProfile = (<><VStack>
        <Avatar src={`${profile.avatar_url}`} size="md"></Avatar>
        <Badge
          variant="subtle"
          fontSize="sm"
          colorScheme={profile.abroad_term === "Spring" ? "red" : "yellow"}
        >
          {profile.abroad_term}
        </Badge>
      </VStack>
      <VStack align="left" ml="2" fontSize="lg" spacing="4" mt="3">
        <Box>{profile.full_name}</Box>
        <Box>{profile.email}</Box>
      </VStack></>)

    const desktopProfile = (<>
          <Avatar src={`${profile.avatar_url}`}></Avatar>
          <Box ml="4">{profile.full_name}</Box>
          <Box ml="4">{profile.email}</Box>
        </>)

  return (
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
            <Show below='sm'>
            {mobileProfile}
            </Show>
            <Hide below="sm">
            {desktopProfile}
          </Hide>
        </Flex>
        <Hide below='sm'>
        <Badge variant="subtle" fontSize="lg" colorScheme={profile.abroad_term === "Spring" ? "red" : "yellow"}>
          {profile.abroad_term}
        </Badge>
        </Hide>
      </Tag>
  )
}
