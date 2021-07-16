import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import ResumeService from "../../../services/resumeService";

export default function UpdateGithubLink({ resumeId, updateResumeValues }) {
  let resumeService = new ResumeService();
  const updateGithubLinkSchema = Yup.object().shape({
    githubLink: Yup.string().required("Zorunlu alan"),
  });

  const formik = useFormik({
    initialValues: {
      githubLink: "",
    },
    validationSchema: updateGithubLinkSchema,
    onSubmit: (values) => {
      resumeService
        .updateGithubLink(resumeId, values.githubLink)
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
          <b>GitHub Link</b>
        </label>
        <div style={{ marginTop: "1em", marginBottom: "1em" }}>
          <Form.Input
            fluid
            placeholder="Github Link"
            type="text"
            value={formik.values.githubLink}
            name="githubLink"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.githubLink && formik.touched.githubLink && (
            <div className={"ui pointing red basic label"}>
              {formik.errors.githubLink}
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
