import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";

import { BreadCrumbs, ButtonPrimary, ButtonTertiary } from "../components";

const StudentForm = () => {
  const toast = useToast();

  const formikInitialValues = {
    name: undefined,
    enterTime: undefined,
    graduationTime: undefined,
    individualPhoto: undefined,
    linkedin: undefined,
  };

  const validateName = (name) => {
    let error;
    if (!name) {
      error = "Nome obrigatório.";
    } else if (name.length > 50) {
      error = "O nome deve ter menos que 50 caracteres, abrevie.";
    } else if (name.length < 3) {
      error = "O nome deve ter mais que 3 caracteres.";
    }
    return error;
  };

  const validateEnterTime = (time) => {
    let error;
    if (!time) {
      error = "Período de ingresso obrigatório";
    } else if (!RegExp("(19|20)[0-9][0-9]\\.[0-3]").test(time)) {
      error =
        "Formato de período de ingresso incorreto. Formato correto: AAAA.P (ex.: 2019.1)";
    }
    return error;
  };

  const validateGraduationTime = (time) => {
    let error;
    if (!time) {
      error = "Período de graduação obrigatório";
    } else if (!RegExp("(19|20)[0-9][0-9]\\.[0-3]").test(time)) {
      error =
        "Formato de período de ingresso incorreto. Formato correto: AAAA.P (ex.: 2019.1)";
    }
    return error;
  };

  const validateIndividualPhoto = (url) => {
    let error;
    if (!url) {
      error = "Imagem indivudual obrigatória";
      // eslint-disable-next-line no-useless-escape
    } else if (!RegExp("https?://.*.(?:png|jpg)").test(url)) {
      error = "A URL não corresponde a uma imagem no formato PNG ou JPG.";
    }
    return error;
  };

  const formFields = [
    {
      name: "name",
      isRequired: true,
      label: "Nome",
      placeholder: "Digite o seu nome completo",
      validateFunc: validateName,
    },
    {
      name: "enterTime",
      isRequired: true,
      label: "Período de ingresso",
      placeholder: "Digite no formato AAAA.P ex.: 2019.1",
      validateFunc: validateEnterTime,
    },
    {
      name: "graduationTime",
      isRequired: true,
      label: "Período de graduação",
      placeholder: "Digite no formato AAAA.P ex.: 2019.1",
      validateFunc: validateGraduationTime,
    },
    {
      name: "individualPhoto",
      isRequired: true,
      label: "URL da foto individual",
      placeholder: "A imagem precisa ser quadrada, no formato PNG ou JPG.",
      validateFunc: validateIndividualPhoto,
    },
    {
      name: "linkedin",
      isRequired: false,
      label: "Perfil no LinkedIn",
      placeholder: "URL do seu perfil no LinkedIn",
      validateFunc: () => {},
    },
  ];

  const handleSubmit = (props) => {
    const values = props.values;
    const lackValues =
      !values.name &
      !values.enterTime &
      !values.graduationTime &
      !values.individualPhoto;
    const hasErrors = Object.keys(props.errors).length > 0;
    const verification = !(lackValues | hasErrors);
    toast({
      title: verification ? "Sucesso" : "Atenção",
      description: verification
        ? "Seus dados foram salvos!"
        : Object.values(props.errors)[0],
      status: verification ? "success" : "warning",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <BreadCrumbs
        pages={[
          { title: "Página inicial", to: "/", isCurrentPage: false },
          { title: "Seus dados", to: "/estudante", isCurrentPage: true },
        ]}
      />
      <Flex align="center" justify="center" direction="column">
        <Flex align="start" direction="column" mt="1.25rem">
          <Flex justify="space-between" align="center" width="50vw">
            <Text fontSize="5xl">Seus dados</Text>
            {/* TODO remover token */}
            <Link to="/">
              <ButtonTertiary>Sair</ButtonTertiary>
            </Link>
          </Flex>
          <Formik
            initialValues={formikInitialValues}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <Form>
                <Flex justify="center" align="center" direction="column">
                  <Box
                    borderRadius="0.5rem"
                    border="1px"
                    borderColor="gray.300"
                    bg="white"
                    px="2.5rem"
                    pb="2.5rem"
                    pt="1.75rem"
                    minW="50vw"
                  >
                    {formFields.map((fields, i) => (
                      <Field name={fields.name} validate={fields.validateFunc}>
                        {({ field, form }) => (
                          <FormControl
                            mt="0.75rem"
                            id={fields.name}
                            isRequired={fields.isRequired}
                            isInvalid={
                              form.errors[fields.name] &&
                              form.touched[fields.name]
                            }
                          >
                            <FormLabel>{fields.label}</FormLabel>
                            <Input
                              placeholder={fields.placeholder}
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors[fields.name]}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    ))}
                  </Box>
                  <ButtonPrimary
                    mt="1.25rem"
                    mb="1.25rem"
                    type="submit"
                    isLoading={props.isSubmitting}
                    onClick={() => handleSubmit(props)}
                  >
                    Salvar
                  </ButtonPrimary>
                </Flex>
              </Form>
            )}
          </Formik>
        </Flex>
      </Flex>
    </>
  );
};

export default StudentForm;
