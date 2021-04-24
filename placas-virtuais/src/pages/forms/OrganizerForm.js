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
import Dialog from "./Dialog";
import { organizerFields } from "./formFields";
import SectionsForm from "./SectionsForm";

const OrganizerForm = () => {
  const toast = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const onConfirm = () => {
    setIsOpen(false);
    toast({
      title: "Sucesso",
      description: "Dados da turma foram salvos!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  let initialValues = {
    name: "",
    graduationTime: "",
    groupPhoto: "",
    sections: [],
  };

  const handleSubmit = (props) => {
    const values = props.values;
    const lackValues =
      !values.name & !values.graduationTime & !values.groupPhoto;
    const hasErrors = Object.keys(props.errors).length > 0;
    const verification = !(lackValues | hasErrors);
    toast({
      title: verification ? "Sucesso" : "Atenção",
      description: verification
        ? "Os dados da turma foram salvos!"
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
          <Flex justify="center" align="center" direction="column">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                console.log(values);
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
                      {Object.keys(organizerFields).map((fieldName, index) => {
                        const fieldAttributes = organizerFields[`${fieldName}`];
                        return (
                          <>
                            {fieldName !== "sections" ? (
                              <InputForm
                                attributes={fieldAttributes}
                                index={index}
                              />
                            ) : (
                              <>
                                <SectionsForm
                                  props={props}
                                  formFields={organizerFields}
                                />
                              </>
                            )}
                          </>
                        );
                      })}
                    </MyBox>
                    <ButtonPrimary
                      as="button"
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
            <Dialog
              cancelRef={cancelRef}
              onClose={() => setIsOpen(false)}
              isOpen={isOpen}
              onConfirm={onConfirm}
              time="2021.1"
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default OrganizerForm;
