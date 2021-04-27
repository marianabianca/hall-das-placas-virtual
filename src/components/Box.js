import { Box } from "@chakra-ui/react";
import React from "react";

export const MyBox = ({ children, ...props }) => (
  <Box
    borderRadius="0.5rem"
    border="1px"
    borderColor="gray.300"
    bg="white"
    p="2.5rem"
    {...props}
  >
    {children}
  </Box>
);
