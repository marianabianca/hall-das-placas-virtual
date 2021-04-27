import { Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router";
import {
  BreadCrumbs,
  ButtonPrimary,
  ButtonTertiary,
  MyBox,
} from "../components";
import { auth } from "./firebaseAuth";

const ForgotPassword = () => {
  const toast = useToast();
  const history = useHistory();

  return (
    <>
      <BreadCrumbs
        pages={[
          { title: "Página inicial", to: "/", isCurrentPage: false },
          { title: "Login", to: "/login", isCurrentPage: false },
          {
            title: "Esqueci a senha",
            to: "/esqueci-senha",
            isCurrentPage: true,
          },
        ]}
      />
      <Flex
        direction="column"
        justify="center"
        align="center"
        mx="1.5rem"
        mt="15vh"
      >
        <Text fontSize="4xl" mb="1rem">
          Esqueci a senha
        </Text>
        <MyBox maxW="30vw" p="1.5rem">
          <Text fontSize="md" mb="1.5rem" color="gray.600">
            Ao enviar o seu endereço de email, você receberá um email para
            alteração de senha.
          </Text>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              try {
                await auth.sendPasswordResetEmail(values.email);
                toast({
                  title: "",
                  description:
                    "Em breve você receberá um email para alteração de senha.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              } catch (e) {
                toast({
                  title: "",
                  description:
                    "Cheque se o email está correto e Tente novamente.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              }
            }}
          >
            {(props) => (
              <Form>
                <Flex direction="column" align="center" justify="center">
                  <Field name="email">
                    {({ field }) => (
                      <FormControl isRequired>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          {...field}
                          id="email"
                          placeholder="Digite seu email"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <ButtonPrimary
                    mt="1.5rem"
                    type="submit"
                    isLoading={props.isSubmitting}
                  >
                    Enviar
                  </ButtonPrimary>
                </Flex>
              </Form>
            )}
          </Formik>
        </MyBox>
        <ButtonTertiary
          mt="1.5rem"
          type="button"
          onClick={() => history.goBack()}
        >
          Voltar
        </ButtonTertiary>
      </Flex>
    </>
  );
};

export default ForgotPassword;
