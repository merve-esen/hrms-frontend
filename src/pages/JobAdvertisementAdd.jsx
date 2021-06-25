import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";

export default function JobAdvertisementAdd() {
  const initialValues = {
    jobDescription: "",
    numberOfOpenPositions: 0,
    minmumSalary: 0,
    maximumSalary: 0,
    applicationDeadline: "",
    jobPositionId: 0,
    cityId: 0,
    workTimeId: 0,
    workplaceId: 0
  };

  const schema = Yup.object({
    jobDescription: Yup.string().required(),
    numberOfOpenPositions: Yup.number().required(),
    jobPositionId: Yup.number().required(),
    cityId: Yup.number().required(),
    workTimeId: Yup.number().required(),
    workplaceId: Yup.number().required()
  });

  return (
    <Formik 
    initialValues={initialValues} 
    validationSchema={schema}
    onSubmit = {(values)=>{
        console.log(values)
    }}
    >
      <Form className="ui form">
        <HrmsTextInput name="jobDescription" placeholder="Job Description" />
        <HrmsTextInput name="numberOfOpenPositions" placeholder="Number Of Open Positions"/>
        <Button color="green" type="submit">Ekle</Button>
      </Form>
    </Formik>
  );
}
