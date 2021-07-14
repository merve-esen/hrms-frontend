import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import ProgrammingTechnologySkillService from "../../../services/programmingTechnologySkillService";

export default function UpdateProgrammingTechnologySkill({ resumeId, updateResumeValues }) {
  let [technologies, setTechnologies] = useState([]);

  let technologyService = new ProgrammingTechnologySkillService();
  useEffect(() => {
    let technologyService = new ProgrammingTechnologySkillService();
    technologyService.getByResumeId(resumeId).then((result) => {
      setTechnologies(result.data.data);
    });
  }, [resumeId]);

  let technologyAddSchema = Yup.object().shape({
    name: Yup.string()
      .required("Zorunlu alan")
      .min(2, "Minimum 2 karakter uzunluğunda olmalıdır"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: technologyAddSchema,
    onSubmit: (values) => {
      values.resumeId = resumeId;
      technologyService
        .add(values)
        .then((result) => {
          toast.success(result.data.message)
          technologyService.getByResumeId(resumeId).then((result) => {
            setTechnologies(result.data.data)
          })
          updateResumeValues();
        })
        .catch((result) => {
          toast.error(result.response.data.message)
        });
    },
  });

  const handleDeleteTechnology = (technologyId) => {
    technologyService.delete(technologyId).then((result) => {
      toast.success(result.data.message)
      technologyService.getByResumeId(resumeId).then((result) => {
        setTechnologies(result.data.data)
      })
      updateResumeValues();
    }).catch((result) => {
      toast.error(result.response.data.message)
    })
  }

  return (
    <div>
      <Grid stackable>
        <Grid.Column width={8}>
          <Card fluid color={"black"}>
            <Card.Content header={"Teknoloji Ekle"} />
            <Card.Content>
              <Form onSubmit={formik.handleSubmit}>
                <label>
                  <b>Teknoloji Adı</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Teknoloji Adı Adı"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.name}
                  </div>
                )}
                <Button fluid color="green" type="submit">Ekle</Button>
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={8}>
          <Table celled color={"black"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Teknoloji</Table.HeaderCell>
                <Table.HeaderCell>Sil</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {technologies?.map((technology) => (
                <Table.Row key={technology.id}>
                  <Table.Cell>{technology.name}</Table.Cell>
                  <Table.Cell>
                    <Button color="red" icon="x" circular onClick={() => handleDeleteTechnology(technology.id)}>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </div>
  )
}
