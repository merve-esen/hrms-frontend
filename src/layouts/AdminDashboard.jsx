import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Grid, Table, Header, Icon, Button } from 'semantic-ui-react'
import { toast } from "react-toastify";
import JobAdvertisementService from '../services/jobAdvertisementService';
import EmployerService from '../services/employerService';

export default function AdminDashboard() {
    const dispatch = useDispatch();

    const [jobAdvertisements, setJobAdvertisements] = useState([]);
    const [employers, setEmployers] = useState([]);

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService
            .getAll()
            .then((result) => setJobAdvertisements(result.data.data));

        let employerService = new EmployerService();
        employerService
            .getAll()
            .then((result) => setEmployers(result.data.data));
    }, []);

    const { jobAdvertisementItems } = useSelector(state => state.jobAdvertisement)
    const { jobEmployerItems } = useSelector(state => state.employer)

    const handleConfirmJobAdvertisement = (jobAdvertisement) => {
        //dispatch(applyJobAdvertisement(jobAdvertisement));
        toast.success(`${jobAdvertisement.jobPosition.name} is confirmed!`)
    };
    const handleConfirmEmployer = (employer) => {
        //dispatch(applyJobAdvertisement(jobAdvertisement));
        toast.success(`${employer.companyName} is confirmed!`)
    };

    return (
        <div>
            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <Card color='teal'>
                            <Card.Content>
                                <Card.Header>Aday Sayısı</Card.Header>
                                <Card.Description>
                                    <h1 class="ui header teal">23</h1>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card color='yellow'>
                            <Card.Content>
                                <Card.Header>İşveren Sayısı</Card.Header>
                                <Card.Description>
                                    <h1 class="ui header yellow">8</h1>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card color='green'>
                            <Card.Content>
                                <Card.Header>İlan Sayısı</Card.Header>
                                <Card.Description>
                                    <h1 class="ui header green">34</h1>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h2' color='olive'>
                            <Icon name='address card outline' />
                            <Header.Content>Onay Bekleyen İşverenler</Header.Content>
                        </Header>
                        <Table color='olive' key='olive' inverted>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                                    <Table.HeaderCell>Web Sitesi</Table.HeaderCell>
                                    <Table.HeaderCell>Telefon</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {employers.map((employer) => (
                                    <Table.Row key={employer.id}>
                                        <Table.Cell>{employer.companyName}</Table.Cell>
                                        <Table.Cell>{employer.webSite}</Table.Cell>
                                        <Table.Cell>{employer.phoneNumber}</Table.Cell>
                                        <Table.Cell>
                                            <Button color='white' inverted onClick={() => handleConfirmEmployer(employer)}>Onayla</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h2' color='teal'>
                            <Icon name='file alternate outline' />
                            <Header.Content>Onay Bekleyen İlanlar</Header.Content>
                        </Header>
                        <Table color='teal' key='teal' inverted>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                                    <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                                    <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
                                    <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
                                    <Table.HeaderCell>Açık Pozisyon Sayısı</Table.HeaderCell>
                                    <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {jobAdvertisements.map((jobAdvertisement) => (
                                    <Table.Row key={jobAdvertisement.id}>
                                        <Table.Cell>{jobAdvertisement.employer.companyName}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.jobPosition.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.workplace.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.workTime.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.numberOfOpenPositions}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.applicationDeadline}</Table.Cell>
                                        <Table.Cell>
                                            <Button color='white' inverted onClick={() => handleConfirmJobAdvertisement(jobAdvertisement)}>Onayla</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
