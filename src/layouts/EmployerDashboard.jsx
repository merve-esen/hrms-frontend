import React, { useEffect, useState } from 'react'
//import { useDispatch, useSelector } from 'react-redux';
import { Card, Grid, Table, Header, Icon, Button } from 'semantic-ui-react'
import { toast } from "react-toastify";
import JobAdvertisementService from '../services/jobAdvertisementService';
import CandidateService from '../services/candidateService';

export default function EmployerDashboard() {
    //const dispatch = useDispatch();

    const [jobAdvertisements, setJobAdvertisements] = useState([]);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService
            .getAll()
            .then((result) => setJobAdvertisements(result.data.data));

        let candidateService = new CandidateService();
        candidateService
            .getAll()
            .then((result) => setCandidates(result.data.data));
    }, []);

    //const { jobAdvertisementItems } = useSelector(state => state.jobAdvertisement)
    //const { candidateItems } = useSelector(state => state.candidate)

    const handleSetInterview = (candidate) => {
        //dispatch(applyJobAdvertisement(jobAdvertisement)); 
        toast.success(`Mülakat ayarlandı!`)
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
                                <Card.Header>Onay Bekleyen İlan Sayısı</Card.Header>
                                <Card.Description>
                                    <h1 class="ui header yellow">8</h1>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card color='green'>
                            <Card.Content>
                                <Card.Header>Toplam İlan Sayısı</Card.Header>
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
                            <Header.Content>İlanlarım</Header.Content>
                        </Header>
                        <Table color='olive' key='olive' inverted>
                        <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                                    <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
                                    <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
                                    <Table.HeaderCell>Açık Pozisyon Sayısı</Table.HeaderCell>
                                    <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {jobAdvertisements.map((jobAdvertisement) => (
                                    <Table.Row key={jobAdvertisement.id}>
                                        <Table.Cell>{jobAdvertisement.jobPosition.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.workplace.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.workTime.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.numberOfOpenPositions}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.applicationDeadline}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h2' color='teal'>
                            <Icon name='file alternate outline' />
                            <Header.Content>İlanlara Başvuran Adaylar</Header.Content>
                        </Header>
                        <Table color='teal' key='teal' inverted>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Adı</Table.HeaderCell>
                                    <Table.HeaderCell>Soyadı</Table.HeaderCell>
                                    <Table.HeaderCell>E-Posta</Table.HeaderCell>
                                    <Table.HeaderCell>Doğum Yılı</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {candidates.map((candidate) => (
                                    <Table.Row key={candidate.id}>
                                        <Table.Cell>{candidate.firstName}</Table.Cell>
                                        <Table.Cell>{candidate.lastName}</Table.Cell>
                                        <Table.Cell>{candidate.email}</Table.Cell>
                                        <Table.Cell>{candidate.birthYear}</Table.Cell>
                                        <Table.Cell>
                                            <Button color='white' inverted onClick={() => handleSetInterview(candidate)}>Mülakat Ayarla</Button>
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
