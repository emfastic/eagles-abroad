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
      <Text fontSize={"2xl"} color="white">
        To see other students going abroad email{" "}
        <Link color="gold" onClick={modalTrigger}>
          abroadeagles@gmail.com
        </Link>{" "}
        or text{" "}
        <Link
          href={`sms:7742444886&body=Attach a screenshot of your acceptance here!`}
          color="gold"
        >
          (216) 225-2483
        </Link>{" "}
        with your abroad acceptance.
      </Text>
    </Box>
  );
}
