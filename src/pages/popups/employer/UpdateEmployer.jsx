import React from "react";
import { Card, Grid, Form, Button, Message } from "semantic-ui-react";
import { useState } from "react";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import EmployerService from "../../../services/employerService";
import EmployerUpdateService from "../../../services/employerUpdateService";

export default function UpdateEmployer({ employerId }) {
    let formik;
    //let employerService = new EmployerService();
    let employerUpdateService = new EmployerUpdateService();

    let [employer, setEmployer] = useState([]);
    let [employerUpdates, setEmployerUpdates] = useState([]);

    const employerUpdateShema = Yup.object().shape({
        companyName: Yup.string().required("Zorunlu alan").min(2, "En az 2 karakter uzunluğunda olmalıdır"),
        phoneNumber: Yup.string().required("Zorunlu alan").min(10, "Telefon numarası 10 haneli olmalıdır").max(10, "Telefon numarası 10 haneli olmalıdır"),
        webSite: Yup.string().required("Zorunlu alan")
    })

    useEffect(() => {
        let employerService = new EmployerService();
        employerService.getById(employerId).then((result) => {
            formik.values.companyName = result.data.data.companyName
            formik.values.phoneNumber = result.data.data.phoneNumber
            formik.values.webSite = result.data.data.webSite
            setEmployer(result.data.data);
        });

        let employerUpdateService = new EmployerUpdateService();
        employerUpdateService.getByEmployerIdAndDeletedFalse(employerId)
            .then((result) => {
                setEmployerUpdates(result.data.data);
            });
    }, [formik, employerId]);

    formik = useFormik({
        initialValues: {
            companyName: "",
            phoneNumber: "",
            webSite: "",
        },
        validationSchema: employerUpdateShema,
        onSubmit: (values) => {
            employerUpdateService.add({
                companyName: values.companyName,
                phoneNumber: values.phoneNumber,
                webSite: values.webSite,
                employer: {id: employer.id}
            }).then((result) => {
                if(result.data.success)
                    toast.success("Güncelleme talebiniz başarıyla alınmıştır.")
                else
                    toast.error(result.data.message)
            }).catch((result) => {
                toast.error(result.data.message)
            })
        }
    })

    return (
        <div>
            {employerUpdates.length !== 0 && (
                <Message positive>
                    <Message.Header>Güncelleme için onay bekleniyor</Message.Header>
                    <p>
                        Son yaptığınız güncelleme talebi onaylanana kadar yeni günceleme yapamazsınız. Talebiniz en kısa sürede onaylanacaktır.
                    </p>
                </Message>
            )}
            {employerUpdates.length === 0 && (
                <Card fluid color={"teal"}>
                    <Card.Content header={"Firma Bilgilerini Güncelle"} />
                    <Card.Content>
                        <Form onSubmit={formik.handleSubmit}>
                            <Grid>
                                <Grid.Column width={16}>
                                    <div>
                                        <label><b>Firma Adı</b></label>
                                        <Form.Input
                                            fluid
                                            placeholder="Firma Adı"
                                            type="text"
                                            name="companyName"
                                            value={formik.values.companyName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.companyName && formik.touched.companyName && (
                                            <div className={"ui pointing red basic label"}>
                                                {formik.errors.companyName}
                                            </div>
                                        )}
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={16}>
                                    <div>
                                        <label><b>Web Site</b></label>
                                        <Form.Input
                                            fluid
                                            placeholder="Web Sitesi"
                                            type="text"
                                            name="webSite"
                                            value={formik.values.webSite}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.webSite && formik.touched.webSite && (
                                            <div className={"ui pointing red basic label"}>
                                                {formik.errors.webSite}
                                            </div>
                                        )}
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={16}>
                                    <div>
                                        <label><b>Telefon</b></label>
                                        <Form.Input
                                            fluid
                                            placeholder="Telefon"
                                            type="text"
                                            name="phoneNumber"
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                            <div className={"ui pointing red basic label"}>
                                                {formik.errors.phoneNumber}
                                            </div>
                                        )}
                                    </div>
                                </Grid.Column>
                            </Grid>
                            <div style={{ marginTop: "1em" }}>
                                <Button fluid color="green" type="submit">Güncelle</Button>
                            </div>
                        </Form>
                    </Card.Content>
                </Card>
            )}
        </div>
    )
}
