import { Button } from "@chakra-ui/react";
import React from "react";

export const ButtonSecondary = ({ children, ...props }) => (
  <Button
    bg="blue.300"
    color="white"
    _hover={{ bg: "blue.400", color: "white" }}
    _active={{ bg: "blue.500", color: "white" }}
    {...props}
  >
    {children}
  </Button>
);
