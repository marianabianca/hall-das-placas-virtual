import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

export const InputForm = ({ attributes, index }) => (
  <Field name={attributes.name} validate={attributes.validateFunc}>
    {({ field, form }) => (
      <FormControl
        mt={index > 0 ? "0.75rem" : "0"}
        id={attributes.name}
        isRequired={attributes.isRequired}
        isInvalid={
          form.errors[attributes.name] && form.touched[attributes.name]
        }
      >
        <FormLabel>{attributes.label}</FormLabel>
        <Input placeholder={attributes.placeholder} {...field} />
        <FormErrorMessage>{form.errors[attributes.name]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
);
