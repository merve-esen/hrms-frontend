import React from "react";
import { useField } from "formik";
import { FormField, Label } from "semantic-ui-react";

export default function KodlamaIoTextInput({ ...props }) {
  //console.log(props)
  const [field, meta] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{props.placeholder ? props.placeholder : ""}</label>
      <input {...field} {...props} />
      {meta.touched && !!meta.error ? (
        <Label pointing basic color="red" content={meta.error}></Label>
      ) : null}
    </FormField>
  );
}
