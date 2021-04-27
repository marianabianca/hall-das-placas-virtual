import { Button } from "@chakra-ui/react";
import React from "react";

export const ButtonPrimary = ({ children, ...props }) => (
  <Button
    bg="blue.600"
    color="white"
    _hover={{ bg: "blue.700", color: "white" }}
    _active={{ bg: "blue.800", color: "white" }}
    {...props}
  >
    {children}
  </Button>
);
