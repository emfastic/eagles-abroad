import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function EmailModal({ isOpen, onClose, profile }: any) {
  function sendEmail() {
    const recipient = "abroadeagles@gmail.com";

    const gmailComposeUrl = `https://mail.google.com/mail/u/0/?view=cm&to=${recipient}&su=${profile.full_name} -- Eagles Abroad Verification&body=Attach a screenshot of your abroad acceptance below! Be sure to include your name, program, and term in the screenshot!`;

    window.open(gmailComposeUrl);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Send Email</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Email abroadeagles@gmail.com with your abroad acceptance to see
          who&apos;s going abroad!
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={sendEmail}
            bg="maroon"
            color="gold"
            _hover={{ backgroundColor: "#610018" }}
            mr={3}
          >
            Take Me to Gmail
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
