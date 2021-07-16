import React, { useState } from "react";
import { useEffect } from "react";
import { Card, Table, Button, Form, Grid, Dropdown } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import LanguageSkillService from "../../../services/languageSkillService";

export default function UpdateLanguageSkill({ resumeId, updateResumeValues }) {
  let [languageSkills, setLanguageSkills] = useState([]);

  let languageSkillService = new LanguageSkillService();

  useEffect(() => {
    let languageSkillService = new LanguageSkillService();
    languageSkillService.getAllByResumeId(resumeId).then((result) => {
      setLanguageSkills(result.data.data);
    });
  }, [resumeId]);

  let languageSkillAddSchema = Yup.object().shape({
    language: Yup.string()
      .required("Zorunlu alan")
      .min(2, "En az 2 karakter uzunluğunda olmalıdır"),
    level: Yup.number()
      .min(1, "1'den az olamaz")
      .max(5, "5'ten fazla olamaz")
      .required("Zorunlu alan"),
  });

  const formik = useFormik({
    initialValues: {
      language: "",
      level: "",
    },
    validationSchema: languageSkillAddSchema,
    onSubmit: (values) => {
      values.resumeId = resumeId;
      languageSkillService
        .add({
          resume: { id: resumeId },
          language: values.language,
          level: values.level,
        })
        .then((result) => {
          toast.success(result.data.message);
          languageSkillService.getAllByResumeId(resumeId).then((result) => {
            setLanguageSkills(result.data.data);
          });
          updateResumeValues();
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

  const levels = [1, 2, 3, 4, 5];
  const levelOption = levels.map((level) => ({
    key: level,
    text: level,
    value: level,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  const handleDeleteLanguageSkill = (languageSkillId) => {
    languageSkillService
      .delete(languageSkillId)
      .then((result) => {
        toast.success(result.data.message);
        languageSkillService.getAllByResumeId(resumeId).then((result) => {
          setLanguageSkills(result.data.data);
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
        <Card.Content header="Yabancı Diller" />
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Dil</Table.HeaderCell>
              <Table.HeaderCell>Seviye</Table.HeaderCell>
              <Table.HeaderCell>Sil</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {languageSkills?.map((languageSkill) => (
              <Table.Row key={languageSkill.id}>
                <Table.Cell>{languageSkill.language}</Table.Cell>
                <Table.Cell>{languageSkill.level}</Table.Cell>
                <Table.Cell>
                  <Button
                    color="red"
                    icon="x"
                    circular
                    onClick={() => handleDeleteLanguageSkill(languageSkill.id)}
                  ></Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid color={"black"}>
        <Card.Content header="Dil Ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Grid stackable>
              <Grid.Column width={8}>
                <label>
                  <b>Dil Adı</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Dil Adı"
                  type="text"
                  name="language"
                  value={formik.values.language}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.language && formik.touched.language && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.language}
                  </div>
                )}
              </Grid.Column>
              <Grid.Column width={8}>
                <label>
                  <b>Seviye</b>
                </label>
                <Dropdown
                  clearable
                  item
                  placeholder="Seviye"
                  search
                  selection
                  fluid
                  options={levelOption}
                  onChange={(event, data) => {
                    handleChangeSemantic(data.value, "level");
                  }}
                  value={formik.values.level}
                  onBlur={formik.handleBlur}
                  name="level"
                />
                {formik.errors.level && formik.touched.level && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.level}
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
