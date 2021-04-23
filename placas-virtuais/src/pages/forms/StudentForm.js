import React from "react";
import { Flex, Text, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";

import {
  BreadCrumbs,
  ButtonPrimary,
  ButtonTertiary,
  InputForm,
  MyBox,
} from "../../components";
import { studentFields } from "./formFields";

const StudentForm = () => {
  const toast = useToast();

  const formikInitialValues = {
    name: undefined,
    enterTime: undefined,
    graduationTime: undefined,
    individualPhoto: undefined,
    linkedin: undefined,
  };

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
                  <MyBox minW="50vw">
                    {studentFields.map((field, index) => (
                      <InputForm attributes={field} index={index} />
                    ))}
                  </MyBox>
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
