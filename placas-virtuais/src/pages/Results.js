import { Divider, Flex, IconButton, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  BreadCrumbs,
  ButtonSecondary,
  ButtonTertiary,
  MyBox,
} from "../components";
import { IconGithub } from "../icons";
import { db } from "./firebaseClient";

const Results = () => {
  const history = useHistory();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      const result = (await db.collection("placas").get()).docs;
      result.sort(sortByGraduationTime).reverse();
      setResults(result);
    };
    getResults();
  }, []);

  const sortByGraduationTime = (a, b) => {
    const x = a.data().graduationTime;
    const y = b.data().graduationTime;
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };

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
              {results.length > 0 ? (
                results.map((elem, i) => (
                  <>
                    <Flex justify="space-between" align="center">
                      <Flex direction="column" align="start">
                        <Text fontSize="xl">
                          Turma de {elem.data().graduationTime}
                        </Text>
                        <Text fontSize="sm" color="grey.500">
                          {elem.data().name}
                        </Text>
                      </Flex>
                      <Link to={`/placa/${elem.data().graduationTime}`}>
                        <ButtonSecondary size="sm">Visualizar</ButtonSecondary>
                      </Link>
                    </Flex>
                    {i < results.length - 1 && <Divider my="0.5rem" />}
                  </>
                ))
              ) : (
                <Flex align="center" justify="center">
                  <Spinner size="xl" />
                </Flex>
              )}
              {}
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
