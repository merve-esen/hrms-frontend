import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import EducationService from "../../../services/educationService";

export default function UpdateEducation({ resumeId, updateResumeValues }) {
  let [educations, setEducations] = useState([]);

  let educationService = new EducationService();
  useEffect(() => {
    let educationService = new EducationService();
    educationService
      .getAllByResumeIdOrderByEndYearDesc(resumeId)
      .then((result) => {
        setEducations(result.data.data);
      });
  }, [resumeId]);

  let educationAddSchema = Yup.object().shape({
    schoolName: Yup.string()
      .required("Zorunlu alan")
      .min(2, "Minimum 2 karakter uzunluğunda olmalıdır"),
    departmentName: Yup.string()
      .required("Zorunlu alan")
      .min(2, "Minimum 2 karakter uzunluğunda olmalıdır"),
    startYear: Yup.number().required("Zorunlu alan"),
    endYear: Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      schoolName: "",
      departmentName: "",
      startYear: "",
      endYear: "",
    },
    validationSchema: educationAddSchema,
    onSubmit: (values) => {
      educationService
        .add({
          resume: { id: resumeId },
          schoolName: values.schoolName,
          departmentName: values.departmentName,
          startYear: values.startYear,
          endYear: values.endYear
        })
        .then((result) => {
          toast.success(result.data.message);
          educationService
            .getAllByResumeIdOrderByEndYearDesc(resumeId)
            .then((result) => {
              setEducations(result.data.data);
            });
          updateResumeValues();
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

  const handleDeleteEducation = (educationId) => {
    educationService
      .delete(educationId)
      .then((result) => {
        toast.success(result.data.message);
        educationService.getByResumeId(resumeId).then((result) => {
          setEducations(result.data.data);
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
        <Card.Content header="Okuduğu Okullar" />
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Okul Adı</Table.HeaderCell>
              <Table.HeaderCell>Bölüm</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Yılı</Table.HeaderCell>
              <Table.HeaderCell>Mezuniyet Yılı</Table.HeaderCell>
              <Table.HeaderCell>Sil</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {educations?.map((education) => (
              <Table.Row key={education.id}>
                <Table.Cell>{education.schoolName}</Table.Cell>
                <Table.Cell>{education.departmentName}</Table.Cell>
                <Table.Cell>{education.startYear}</Table.Cell>
                <Table.Cell>{education.endYear}</Table.Cell>
                <Table.Cell>
                  <Button
                    color="red"
                    icon="x"
                    circular
                    onClick={() => handleDeleteEducation(education.id)}
                  ></Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid color={"black"}>
        <Card.Content header="Eğitim Bilgisi Ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Grid stackable>
              <Grid.Column width={8}>
                <label>
                  <b>Okul Adı</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Okul Adı"
                  type="text"
                  name="schoolName"
                  value={formik.values.schoolName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
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
              </Grid.Column>
              <Grid.Column width={8}>
                <label>
                  <b>Bölüm Adı</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Bölüm Adı"
                  type="text"
                  name="departmentName"
                  value={formik.values.departmentName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label>
                  <b>Mezuniyet Yılı</b>
                </label>
                <Form.Input
                  fluid
                  type="number"
                  name="endYear"
                  value={formik.values.endYear}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
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
