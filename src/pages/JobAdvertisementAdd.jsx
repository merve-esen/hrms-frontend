import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Form, Button, Card, Grid } from "semantic-ui-react";
import { toast } from "react-toastify";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import HrmsDropdown from "./../utilities/customFormControls/HrmsDropdown";
import HrmsTextArea from "./../utilities/customFormControls/HrmsTextArea";
import JobAdvertisementService from "./../services/jobAdvertisementService";
import WorkplaceService from "./../services/workplaceService";
import CityService from "./../services/cityService";
import WorkTimeService from "./../services/workTimeService";
import JobPositionService from "./../services/jobPositionService";

export default function JobAdvertisementAdd() {
  let jobAdvertisementService = new JobAdvertisementService();
  const history = useHistory();

  const [workTimes, setWorkTimes] = useState([]);
  const [workplaces, setWorkplaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    let workTimeService = new WorkTimeService();
    let workplaceService = new WorkplaceService();
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();

    workTimeService.getAll().then((result) => setWorkTimes(result.data.data));
    workplaceService.getAll().then((result) => setWorkplaces(result.data.data));
    cityService.getAll().then((result) => setCities(result.data.data));
    jobPositionService
      .getAll()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  const workTimeOptions = workTimes.map((workTime, index) => ({
    key: index,
    text: workTime.name,
    value: workTime.id,
  }));
  const workplaceOptions = workplaces.map((workplace, index) => ({
    key: index,
    text: workplace.name,
    value: workplace.id,
  }));
  const cityOptions = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));
  const jobPositionOptions = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.name,
    value: jobPosition.id,
  }));

  const schema = Yup.object({
    jobDescription: Yup.string().required("Zorunlu alan"),
    numberOfOpenPositions: Yup.number().required("Zorunlu alan").moreThan(0,"Açık Pozisyon Adedi 0'dan büyük olmalıdır"),
    minimumSalary: Yup.number().min(0),
    maximumSalary: Yup.number().min(0),
    jobPositionId: Yup.number().required("Zorunlu alan").min(1),
    cityId: Yup.number().required("Zorunlu alan").min(1),
    workTimeId: Yup.number().required("Zorunlu alan").min(1),
    workplaceId: Yup.number().required("Zorunlu alan").min(1),
    applicationDeadline: Yup.date().required("Zorunlu alan"),
  });

  const formik = useFormik({
    initialValues: {
      jobDescription: "",
      numberOfOpenPositions: 0,
      minimumSalary: 0,
      maximumSalary: 0,
      applicationDeadline: "",
      jobPositionId: "",
      cityId: "",
      workTimeId: "",
      workplaceId: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      values.employerId = 4; //TODO

      jobAdvertisementService
        .add(values)
        .then((result) => {
          console.log(result);
          toast.success(
            result.data.message ? result.data.message : "İş ilanı eklendi"
          );
          history.push("/jobAdvertisements");
        })
        .catch((result) => {
          console.log(result);
          toast.error(result.response.data.message);
        });
      //history.push("/jobAdvertisements");
    },
  });

  return (
    <FormikProvider value={formik}>
      <Card fluid>
        <Card.Content header="İş ilanı Ekle" />
        <Card.Content>
          <Form className="ui form" onSubmit={formik.handleSubmit}>
            <Grid>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <HrmsDropdown
                  placeholder="İş Pozisyonu"
                  name="jobPositionId"
                  options={jobPositionOptions}
                  onChange={(e, { value }) =>
                    formik.setFieldValue("jobPositionId", value)
                  }
                  search
                  clearable
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <HrmsDropdown
                  placeholder="Şehir"
                  name="cityId"
                  options={cityOptions}
                  onChange={(e, { value }) =>
                    formik.setFieldValue("cityId", value)
                  }
                  search
                  clearable
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <HrmsDropdown
                  placeholder="Çalışma Şekli"
                  name="workplaceId"
                  options={workplaceOptions}
                  onChange={(e, { value }) =>
                    formik.setFieldValue("workplaceId", value)
                  }
                  search
                  clearable
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <HrmsDropdown
                  placeholder="Çalışma Zamanı"
                  name="workTimeId"
                  options={workTimeOptions}
                  onChange={(e, { value }) =>
                    formik.setFieldValue("workTimeId", value)
                  }
                  search
                  clearable
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <HrmsTextInput
                  name="numberOfOpenPositions"
                  placeholder="Açık Pozisyon Adedi"
                  type="number"
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <HrmsTextInput
                  name="minimumSalary"
                  placeholder="Minimum Ücret"
                  type="number"
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <HrmsTextInput
                  name="maximumSalary"
                  placeholder="Maksimum Ücret"
                  type="number"
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <HrmsTextInput
                  name="applicationDeadline"
                  placeholder="Son Başvuru Tarihi"
                  type="date"
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={16}>
                <HrmsTextArea
                  name="jobDescription"
                  placeholder="İş Tanımı"
                  onChange={formik.handleChange}
                />
              </Grid.Column>
              <Grid.Row centered columns={8}>
                <Grid.Column>
                  <Button color="green" type="submit" fluid>
                    Ekle
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Card.Content>
      </Card>
    </FormikProvider>
  );
}
