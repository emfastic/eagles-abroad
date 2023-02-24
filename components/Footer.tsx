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
      bg="maroon"
    >
      <Text fontSize={"2xl"} color='white'>
        To see other students going abroad email{" "}
        <Link color="gold" onClick={modalTrigger}>
          abroadeagles@gmail.com
        </Link>{" "}
        with your abroad acceptance from your BC email.
      </Text>
    </Box>
  );
}
