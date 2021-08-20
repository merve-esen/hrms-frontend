import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Icon, Table, Button, Header, Card } from "semantic-ui-react";
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom';
import EmployerService from "../services/employerService";
import UpdateEmployer from "./popups/employer/UpdateEmployer";
import JobAdvertisementService from "../services/jobAdvertisementService";

export default function EmployerDetail() {
    let { id } = useParams();
    let author = true; //TODO: login ile kontrol edilecek.

    const [employer, setEmployer] = useState({});
    const [jobAdvertisements, setJobAdvertisements] = useState([]);

    useEffect(() => {
        let employerService = new EmployerService();
        employerService.getById(id)
            .then((result) => {
                setEmployer(result.data.data);
            });
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService.getByEmployerId(id)
            .then((result) => {
                setJobAdvertisements(result.data.data);
            });
    }, [id]);
    return (
        <div>
            <Table celled color="teal">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>
                            İş Veren Bilgileri
                            {author && <Popup trigger={<button className="ui yellow circular icon button" style={{ marginLeft: "1em" }}><i className="edit icon"></i></button>} modal>
                                <UpdateEmployer employerId={employer.id} />
                            </Popup>}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Header as="h4">
                                <Header.Content>
                                    <Icon name="building" />
                                    Firma Adı
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{employer?.companyName}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as="h4">
                                <Header.Content>
                                    <Icon name="world" />
                                    Web Sitesi
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{employer?.webSite}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as="h4">
                                <Header.Content>
                                    <Icon name="phone" />
                                    Telefon
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{employer?.phoneNumber}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as="h4">
                                <Header.Content>
                                    <Icon name="mail" />
                                    E-posta
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{employer?.email}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Card fluid color={"teal"}>
                <Card.Content header="Bu Firmaya Ait İş İlanları" />
                <Card.Content>
                    <Table color={"teal"}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>İş Pozisyonu</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Şehir</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Çalışma Şekli</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Çalışma Zamanı</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Açık Pozisyon Adedi</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Detaylar</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {jobAdvertisements.map((jobAdvertisement) => (
                                <Table.Row key={jobAdvertisement.id}>
                                    <Table.Cell textAlign='center'>{jobAdvertisement.jobPosition?.name}</Table.Cell>
                                    <Table.Cell textAlign='center'>{jobAdvertisement.city?.name}</Table.Cell>
                                    <Table.Cell textAlign='center'>{jobAdvertisement.workplace?.name}</Table.Cell>
                                    <Table.Cell textAlign='center'>{jobAdvertisement.workTime?.name}</Table.Cell>
                                    <Table.Cell textAlign='center'>{jobAdvertisement.numberOfOpenPositions}</Table.Cell>
                                    <Table.Cell textAlign='center'>
                                        <Button animated as={Link} to={`/jobAdvertisementDetail/${jobAdvertisement.id}`}>
                                            <Button.Content visible>Detayları Gör</Button.Content>
                                            <Button.Content hidden>
                                                <Icon name="arrow right" />
                                            </Button.Content>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Card.Content>
                <Card.Content extra textAlign='left'>
                    <Icon name="list" />
                    {jobAdvertisements?.length} Adet İş ilanı mevcut
                </Card.Content>
            </Card>
        </div>
    )
}
