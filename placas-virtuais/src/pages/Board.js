import {
  Box,
  Divider,
  Flex,
  Image,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { BreadCrumbs, ButtonPrimary, MyBox } from "../components";
import logoCCC from "../LogoCCC.png";
import { db } from "./firebaseClient";

const Board = () => {
  const history = useHistory();
  const location = useLocation();
  const { semester } = useParams();

  const [info, setInfo] = useState(undefined);
  const [loadingGroupImage, setLoadingGroupImage] = useState(true);
  const [loadingIndividualImage, setLoadingIndividualImage] = useState(true);

  const sortByName = (a, b) => {
    const x = a.name;
    const y = b.name;
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    const getBoard = async () => {
      const result = (
        await db
          .collection("placas")
          .where("graduationSemester", "==", semester)
          .get()
      ).docs;
      const data = result[0].data();
      const peopleSorted = data.people.sort(sortByName);
      data.people = peopleSorted;
      setInfo(data);
    };
    getBoard();
  }, [semester]);

  useEffect(() => {
    if (info) {
      setLoadingGroupImage(true);
      setLoadingIndividualImage(Array(info.people).fill(true));
    }
  }, [info]);

  return (
    <>
      {!info ? (
        <>
          {/* TODO voltar quando clicar em resultados */}
          <BreadCrumbs
            pages={[
              { title: "Página inicial", to: "/", isCurrentPage: false },
              {
                title: "Resultados",
                to: `/resultados/?search=${location.state.searchTerm ?? "all"}`,
                isCurrentPage: false,
              },
              { title: "Placa", to: "/placa", isCurrentPage: true },
            ]}
          />
          <Flex align="center" justify="center" mt="10rem">
            <Spinner size="xl" />
          </Flex>
        </>
      ) : (
        <Box bg={info.color} mt="0" pt="1.5rem">
          <BreadCrumbs
            mt="0"
            bg="gray.50"
            w="fit-content"
            pages={[
              { title: "Página inicial", to: "/", isCurrentPage: false },
              {
                title: "Resultados",
                to: `/resultados/?search=${location.state.searchTerm ?? "all"}`,
                isCurrentPage: false,
              },
              { title: "Placa", to: "/placa", isCurrentPage: true },
            ]}
          />
          <Flex align="center" justify="center" direction="column">
            <MyBox w="60vw" boxShadow="2xl">
              <Flex align="center" justify="center" direction="column">
                <Image
                  src={logoCCC}
                  alt="Computação UFCG"
                  w="18.75rem"
                  mb="1.5rem"
                />
                {loadingGroupImage && <Spinner />}
                <Image
                  src={info.groupPhoto}
                  alt="Foto da turma"
                  w="50vw"
                  borderRadius="0.5rem"
                  border="4px"
                  borderColor={info.color}
                  hidden={loadingGroupImage}
                  onLoad={() => {
                    setLoadingGroupImage(false);
                  }}
                />
                <Text fontSize="5xl" mt="1rem">
                  {info.graduationSemester}
                </Text>
                <Text fontSize="3xl" mt="0.5rem">
                  {info.name}
                </Text>
                <Divider w="100%" my="1.5rem" />
                {info.sections.map((section) => (
                  <>
                    {section.type === "text" && (
                      <Text fontSize="md" my="1rem" align="center">
                        {section.content}
                      </Text>
                    )}
                    {section.type === "titleText" && (
                      <Flex direction="column" my="1rem">
                        <Text fontSize="2xl" mb="0.25rem" align="center">
                          {section.title}
                        </Text>
                        <Text fontSize="md" align="center">
                          {section.content}
                        </Text>
                      </Flex>
                    )}
                    {section.type === "list" && (
                      <Flex direction="column" my="1rem">
                        <Text fontSize="2xl" mb="0.25rem" align="center">
                          {section.title}
                        </Text>
                        <UnorderedList>
                          <Flex align="center" direction="column">
                            {section.content.split(";").map((el) => (
                              <ListItem>{el.trim()}</ListItem>
                            ))}
                          </Flex>
                        </UnorderedList>
                      </Flex>
                    )}
                  </>
                ))}
                <Divider w="100%" my="1.5rem" />
                <Text fontSize="2xl" mt="0.5rem" mb="1.5rem">
                  Alunos
                </Text>
                <Flex align="center" justify="center" wrap="wrap">
                  {info.people.map((graduatated, index) => (
                    <Flex
                      direction="column"
                      w="9rem"
                      mx="1.5rem"
                      my="1rem"
                      align="center"
                      justify="center"
                    >
                      <a
                        href={graduatated.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {loadingIndividualImage[index] && <Spinner />}
                        <Image
                          src={graduatated.individualPhoto}
                          alt={graduatated.name}
                          boxSize="7.5rem"
                          borderRadius="8rem"
                          border="4px"
                          borderColor={info.color}
                          hidden={loadingIndividualImage[index]}
                          onLoad={() => {
                            const loading = [...loadingIndividualImage];
                            loading[index] = false;
                            setLoadingIndividualImage(loading);
                          }}
                        />
                      </a>
                      <Text fontSize="sm" mt="0.5rem" align="center">
                        {graduatated.name}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </MyBox>
            <ButtonPrimary onClick={history.goBack} my="2rem">
              Voltar
            </ButtonPrimary>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Board;
