import React from "react";
import { Box, Flex, IconButton, Image, Input, Text } from "@chakra-ui/react";

import logoCCC from "./LogoCCC.png";
import { BreadCrumbs, ButtonPrimary, ButtonTertiary } from "./components";
import { IconGithub } from "./icons";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <BreadCrumbs
        pages={[{ title: "Página inicial", to: "/", isCurrentPage: true }]}
      />
      <Link to="/login">
        <ButtonTertiary top="2rem" right="4.5rem" position="fixed">
          Login
        </ButtonTertiary>
      </Link>
      <Flex align="center" justify="center" mt="20vh">
        <Flex align="center" direction="column">
          <Image src={logoCCC} alt="Computação UFCG" w="18.75rem" />
          <Text fontSize="5xl" mt="1.25rem">
            Placas de formatura
          </Text>
          <Box bg="white" w="30rem" borderRadius="0.25rem" mt="1.25rem">
            <Input
              placeholder="Período de graduação ou nome do graduado"
              w="30rem"
            />
          </Box>
          <ButtonPrimary
            onClick={() => console.log("clicou")}
            mt="1.25rem"
            mb="1.25rem"
          >
            Pesquisar
          </ButtonPrimary>
          <Text fontSize="md">ou</Text>
          <ButtonTertiary mt="1.25rem">Ver todas as placas</ButtonTertiary>
        </Flex>
      </Flex>
      <IconButton
        variant="link"
        py="0.5rem"
        icon={<IconGithub size="1.5rem" />}
        bottom="2.5rem"
        right="3rem"
        position="fixed"
      />
    </>
  );
};

export default Home;
