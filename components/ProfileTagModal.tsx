import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  Box,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import InstaIcon from "./InstaIcon";
import SnapIcon from "./SnapIcon";
import TwitterIcon from "./TwitterIcon";
import { EmailIcon } from "@chakra-ui/icons";

export default function ProfileTagModal({ isOpen, onClose, profile }: any) {
  return (
    profile && (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb="3">
          <ModalHeader fontSize="2xl">{profile.full_name}</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <VStack align="left">
              {profile.instagram ? (
                <HStack spacing="4">
                  <InstaIcon boxSize="2em" />
                  <Box>{profile.instagram.toLowerCase()}</Box>
                </HStack>
              ) : (
                <></>
              )}
              {profile.snapchat ? (
                <HStack spacing="4">
                  <SnapIcon boxSize="2em" />
                  <Box>{profile.snapchat.toLowerCase()}</Box>
                </HStack>
              ) : (
                <></>
              )}
              {profile.twitter ? (
                <HStack spacing="4">
                  <TwitterIcon boxSize="2em" />
                  <Box>{profile.twitter.toLowerCase()}</Box>
                </HStack>
              ) : (
                <></>
              )}
              <HStack spacing="4">
                <EmailIcon boxSize="2em" color="maroon" />
                <Box>{profile.email}</Box>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  );
}
