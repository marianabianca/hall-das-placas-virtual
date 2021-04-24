import {
  Box,
  Divider,
  Flex,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { BreadCrumbs, ButtonPrimary, MyBox } from "../components";
import logoCCC from "../LogoCCC.png";

const mock = {
  name: "Nome turma",
  graduationTime: "2021.1",
  groupPhoto: "https://diordogs.com.br/wp-content/uploads/2020/09/2.jpg",
  color: "pink.600",
  sections: [
    {
      type: "text",
      title: "",
      content:
        "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at euismod eros, vel faucibus ex. Suspendisse efficitur convallis eros. Fusce.”",
    },
    {
      type: "titleText",
      title: "Texto com título",
      content:
        "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at euismod eros, vel faucibus ex. Suspendisse efficitur convallis eros. Fusce.”",
    },
    {
      type: "list",
      title: "Lista de nomes",
      content: "Livia; Mariana; Robson; Juan",
    },
  ],
  people: [
    {
      name: "Mariana Marques dos Santos Dela Bianca",
      enterTime: "2016.1",
      graduationTime: "2021.1",
      individualPhoto:
        "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/charles-deluvio-Mv9hjnEUHR4-unsplash-1-1000x1000.jpg",
      linkedin: undefined,
    },
    {
      name: "José Robson não lembro sobrenome dsclp",
      enterTime: "2016.1",
      graduationTime: "2021.1",
      individualPhoto:
        "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/julio-bernal-BfsCw2ngc6A-unsplash-1-1000x1000.jpg",
      linkedin: undefined,
    },
    {
      name: "Juan também não lembro sobrenome dsclp",
      enterTime: "2016.1",
      graduationTime: "2021.1",
      individualPhoto:
        "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/erik-mclean-QdzRfeLaXPA-unsplash-1-1000x1000.jpg",
      linkedin: undefined,
    },
    {
      name: "Lívia Maria Rodrigues Sampaio Campos",
      enterTime: "2016.1",
      graduationTime: "2021.1",
      individualPhoto:
        "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/charles-deluvio-oWTW-jNGl9I-unsplash-1-1000x1000.jpg",
      linkedin: undefined,
    },
    {
      name: "Mariana Marques dos Santos Dela Bianca",
      enterTime: "2016.1",
      graduationTime: "2021.1",
      individualPhoto:
        "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/charles-deluvio-AQRp2NH-O8k-unsplash-1000x1000.jpg",
      linkedin: undefined,
    },
    {
      name: "José Robson não lembro sobrenome dsclp",
      enterTime: "2016.1",
      graduationTime: "2021.1",
      individualPhoto: "https://cutt.ly/PvBy1fY",
      linkedin: undefined,
    },
    {
      name: "Juan também não lembro sobrenome dsclp",
      enterTime: "2016.1",
      graduationTime: "2021.1",
      individualPhoto:
        "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/charles-deluvio-K4mSJ7kc0As-unsplash-1000x1000.jpg",
      linkedin: undefined,
    },
    {
      name: "Lívia Maria Rodrigues Sampaio Campos",
      enterTime: "2016.1",
      graduationTime: "2021.1",
      individualPhoto:
        "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/alan-quirvan-Un2l252-pWA-unsplash-1-1000x1000.jpg",
      linkedin: undefined,
    },
  ],
};

const Board = () => {
  const history = useHistory();
  return (
    <Box bg={mock.color} mt="0" pt="1.5rem">
      <BreadCrumbs
        mt="0"
        bg="gray.50"
        w="fit-content"
        pages={[
          { title: "Página inicial", to: "/", isCurrentPage: false },
          { title: "Resultados", to: "/resultados", isCurrentPage: false },
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
            <Image
              src={mock.groupPhoto}
              alt="Foto da turma"
              w="50vw"
              borderRadius="0.5rem"
              border="4px"
              borderColor={mock.color}
            />
            <Text fontSize="5xl" mt="1rem">
              {mock.graduationTime}
            </Text>
            <Text fontSize="3xl" mt="0.5rem">
              {mock.name}
            </Text>
            <Divider w="100%" my="1.5rem" />
            {mock.sections.map((section) => (
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
              {mock.people.map((aluno) => (
                <Flex direction="column" w="8rem" mx="2.25rem" my="1rem">
                  <a
                    href={aluno.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={aluno.individualPhoto}
                      alt={aluno.name}
                      boxSize="7.5rem"
                      borderRadius="8rem"
                      border="4px"
                      borderColor={mock.color}
                    />
                  </a>
                  <Text fontSize="sm" mt="0.5rem" align="center">
                    {aluno.name}
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
  );
};

export default Board;
