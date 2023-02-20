import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Divider,
  Heading,
  Flex,
  Box,
} from "@chakra-ui/react";
import React from "react";
import GoogleButton from "react-google-button";
import { supabase } from "../lib/supabaseClient";

export default function LoginModal({
  onOpen,
  isOpen,
  onClose,
  text,
  handleSignIn,
}: any) {
  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.log("error", error);
    }
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Divider />
          <ModalHeader textAlign="center">Eagles Abroad</ModalHeader>
          <Divider />
          <ModalBody>
            <Flex m="10" mt="20" mb="20">
              <Heading size="lg" fontWeight={"semibold"} textAlign="center">
                Continue with BC email to see who else is going abroad!
              </Heading>
            </Flex>
            <Flex alignItems={"center"} justifyContent="center" mb="10">
              <GoogleButton
                label="Continue with Google"
                onClick={handleLogin}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
