import { Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useHistory } from "react-router-dom";

import {
  BreadCrumbs,
  ButtonSecondary,
  ButtonTertiary,
  MyBox,
} from "../components";
import { IconGithub } from "../icons";

const mock = [
  {
    periodo: "2021.1",
    nome: "turma 1",
  },
  {
    periodo: "2021.2",
    nome: "turma 2",
  },
  {
    periodo: "2022.1",
    nome: "turma 3",
  },
  {
    periodo: "2022.2",
    nome: "turma 4",
  },
];

const Results = () => {
  const history = useHistory();

  return (
    <>
      <BreadCrumbs
        pages={[
          { title: "Página inicial", to: "/", isCurrentPage: false },
          { title: "Resultados", to: "/results", isCurrentPage: true },
        ]}
      />

      <Flex align="center" justify="center" direction="column">
        <Flex align="start" direction="column">
          <Text fontSize="5xl" mt="1.25rem">
            Resultados
          </Text>
          <Flex direction="column" align="center" justify="center">
            <MyBox minW="50vw">
              {mock.map((elem, i) => (
                <>
                  <Flex justify="space-between" align="center">
                    <Flex direction="column" align="start">
                      <Text fontSize="xl">Turma de {elem.periodo}</Text>
                      <Text fontSize="sm" color="grey.500">
                        {elem.nome}
                      </Text>
                    </Flex>
                    <Link to="/placa">
                      <ButtonSecondary size="sm">Visualizar</ButtonSecondary>
                    </Link>
                  </Flex>
                  {i < mock.length - 1 && <Divider my="0.5rem" />}
                </>
              ))}
            </MyBox>
            <ButtonTertiary mt="1.75rem" onClick={history.goBack}>
              Voltar
            </ButtonTertiary>
          </Flex>
        </Flex>
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

export default Results;
