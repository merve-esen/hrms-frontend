import React from "react";
import ResumeService from "../../../services/resumeService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";

export default function UpdateObjective({
  resumeId,
  updateResumeValues,
  curentObjective,
}) {
  let resumeService = new ResumeService();
  const updateObjectiveSchema = Yup.object().shape({
    objective: Yup.string().required("Zorunlu alan"),
  });

  const formik = useFormik({
    initialValues: {
      objective: curentObjective,
    },
    validationSchema: updateObjectiveSchema,
    onSubmit: (values) => {
      resumeService
        .updateObjective(resumeId, values.objective)
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
          <b>Ön Yazı</b>
        </label>
        <div style={{ marginTop: "1em", marginBottom: "1em" }}>
          <Form.TextArea
            placeholder="Ön yazı..."
            type="text"
            value={formik.values.objective}
            name="objective"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ minHeight: 200 }}
          />
          {formik.errors.objective && formik.touched.objective && (
            <div className={"ui pointing red basic label"}>
              {formik.errors.objective}
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
