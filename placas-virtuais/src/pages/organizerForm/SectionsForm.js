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
import { ButtonSecondary } from "../../components";

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
                    <option value="titleText">Texto com título</option>
                    <option value="text">Texto sem título</option>
                    <option value="list">Lista de nomes com título</option>
                  </Select>
                )}
              </Field>
              {section.type !== "text" && (
                <>
                  <Field name={`sections.${index}.title`}>
                    {({ field }) => (
                      <Input
                        placeholder="Digite o títlo"
                        value={section.title}
                        mt="1rem"
                        {...field}
                      />
                    )}
                  </Field>
                </>
              )}
              <Field name={`sections.${index}.content`}>
                {({ field }) => (
                  <Textarea
                    placeholder={
                      section.type === "list"
                        ? formFields.placeholderText.list
                        : formFields.placeholderText.text
                    }
                    value={section.content}
                    mt="1rem"
                    {...field}
                  />
                )}
              </Field>
            </FormControl>
          </Flex>
        ))}
        <Flex direction="column">
          <ButtonSecondary
            type="button"
            onClick={() => {
              push({
                type: "",
                title: "",
                content: "",
              });
            }}
            mt="1rem"
          >
            Adicionar nova sessão
          </ButtonSecondary>
        </Flex>
      </>
    )}
  </FieldArray>
);

export default SectionsForm;
