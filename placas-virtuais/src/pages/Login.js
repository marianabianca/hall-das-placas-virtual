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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";

import { BreadCrumbs, ButtonGithub, ButtonPrimary, MyBox } from "../components";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const history = useHistory();

  const validateLogin = (value) => {
    let error;
    if (!value) {
      error = "Preencha o login.";
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
      <Flex direction="column" justify="center" align="center" mx="1.5rem">
        <Text fontSize="4xl" mb="1rem">
          Login organizador
        </Text>
        <MyBox minW="35vw">
          <Formik
            initialValues={{ login: "", password: "" }}
            onSubmit={() => {
              console.log("SUBMITOU");
              history.push("/organizador");
            }}
          >
            {(props) => (
              <Form>
                <Flex direction="column" align="center" justify="center">
                  <Field name="login" validate={validateLogin}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.login && form.touched.login}
                      >
                        <FormLabel htmlFor="login">Login</FormLabel>
                        <Input {...field} id="login" placeholder="Usuário" />
                        <FormErrorMessage>{form.errors.login}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                        mt="2rem"
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
                              {show ? "Esconder" : "Mostrar"}
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
                    mt="2rem"
                    type="submit"
                    isLoading={props.isSubmitting}
                  >
                    Entrar
                  </ButtonPrimary>
                </Flex>
              </Form>
            )}
          </Formik>
        </MyBox>
      </Flex>

      <ButtonGithub />
    </>
  );
};

export default Login;
