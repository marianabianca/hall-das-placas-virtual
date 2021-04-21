import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import { BreadCrumbs, ButtonPrimary } from "../components";
import { IconGithub, IconGoogle } from "../icons";

const LoginBox = ({ title, to }) => (
  <Flex direction="column" justify="center" align="center" mx="1.5rem">
    <Text fontSize="4xl" mb="1rem">
      {title}
    </Text>
    <Box
      borderRadius="0.5rem"
      border="1px"
      borderColor="gray.300"
      bg="white"
      p="2.5rem"
    >
      <Text fontSize="lg">Fazer login com .ccc.ufcg.edu.br</Text>
      <Flex align="center" justify="center" mt="1.5rem">
        <IconGoogle size="1.25rem" />
        <Link to={to}>
          <ButtonPrimary ml="1.25rem">Login com conta Google</ButtonPrimary>
        </Link>
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
        <LoginBox title="Login aluno" to="/estudante" />
        <LoginBox title="Login organizador" to="/organizador" />
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
