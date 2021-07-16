import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import ResumeService from "../../../services/resumeService";

export default function UpdateLinkedinLink({ resumeId, updateResumeValues }) {
  let resumeService = new ResumeService();
  const updateLinkedinLinkSchema = Yup.object().shape({
    linkedinLink: Yup.string().required("Zorunlu alan"),
  });

  const formik = useFormik({
    initialValues: {
      linkedinLink: "",
    },
    validationSchema: updateLinkedinLinkSchema,
    onSubmit: (values) => {
      resumeService
        .updateLinkedinLink(resumeId, values.linkedinLink)
        .then((result) => {
          toast.success(result.data.message);
          updateResumeValues();
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

  return (
    <div>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <label>
          <b>Linkedin Link</b>
        </label>
        <div style={{ marginTop: "1em", marginBottom: "1em" }}>
          <Form.Input
            fluid
            placeholder="Linkedin Link"
            type="text"
            value={formik.values.linkedinLink}
            name="linkedinLink"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.linkedinLink && formik.touched.linkedinLink && (
            <div className={"ui pointing red basic label"}>
              {formik.errors.linkedinLink}
            </div>
          )}
        </div>
        <Button color="green" fluid size="large" type="submit">
          Güncelle
        </Button>
      </Form>
    </div>
  );
}
