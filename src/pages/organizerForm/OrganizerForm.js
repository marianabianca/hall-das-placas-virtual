import React, { useEffect, useState } from "react";
import {
  Box,
  Code,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { Parser } from "json2csv";
import {
  BreadCrumbs,
  ButtonPrimary,
  ButtonTertiary,
  MyBox,
} from "../../components";
// import Dialog from "./Dialog";
import { organizerFields } from "./formFields";
import SectionsForm from "./SectionsForm";
import { csvJSON } from "./utils";
import { db } from "../firebaseClient";
import { auth } from "../firebaseAuth";

const OrganizerForm = () => {
  const history = useHistory();
  const toast = useToast();
  // const [isOpen, setIsOpen] = React.useState(false);
  // const cancelRef = React.useRef();
  const [initialValues, setInitialValues] = useState({
    name: "",
    graduationSemester: "",
    groupPhoto: "",
    color: "",
    people: "",
    sections: [],
  });
  const [loading, setLoading] = useState(true);
  const [originalDoc, setOriginalDoc] = useState(undefined);
  const peopleCSVFormat =
    "CSV separado por , (vírgula)\n" +
    "\nname: Nome do graduado (obrigatório)" +
    "\nenterSemester: Período que entrou no curso <AAAA.P> (obrigatório)" +
    "\ngraduationSemester: Período de graduação <AAAA.P> (obrigatório)" +
    "\nindividualPhoto: Link para uma imagem QUADRADA individual (obrigatório)" +
    "\nlinkedin: Link do perfil pessoal no Linkedin (opcional)";

  useEffect(() => {
    const getBoardDate = async () => {
      const creatorID = auth.currentUser.uid;
      const boardData = await db
        .collection("placas")
        .where("creatorID", "==", creatorID)
        .get();
      if (boardData.docs.length > 0) {
        const json2csvParser = new Parser();
        const values = boardData.docs[0].data();
        const peopleCSV = json2csvParser
          .parse(values.people)
          .replaceAll('"', "");
        values.people = peopleCSV;
        setOriginalDoc(boardData.docs[0]);
        setInitialValues(values);
      }
      setLoading(false);
    };
    getBoardDate();
  }, []);

  // const onConfirm = () => {
  //   setIsOpen(false);
  //   toast({
  //     title: "Sucesso",
  //     description: "Dados da turma foram salvos!",
  //     status: "success",
  //     duration: 9000,
  //     isClosable: true,
  //   });
  // };

  return (
    <>
      <BreadCrumbs
        pages={[
          { title: "Página inicial", to: "/", isCurrentPage: false },
          {
            title: "Página do organizador",
            to: "/organizador",
            isCurrentPage: true,
          },
        ]}
      />
      <Flex align="center" justify="center" direction="column">
        <Flex align="start" direction="column" mt="1.25rem">
          <Flex justify="space-between" align="center" width="50vw">
            <Text fontSize="5xl">Dados da placa</Text>
            <ButtonTertiary
              onClick={async () => {
                await auth.signOut();
                history.push("/");
              }}
            >
              Sair
            </ButtonTertiary>
          </Flex>
          <Flex justify="center" align="center" direction="column">
            {loading ? (
              <MyBox w="50vw">
                <Flex align="center" justify="center">
                  <Spinner size="xl" />
                </Flex>
              </MyBox>
            ) : (
              <Formik
                initialValues={initialValues}
                onSubmit={async (values, actions) => {
                  const formattedValues = {
                    ...values,
                    people: csvJSON(values.people),
                    creatorID: auth.currentUser.uid,
                  };
                  if (originalDoc) {
                    await db
                      .collection("placas")
                      .doc(originalDoc.id)
                      .update(formattedValues);
                    toast({
                      title: "",
                      description: "Os dados da placa foram salvos.",
                      status: "success",
                      duration: 3000,
                      position: "bottom-right",
                      isClosable: true,
                    });
                  } else {
                    try {
                      await db.collection("placas").add(formattedValues);
                      toast({
                        title: "",
                        description: "Os dados da placa foram salvos.",
                        status: "success",
                        duration: 3000,
                        position: "bottom-right",
                        isClosable: true,
                      });
                    } catch (e) {
                      toast({
                        title: "Ocorreu algum problema",
                        description: e.message,
                        status: "warning",
                        duration: 3000,
                        position: "bottom-right",
                        isClosable: true,
                      });
                    }
                  }
                }}
              >
                {(props) => (
                  <Form>
                    <Flex justify="center" align="center" direction="column">
                      <MyBox maxW="50vw">
                        {organizerFields.map((fieldAttributes, index) => {
                          return (
                            <>
                              {fieldAttributes.inputType === "input" && (
                                <Field
                                  name={fieldAttributes.name}
                                  validate={fieldAttributes.validateFunc}
                                >
                                  {({ field, form }) => (
                                    <FormControl
                                      mt={index > 0 ? "1rem" : "0"}
                                      id={fieldAttributes.name}
                                      isRequired={fieldAttributes.isRequired}
                                      isInvalid={
                                        form.errors[fieldAttributes.name] &&
                                        form.touched[fieldAttributes.name]
                                      }
                                    >
                                      <FormLabel>
                                        {fieldAttributes.label}
                                      </FormLabel>
                                      <Input
                                        placeholder={
                                          fieldAttributes.placeholder
                                        }
                                        {...field}
                                      />
                                      <FormErrorMessage>
                                        {form.errors[fieldAttributes.name]}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                              )}
                              {fieldAttributes.inputType === "radio" && (
                                <Field name={fieldAttributes.name} type="radio">
                                  {({ field }) => (
                                    <FormControl
                                      mt={index > 0 ? "1rem" : "0"}
                                      id={fieldAttributes.name}
                                      isRequired={fieldAttributes.isRequired}
                                    >
                                      <FormLabel>
                                        {fieldAttributes.label}
                                      </FormLabel>
                                      <Stack direction="row">
                                        <RadioGroup
                                          {...field}
                                          name={fieldAttributes.name}
                                          value={props.values.color}
                                        >
                                          {fieldAttributes.options.map(
                                            (option) => (
                                              <Radio
                                                {...field}
                                                value={option}
                                                mt="0.5rem"
                                              >
                                                <Box
                                                  w="2rem"
                                                  h="2rem"
                                                  mr="1rem"
                                                  bg={option}
                                                />
                                              </Radio>
                                            )
                                          )}
                                        </RadioGroup>
                                      </Stack>
                                    </FormControl>
                                  )}
                                </Field>
                              )}
                              {fieldAttributes.inputType === "textArea" && (
                                <Field
                                  name={fieldAttributes.name}
                                  validate={fieldAttributes.validateFunc}
                                >
                                  {({ field, form }) => (
                                    <FormControl
                                      mt={index > 0 ? "1rem" : "0"}
                                      id={fieldAttributes.name}
                                      isRequired={fieldAttributes.isRequired}
                                      isInvalid={
                                        form.errors[fieldAttributes.name] &&
                                        form.touched[fieldAttributes.name]
                                      }
                                    >
                                      <FormLabel>
                                        {fieldAttributes.label}
                                      </FormLabel>
                                      <Code fontSize="xs">
                                        <pre>{peopleCSVFormat}</pre>
                                      </Code>
                                      <Textarea
                                        mt="0.75rem"
                                        h="8rem"
                                        placeholder={
                                          fieldAttributes.placeholder
                                        }
                                        {...field}
                                      />
                                      <FormErrorMessage>
                                        {form.errors[fieldAttributes.name]}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                              )}
                              {fieldAttributes.inputType === "array" && (
                                <>
                                  <SectionsForm
                                    props={props}
                                    formFields={organizerFields[index]}
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
                      >
                        Salvar
                      </ButtonPrimary>
                    </Flex>
                    {/* <Dialog
                    cancelRef={cancelRef}
                    onClose={() => setIsOpen(false)}
                    isOpen={isOpen}
                    onConfirm={onConfirm}
                    semester={props.values.graduationSemester}
                  /> */}
                  </Form>
                )}
              </Formik>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default OrganizerForm;
