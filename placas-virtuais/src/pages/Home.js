import React from "react";
import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";

import logoCCC from "../LogoCCC.png";
import {
  BreadCrumbs,
  ButtonGithub,
  ButtonPrimary,
  ButtonTertiary,
} from "../components";
import { Link, useHistory } from "react-router-dom";
import { Field, Form, Formik } from "formik";

const Home = () => {
  const history = useHistory();

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
      <Flex align="center" justify="center" mt="15vh">
        <Flex align="center" direction="column">
          <Image src={logoCCC} alt="Computação UFCG" w="18.75rem" />
          <Text fontSize="5xl" mt="1.25rem">
            Placas de formatura
          </Text>
          <Formik
            initialValues={{ search: "" }}
            onSubmit={(values) => {
              if (values.search.length > 0) {
                history.push(`/resultados?search=${values.search}`);
              }
            }}
          >
            {() => (
              <Form>
                <Flex align="center" justify="center" direction="column">
                  <Box bg="white" w="30rem" borderRadius="0.5rem" mt="1.25rem">
                    <Field name="search">
                      {({ field }) => (
                        <Input
                          {...field}
                          id="search"
                          placeholder="Período de graduação ou nome do graduado"
                          w="30rem"
                        />
                      )}
                    </Field>
                  </Box>
                  <ButtonPrimary type="submit" mt="1.25rem" mb="1.25rem">
                    Pesquisar
                  </ButtonPrimary>
                </Flex>
              </Form>
            )}
          </Formik>
          <Text fontSize="md">ou</Text>
          <Link to="/resultados?search=all">
            <ButtonTertiary mt="1.25rem">Ver todas as placas</ButtonTertiary>
          </Link>
        </Flex>
      </Flex>
      <ButtonGithub />
    </>
  );
};

export default Home;
