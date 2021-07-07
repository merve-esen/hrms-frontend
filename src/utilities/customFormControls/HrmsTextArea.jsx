import React from "react";
import { useField } from "formik";
import { FormField, Label, TextArea } from "semantic-ui-react";

export default function HrmsTextArea({ ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{props.placeholder ? props.placeholder : ""}</label>
      <TextArea {...field} {...props} />
      {meta.touched && !!meta.error ? (
        <Label pointing basic color="red" content={meta.error}></Label>
      ) : null}
    </FormField>
  );
}
