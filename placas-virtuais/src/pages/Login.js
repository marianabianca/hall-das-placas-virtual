import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";

import { BreadCrumbs, ButtonPrimary } from "../components";
import { IconGithub, IconGoogle } from "../icons";

const LoginBox = ({ title }) => (
  <Flex direction="column" justify="center" align="center" mr="3.25rem">
    <Text fontSize="5xl" mb="1rem">
      {title}
    </Text>
    <Box
      borderRadius="0.5rem"
      border="1px"
      borderColor="gray.300"
      bg="white"
      p="2.5rem"
    >
      <Text fontSize="2xl">Fazer login com .ccc.ufcg.edu.br</Text>
      <Flex align="center" justify="center" mt="1.5rem">
        <IconGoogle size="1.25rem" />
        <ButtonPrimary ml="1.25rem">Login com conta Google</ButtonPrimary>
      </Flex>
    </Box>
  </Flex>
);

const Login = () => {
  return (
    <>
      <BreadCrumbs
        pages={[
          { title: "Página inicial", to: "/", isCurrentPage: false },
          { title: "Login", to: "/login", isCurrentPage: true },
        ]}
      />
      <Flex align="center" justify="center" mt="20vh">
        <LoginBox title="Login aluno" />
        <LoginBox title="Login organizador" />
      </Flex>

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
    </>
  );
};

export default Login;
