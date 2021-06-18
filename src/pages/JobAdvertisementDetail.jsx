import React from 'react'
import { Form } from 'semantic-ui-react'
import { Formik } from 'formik';
import * as Yup from 'yup';

const positions = [
    { key: 'f', text: 'Frontend Developer', value: 'FrontendDeveloper' },
    { key: 'b', text: 'Backend Developer', value: 'BackendDeveloper' },
    { key: 's', text: 'Fullstack Developer', value: 'FullstackDeveloper' },
]

const cities = [
    { key: '34', text: 'İstanbul', value: 'İstanbul' },
    { key: '6', text: 'Ankara', value: 'Ankara' },
    { key: '16', text: 'Bursa', value: 'Bursa' },
]

export default function JobAdvertisementDetail() {

    return (
        <Formik
            initialValues={{
                position: '',
                city: '',
                numberOfOpenPositions: '',
                minSalary: '',
                maxSalary: '',
                applicationDeadline: '',
                jobDescription: '',
            }}
            validationSchema={Yup.object({
                position: Yup.string().required(),
                city: Yup.string().required(),
                numberOfOpenPositions: Yup.string().required(),
                jobDescription: Yup.string().required(),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log(values);
                setTimeout(() => {
                    setSubmitting(false);
                    resetForm();
                }, 2000);
            }}
        >
            {({
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleSubmit,
                handleReset,
                handleChange,
            }) => (
                <Form style={{ marginTop: "8em" }}>
                    <Form.Group widths='equal'>
                        <Form.Select
                            fluid
                            label='Position' 
                            name={values.position}
                            options={positions}
                            placeholder='Position'
                            onChange={handleChange}
                        />
                        {errors.position && touched.position && (
                <div>{errors.position}</div>
              )}

                        <Form.Select
                            fluid
                            label='City'
                            name={values.city}
                            options={cities}
                            placeholder='City'
                            onChange={handleChange}
                        />
                        {errors.city && touched.city && (
                <div>{errors.city}</div>
              )}
                        <Form.Input fluid label='Number of Open Positions' placeholder='Number of Open Positions' name={values.numberOfOpenPositions} onChange={handleChange} />
                        {errors.numberOfOpenPositions && touched.numberOfOpenPositions && (
                <div>{errors.numberOfOpenPositions}</div>
              )}
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Min Salary' placeholder='Min Salary' name={values.minSalary} onChange={handleChange} />
                        <Form.Input fluid label='Max Salary' placeholder='Max Salary' name={values.maxSalary} onChange={handleChange} />
                        <Form.Input fluid label='Application Deadline' placeholder='Application Deadline' name={values.applicationDeadline} onChange={handleChange} />
                    </Form.Group>
                    <Form.TextArea label='Job Description' placeholder='Job Description...' name={values.jobDescription} onChange={handleChange} />
                    {errors.jobDescription && touched.jobDescription && (
                <div>{errors.jobDescription}</div>
              )}
                    <Form.Button>Submit</Form.Button>
                </Form>
            )}
        </Formik>
    )
}
