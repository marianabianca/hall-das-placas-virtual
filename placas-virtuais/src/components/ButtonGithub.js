import { IconButton } from "@chakra-ui/react";
import React from "react";
import { IconGithub } from "../icons";

export const ButtonGithub = () => (
  <a
    href="https://github.com/marianabianca/placa-virtual"
    target="_blank"
    rel="noopener noreferrer"
  >
    <IconButton
      variant="link"
      py="0.5rem"
      icon={<IconGithub size="1.5rem" />}
      bottom="2.5rem"
      right="3rem"
      position="fixed"
    />
  </a>
);
