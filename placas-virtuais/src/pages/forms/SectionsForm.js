import {
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Field, FieldArray } from "formik";
import React from "react";

const SectionsForm = ({ props, formFields }) => (
  <FieldArray name="sections">
    {({ push, remove }) => (
      <>
        {props.values.sections.map((section, index) => (
          <Flex justify="center" align="center">
            <CloseButton
              size="lg"
              onClick={() => remove(index)}
              mr="1rem"
              color="red.500"
            />
            <FormControl mt="1rem">
              <FormLabel htmlFor="name">Nova seção</FormLabel>
              <Field name={`sections.${index}.type`}>
                {({ field }) => (
                  <Select
                    placeholder="Selecione o tipo de seção"
                    defaultValue={section.type}
                    {...field}
                  >
                    <option value="text">Texto com título</option>
                    <option value="list">Lista de nomes com título</option>
                  </Select>
                )}
              </Field>
              <Field name={`sections.${index}.title`}>
                {({ field }) => (
                  <Input
                    placeholder="Digite o títlo"
                    value={section.title}
                    my="1rem"
                    {...field}
                  />
                )}
              </Field>
              <Field name={`sections.${index}.text`}>
                {({ field }) => (
                  <Textarea
                    placeholder={
                      section.type === "list"
                        ? formFields.sections.placeholderText.list
                        : formFields.sections.placeholderText.text
                    }
                    value={section.text}
                    {...field}
                  />
                )}
              </Field>
            </FormControl>
          </Flex>
        ))}
        <Flex direction="column">
          <button
            type="button"
            onClick={() => {
              push({
                type: "",
                title: "",
                text: "",
              });
            }}
            mt="1rem"
          >
            Adicionar nova sessão
          </button>
        </Flex>
      </>
    )}
  </FieldArray>
);

export default SectionsForm;
