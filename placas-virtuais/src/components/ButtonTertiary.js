import { Button } from "@chakra-ui/react";
import React from "react";

export const ButtonTertiary = ({ children, ...props }) => (
  <Button color="blue.600" variant="link" {...props}>
    {children}
  </Button>
);
