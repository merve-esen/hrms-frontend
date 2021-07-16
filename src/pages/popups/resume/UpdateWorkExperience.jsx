import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import WorkExperienceService from "../../../services/workExperienceService";

export default function UpdateWorkExperience({ resumeId, updateResumeValues }) {
  let [workExperiences, setWorkExperiences] = useState([]);

  let workExperienceService = new WorkExperienceService();
  useEffect(() => {
    let workExperienceService = new WorkExperienceService();
    workExperienceService
      .getAllByResumeIdOrderByEndYearDesc(resumeId)
      .then((result) => {
        setWorkExperiences(result.data.data);
      });
  }, [resumeId]);

  let workExperienceAddSchema = Yup.object().shape({
    workplaceName: Yup.string()
      .required("Zorunlu alan")
      .min(2, "En az 2 karakter uzunluğunda olmalıdır"),
    position: Yup.string()
      .required("Zorunlu alan")
      .min(2, "En az 2 karakter uzunluğunda olmalıdır"),
    startYear: Yup.number().required("Zorunlu alan"),
    endYear: Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      workplaceName: "",
      position: "",
      startYear: "",
      endYear: "",
    },
    validationSchema: workExperienceAddSchema,
    onSubmit: (values) => {
      values.resumeId = resumeId;
      workExperienceService
        .add({
          resume: { id: resumeId },
          workplaceName: values.workplaceName,
          position: values.position,
          startYear: values.startYear,
          endYear: values.endYear,
        })
        .then((result) => {
          toast.success(result.data.message);
          workExperienceService
            .getAllByResumeIdOrderByEndYearDesc(resumeId)
            .then((result) => {
              setWorkExperiences(result.data.data);
            });
          updateResumeValues();
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

  const handleDeleteWorkExperience = (workExperienceId) => {
    workExperienceService
      .delete(workExperienceId)
      .then((result) => {
        toast.success(result.data.message);
        workExperienceService.getByResumeId(resumeId).then((result) => {
          setWorkExperiences(result.data.data);
        });
        updateResumeValues();
      })
      .catch((result) => {
        toast.error(result.response.data.message);
      });
  };

  return (
    <div>
      <Card fluid color={"black"}>
        <Card.Content header="Tecrübeler" />
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
              <Table.HeaderCell>Pozisyon</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Bitiş Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Sil</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {workExperiences?.map((workExperience) => (
              <Table.Row key={workExperience.id}>
                <Table.Cell>{workExperience.workplaceName}</Table.Cell>
                <Table.Cell>{workExperience.position}</Table.Cell>
                <Table.Cell>{workExperience.startYear}</Table.Cell>
                <Table.Cell>
                  {workExperience.endYear ? (
                    workExperience.endYear
                  ) : (
                    <p>Devam ediyor</p>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="red"
                    icon="x"
                    circular
                    onClick={() =>
                      handleDeleteWorkExperience(workExperience.id)
                    }
                  ></Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid color={"black"}>
        <Card.Content header="Tecrübe Ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Grid>
              <Grid.Column width={8}>
                <div>
                  <label>
                    <b>Şirket Adı</b>
                  </label>
                  <Form.Input
                    fluid
                    placeholder="Şirket Adı"
                    type="text"
                    name="workplaceName"
                    value={formik.values.workplaceName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.workplaceName &&
                    formik.touched.workplaceName && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.workplaceName}
                      </div>
                    )}
                </div>
                <label>
                  <b>Başlangıç Yılı</b>
                </label>
                <Form.Input
                  fluid
                  type="number"
                  name="startYear"
                  value={formik.values.startYear}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.startYear && formik.touched.startYear && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.startYear}
                  </div>
                )}
              </Grid.Column>
              <Grid.Column width={8}>
                <div>
                  <label>
                    <b>Pozisyon</b>
                  </label>
                  <Form.Input
                    fluid
                    placeholder="Pozisyon"
                    type="text"
                    name="position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.position && formik.touched.position && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.position}
                    </div>
                  )}
                </div>
                <label>
                  <b>Bitiş Tarihi</b>
                </label>
                <Form.Input
                  fluid
                  type="number"
                  name="endYear"
                  value={formik.values.endYear}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.endYear && formik.touched.endYear && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.endYear}
                  </div>
                )}
              </Grid.Column>
            </Grid>
            <div style={{ marginTop: "1em" }}>
              <Button fluid color="green" type="submit">
                Ekle
              </Button>
            </div>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
