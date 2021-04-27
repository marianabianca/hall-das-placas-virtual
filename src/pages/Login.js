import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";

import {
  BreadCrumbs,
  ButtonGithub,
  ButtonPrimary,
  ButtonTertiary,
  MyBox,
} from "../components";
import { signIn } from "./firebaseAuth";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const history = useHistory();

  const toast = useToast();

  const validateLogin = (value) => {
    let error;
    if (!value) {
      error = "Preencha o email.";
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Preencha a senha.";
    }
    return error;
  };

  return (
    <>
      <BreadCrumbs
        pages={[
          { title: "Página inicial", to: "/", isCurrentPage: false },
          { title: "Login", to: "/login", isCurrentPage: true },
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
          Login organizador
        </Text>
        <MyBox minW="30vw" p="1.5rem">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                await signIn(values.email, values.password);
                history.push("/organizador");
              } catch (e) {
                toast({
                  title: "Não foi possível logar",
                  description: "Cheque o email e a senha. Tente novamente.",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}
          >
            {(props) => (
              <Form>
                <Flex direction="column" align="center" justify="center">
                  <Field name="email" validate={validateLogin}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Login</FormLabel>
                        <Input {...field} id="email" placeholder="Email" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                        mt="1.5rem"
                      >
                        <FormLabel htmlFor="password">Senha</FormLabel>
                        <InputGroup size="md">
                          <Input
                            type={show ? "text" : "password"}
                            placeholder="Senha"
                            {...field}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              mr="0.35rem"
                              h="1.75rem"
                              size="sm"
                              onClick={handleClick}
                            >
                              {show ? "Esconder" : " Mostrar "}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <ButtonPrimary
                    mt="1.5rem"
                    type="submit"
                    isLoading={props.isSubmitting}
                  >
                    Entrar
                  </ButtonPrimary>
                </Flex>
              </Form>
            )}
          </Formik>
          <Flex align="center" justify="center">
            <ButtonTertiary
              mt="1.5rem"
              type="button"
              size="sm"
              onClick={() => history.push("/esqueci-senha")}
            >
              Esqueci a senha
            </ButtonTertiary>
          </Flex>
        </MyBox>
      </Flex>

      <ButtonGithub />
    </>
  );
};

export default Login;
