import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Form, Button, Card, Grid } from "semantic-ui-react";
import { toast } from "react-toastify";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import HrmsDropdown from "./../utilities/customFormControls/HrmsDropdown";
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
    jobPositionService.getAll().then((result) => setJobPositions(result.data.data));
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
    jobDescription: Yup.string().required(),
    numberOfOpenPositions: Yup.number().required(),
    minimumSalary: Yup.number().min(0),
    maximumSalary: Yup.number().min(0),
    jobPositionId: Yup.number().required().min(1),
    cityId: Yup.number().required(),
    workTimeId: Yup.number().required(),
    workplaceId: Yup.number().required(),
    applicationDeadline: Yup.date().required(),
  });

  const formik = useFormik({
    initialValues: {
      jobDescription: "",
      numberOfOpenPositions: 0,
      minimumSalary: 0,
      maximumSalary: 0,
      applicationDeadline: "",
      jobPositionId: 0,
      cityId: 0,
      workTimeId: 0,
      workplaceId: 0
    },
    validationSchema: schema,
    onSubmit: values => {
      console.log(values);
      values.employerId = 2; //TODO

      jobAdvertisementService
        .add(values)
        .then((result) => {
          console.log(result)
          toast.success(result.data.message ? result.data.message : "İş ilanı eklendi");
          history.push("/jobAdvertisements");
        })
        .catch((result) => {
          console.log(result)
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
            <Grid columns={4}>
              <Grid.Row>
                <Grid.Column>
                  <HrmsTextInput
                    name="jobDescription"
                    placeholder="İş Tanımı"
                    onChange={formik.handleChange}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>

                <Grid.Column>
                  <HrmsDropdown
                    placeholder="İş Pozisyonu"
                    name="jobPositionId"
                    options={jobPositionOptions}
                    onChange={(e, { value }) =>
                      formik.setFieldValue('jobPositionId', value)
                    }
                    search
                    clearable
                  />
                </Grid.Column>
                <Grid.Column>
                  <HrmsDropdown
                    placeholder="Şehir"
                    name="cityId"
                    options={cityOptions}
                    onChange={(e, { value }) =>
                      formik.setFieldValue('cityId', value)
                    }
                    search
                    clearable
                  />
                </Grid.Column>
                <Grid.Column>
                  <HrmsDropdown
                    placeholder="Çalışma Şekli"
                    name="workplaceId"
                    options={workplaceOptions}
                    onChange={(e, { value }) =>
                      formik.setFieldValue('workplaceId', value)
                    }
                    search
                    clearable
                  />
                </Grid.Column>
                <Grid.Column>
                  <HrmsDropdown
                    placeholder="Çalışma Zamanı"
                    name="workTimeId"
                    options={workTimeOptions}
                    onChange={(e, { value }) =>
                      formik.setFieldValue('workTimeId', value)
                    }
                    search
                    clearable
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <HrmsTextInput
                    name="numberOfOpenPositions"
                    placeholder="Açık Pozisyon Adedi"
                    type="number"
                  />
                </Grid.Column>
                <Grid.Column>
                  <HrmsTextInput
                    name="minimumSalary"
                    placeholder="Minimum Ücret"
                    type="number"
                  />
                </Grid.Column>
                <Grid.Column>
                  <HrmsTextInput
                    name="maximumSalary"
                    placeholder="Maksimum Ücret"
                    type="number"
                  />
                </Grid.Column>
                <Grid.Column>
                  <HrmsTextInput
                    name="applicationDeadline"
                    placeholder="Son Başvuru Tarihi"
                    type="date"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Button color="green" type="submit">
              Ekle
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </FormikProvider>
  );
}
