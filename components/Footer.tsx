import { Box, Text, Link } from "@chakra-ui/react";

export default function Footer({ modalTrigger }: any) {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      py={6}
      textAlign="center"
      bg="#F9F5E1"
    >
      <Text fontSize="2xl">
        To see other students going abroad email{" "}
        <Link color="maroon" onClick={modalTrigger}>
          eaglesabroad@gmail.com
        </Link>{" "}
        with your abroad acceptance from your BC email.
      </Text>
    </Box>
  );
}
