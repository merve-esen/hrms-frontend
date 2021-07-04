import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Card } from "semantic-ui-react";
import { toast } from "react-toastify";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import JobAdvertisementService from "./../services/jobAdvertisementService";
import WorkplaceService from "./../services/workplaceService";
import CityService from "./../services/cityService";
import WorkTimeService from "./../services/workTimeService";
import JobPositionService from "./../services/jobPositionService";
import HrmsDropdown from "./../utilities/customFormControls/HrmsDropdown";

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

  const workTimeOption = workTimes.map((workTime, index) => ({
    key: index,
    text: workTime.name,
    value: workTime.id,
  }));
  const workplaceOption = workplaces.map((workplace, index) => ({
    key: index,
    text: workplace.name,
    value: workplace.id,
  }));
  const cityOption = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));
  const jobPositionOption = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.name,
    value: jobPosition.id,
  }));

  const initialValues = {
    jobDescription: "",
    numberOfOpenPositions: 0,
    minimumSalary: 0,
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
    minimumSalary: Yup.number().min(0),
    maximumSalary: Yup.number().min(0),
    jobPositionId: Yup.number().required().min(1),
    cityId: Yup.number().required(),
    workTimeId: Yup.number().required(),
    workplaceId: Yup.number().required(),
    applicationDeadline: Yup.date().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log(values);
        values.employerId = 4; //TODO
        /*values.minimumSalary = 4;
        values.maximumSalary = 400;
        values.applicationDeadline = '2021-07-14';
        values.jobPositionId = 1;
        values.cityId = 34;
        values.workTimeId = 1;
        values.workplaceId = 1;*/
        jobAdvertisementService
          .add(values)
          .then((result) => {
            toast.success(result.data.message);
          })
          .catch((result) => {
            toast.error(result.response.data.message);
          });
        history.push("/jobAdvertisements");
      }}
    >
      <Card fluid>
        <Card.Content header="İş ilanı Ekle" />
        <Card.Content>
          <Form className="ui form">
            <HrmsTextInput
              name="jobDescription"
              placeholder="Job Description"
            />
            <HrmsTextInput
              name="numberOfOpenPositions"
              placeholder="Number Of Open Positions"
            />
            <HrmsDropdown
              clearable
              item
              placeholder="İş pozisyonu"
              search
              selection
              name="jobPositionId"
              options={jobPositionOption}
            />
            <Button color="green" type="submit">
              Ekle
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Formik>
  );
}
