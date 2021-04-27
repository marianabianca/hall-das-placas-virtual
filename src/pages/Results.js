import { Divider, Flex, IconButton, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

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
  const [results, setResults] = useState(undefined);
  const [filterResults, setFilterResults] = useState(undefined);
  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get("search");

  useEffect(() => {
    const getResults = async () => {
      const results = (await db.collection("placas").get()).docs;
      results.sort(sortByGraduationSemester);
      setResults(results);
    };
    getResults();
  }, [searchTerm]);

  useEffect(() => {
    const regexYear = "(19|20)[0-9][0-9]";
    const regexSemester = "\\.[0-3]";
    const matchYear =
      RegExp(regexYear).test(searchTerm) ||
      RegExp(regexYear + regexSemester).test(searchTerm);

    if (searchTerm && results) {
      if (matchYear) {
        const filtered = results.filter((e) =>
          e.data().graduationSemester.toLowerCase().includes(searchTerm)
        );
        setFilterResults(filtered);
      } else if (searchTerm !== "all") {
        const filtered = results.filter((e) =>
          e.data().people.some((p) => p.name.toLowerCase().includes(searchTerm))
        );
        setFilterResults(filtered);
      } else {
        setFilterResults(results);
      }
    }
  }, [searchTerm, results]);

  const sortByGraduationSemester = (a, b) => {
    const x = a.data().graduationSemester;
    const y = b.data().graduationSemester;
    if (x < y) {
      return 1;
    }
    if (x > y) {
      return -1;
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
              {filterResults ? (
                filterResults.length > 0 ? (
                  filterResults.map((elem, i) => (
                    <>
                      <Flex justify="space-between" align="center">
                        <Flex direction="column" align="start">
                          <Text fontSize="xl">
                            Turma de {elem.data().graduationSemester}
                          </Text>
                          <Text fontSize="sm" color="grey.500">
                            {elem.data().name}
                          </Text>
                        </Flex>
                        <Link
                          to={{
                            pathname: `/placa/${
                              elem.data().graduationSemester
                            }`,
                            state: { searchTerm: searchTerm },
                          }}
                        >
                          <ButtonSecondary size="sm">
                            Visualizar
                          </ButtonSecondary>
                        </Link>
                      </Flex>
                      {i < filterResults.length - 1 && <Divider my="0.5rem" />}
                    </>
                  ))
                ) : (
                  <Text fontSize="2xl">Nenhum resultado encontrado</Text>
                )
              ) : (
                <Flex align="center" justify="center">
                  <Spinner size="xl" />
                </Flex>
              )}
              {}
            </MyBox>
            <ButtonTertiary mt="1.75rem" onClick={() => history.push("/")}>
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
