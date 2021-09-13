import React, { useEffect, useState } from 'react'
//import { useDispatch, useSelector } from 'react-redux';
import { Card, Grid, Table, Header, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import CandidateService from '../services/candidateService';
import EmployerService from '../services/employerService';
import EmployerUpdateService from '../services/employerUpdateService';
import JobAdvertisementService from '../services/jobAdvertisementService';

export default function AdminDashboard() {
    //const dispatch = useDispatch();

    const [candidates, setCandidates] = useState([]);
    const [employers, setEmployers] = useState([]);
    const [jobAdvertisements, setJobAdvertisements] = useState([]);
    const [pRAEmployers, setPRAEmployers] = useState([]);
    const [pUAEmployers, setPUAEmployers] = useState([]);
    const [pRAJobAdvertisements, setPRAJobAdvertisements] = useState([]);

    let [showCandidates, setShowCandidates] = useState(false);
    let [showEmployers, setShowEmployers] = useState(false);
    let [showJobAdvertisements, setShowJobAdvertisements] = useState(false);
    let [showPRAEmployers, setShowPRAEmployers] = useState(false);
    let [showPUAEmployers, setShowPUAEmployers] = useState(false);
    let [showPRAJobAdvertisements, setShowPRAJobAdvertisements] = useState(false);

    useEffect(() => {
        let candidateService = new CandidateService();
        candidateService
            .getAll()
            .then((result) => setCandidates(result.data.data));

        let employerService = new EmployerService();
        employerService
            .getAll()
            .then((result) => setEmployers(result.data.data));

        employerService
            .getByConfirmedIsNull()
            .then((result) => setPRAEmployers(result.data.data));

        let employerUpdateService = new EmployerUpdateService();
        employerUpdateService
            .getByDeletedFalse()
            .then((result) => setPUAEmployers(result.data.data));

        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService
            .getAll()
            .then((result) => setJobAdvertisements(result.data.data));

        jobAdvertisementService
            .getByConfirmedIsNull()
            .then((result) => setPRAJobAdvertisements(result.data.data));

    }, []);

    //const { jobAdvertisementItems } = useSelector(state => state.jobAdvertisement)
    //const { employerItems } = useSelector(state => state.employer)

    const handleConfirmEmployer = (employer) => {
        //dispatch(applyJobAdvertisement(jobAdvertisement));
        let employerService = new EmployerService();
        employerService
            .confirm(employer.id, 3) //TODO: login ile kontrol edilecek.
            .then((result) => {
                if (result.data.success)
                    toast.success(`${employer.companyName} şirketi onaylandı!`);
                else
                    toast.error(result.data.message);
            }).catch((result) => {
                toast.error(result.data.message);
            });
    };
    const handleRejectEmployer = (employer) => {
        //dispatch(applyJobAdvertisement(jobAdvertisement));
        let employerService = new EmployerService();
        employerService
            .reject(employer.id, 3) //TODO: login ile kontrol edilecek.
            .then((result) => {
                if (result.data.success)
                    toast.success(`${employer.companyName} şirketi reddedildi!`);
                else
                    toast.error(result.data.message);
            }).catch((result) => {
                toast.error(result.data.message);
            });
    };
    const handleConfirmEmployerUpdate = (employerUpdate) => {
        //dispatch(applyJobAdvertisement(jobAdvertisement));
        let employerUpdateService = new EmployerUpdateService();
        employerUpdateService
            .confirm(employerUpdate.id, 3) //TODO: login ile kontrol edilecek.
            .then((result) => {
                if (result.data.success)
                    toast.success(`${employerUpdate.companyName} şirketinin güncelleme talebi onaylandı!`);
                else
                    toast.error(result.data.message);
            }).catch((result) => {
                toast.error(result.data.message);
            });
    };
    const handleRejectEmployerUpdate = (employerUpdate) => {
        //dispatch(applyJobAdvertisement(jobAdvertisement));
        let employerUpdateService = new EmployerUpdateService();
        employerUpdateService
            .reject(employerUpdate.id, 3) //TODO: login ile kontrol edilecek.
            .then((result) => {
                if (result.data.success)
                    toast.success(`${employerUpdate.companyName} şirketinin güncelleme talebi reddedildi!`);
                else
                    toast.error(result.data.message);
            }).catch((result) => {
                toast.error(result.data.message);
            });
    };
    const handleConfirmJobAdvertisement = (jobAdvertisement) => {
        //dispatch(applyJobAdvertisement(jobAdvertisement));
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService
            .confirm(jobAdvertisement.id, 3) //TODO: login ile kontrol edilecek.
            .then((result) => {
                if (result.data.success)
                    toast.success(`${jobAdvertisement.jobPosition.name} ilanı onaylandı!`);
                else
                    toast.error(result.data.message);
            }).catch((result) => {
                toast.error(result.data.message);
            });
    };
    const handleRejectJobAdvertisement = (jobAdvertisement) => {
        //dispatch(applyJobAdvertisement(jobAdvertisement));
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService
            .reject(jobAdvertisement.id, 3) //TODO: login ile kontrol edilecek.
            .then((result) => {
                if (result.data.success)
                    toast.success(`${jobAdvertisement.jobPosition.name} ilanı reddedildi!`);
                else
                    toast.error(result.data.message);
            }).catch((result) => {
                toast.error(result.data.message);
            });
    };

    const handleShowCandidates = () => {
        setShowCandidates(true);
        setShowEmployers(false);
        setShowJobAdvertisements(false);
        setShowPRAEmployers(false);
        setShowPUAEmployers(false);
        setShowPRAJobAdvertisements(false);
    };
    const handleShowEmployers = () => {
        setShowCandidates(false);
        setShowEmployers(true);
        setShowJobAdvertisements(false);
        setShowPRAEmployers(false);
        setShowPUAEmployers(false);
        setShowPRAJobAdvertisements(false);
    };
    const handleShowJobAdvertisements = () => {
        setShowCandidates(false);
        setShowEmployers(false);
        setShowJobAdvertisements(true);
        setShowPRAEmployers(false);
        setShowPUAEmployers(false);
        setShowPRAJobAdvertisements(false);
    };
    const handleShowPRAEmployers = () => {
        setShowCandidates(false);
        setShowEmployers(false);
        setShowJobAdvertisements(false);
        setShowPRAEmployers(true);
        setShowPUAEmployers(false);
        setShowPRAJobAdvertisements(false);
    };
    const handleShowPUAEmployers = () => {
        setShowCandidates(false);
        setShowEmployers(false);
        setShowJobAdvertisements(false);
        setShowPRAEmployers(false);
        setShowPUAEmployers(true);
        setShowPRAJobAdvertisements(false);
    };
    const handleShowPRAJobAdvertisements = () => {
        setShowCandidates(false);
        setShowEmployers(false);
        setShowJobAdvertisements(false);
        setShowPRAEmployers(false);
        setShowPUAEmployers(false);
        setShowPRAJobAdvertisements(true);
    };

    return (
        <div>
            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <Card color='teal' onClick={() => handleShowCandidates()}>
                            <Card.Content>
                                <Card.Header>Aday Sayısı</Card.Header>
                                <Card.Description>
                                    <h1 className="ui header teal">{candidates.length}</h1>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card color='yellow' onClick={() => handleShowEmployers()}>
                            <Card.Content>
                                <Card.Header>İşveren Sayısı</Card.Header>
                                <Card.Description>
                                    <h1 className="ui header yellow">{employers.length}</h1>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card color='green' onClick={() => handleShowJobAdvertisements()}>
                            <Card.Content>
                                <Card.Header>İlan Sayısı</Card.Header>
                                <Card.Description>
                                    <h1 className="ui header green">{jobAdvertisements.length}</h1>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Card color='grey' onClick={() => handleShowPRAEmployers()}>
                            <Card.Content>
                                <Card.Header>Kayıt Onayı Bekleyen İşveren Sayısı</Card.Header>
                                <Card.Description>
                                    <h1 className="ui header grey">{pRAEmployers.length}</h1>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card color='violet' onClick={() => handleShowPUAEmployers()}>
                            <Card.Content>
                                <Card.Header>Güncelleme Onayı Bekleyen İşveren Sayısı</Card.Header>
                                <Card.Description>
                                    <h1 className="ui header violet">{pUAEmployers.length}</h1>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card color='blue' onClick={() => handleShowPRAJobAdvertisements()}>
                            <Card.Content>
                                <Card.Header>Kayıt Onayı Bekleyen İlan Sayısı</Card.Header>
                                <Card.Description>
                                    <h1 className="ui header blue">{pRAJobAdvertisements.length}</h1>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {showCandidates && <Grid.Column>
                        <Header as='h2' color='teal'>
                            <Icon name='address card outline' />
                            <Header.Content>Adaylar</Header.Content>
                        </Header>
                        <Table color='teal' key='teal' inverted>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Adı</Table.HeaderCell>
                                    <Table.HeaderCell>Soyadı</Table.HeaderCell>
                                    <Table.HeaderCell>TC Kimlik No</Table.HeaderCell>
                                    <Table.HeaderCell>Doğum Yılı</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {candidates.map((candidate) => (
                                    <Table.Row key={candidate.id}>
                                        <Table.Cell>{candidate.firstName}</Table.Cell>
                                        <Table.Cell>{candidate.lastName}</Table.Cell>
                                        <Table.Cell>{candidate.identityNumber}</Table.Cell>
                                        <Table.Cell>{candidate.birthYear}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>}
                    {showEmployers && <Grid.Column>
                        <Header as='h2' color='yellow'>
                            <Icon name='address card outline' />
                            <Header.Content>İşverenler</Header.Content>
                        </Header>
                        <Table color='yellow' key='yellow' inverted>
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
                                            <Button color="green" as={Link} to={`/employerDetail/${employer.id}`}
                                                content="Detay"
                                                icon="arrow right"
                                                labelPosition="right"
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>}
                    {showJobAdvertisements && <Grid.Column>
                        <Header as='h2' color='green'>
                            <Icon name='file alternate outline' />
                            <Header.Content>İlanlar</Header.Content>
                        </Header>
                        <Table color='green' key='green' inverted>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                                    <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                                    <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
                                    <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
                                    <Table.HeaderCell>Açık Pozisyon Sayısı</Table.HeaderCell>
                                    <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                                    <Table.HeaderCell>Detaylar</Table.HeaderCell>
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
                                            <Button color="yellow" as={Link} to={`/jobAdvertisementDetail/${jobAdvertisement.id}`}
                                                content="Detay"
                                                icon="arrow right"
                                                labelPosition="right"
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>}
                    {showPRAEmployers && <Grid.Column>
                        <Header as='h2' color='grey'>
                            <Icon name='address card outline' />
                            <Header.Content>Kayıt Onayı Bekleyen İşverenler</Header.Content>
                        </Header>
                        <Table color='grey' key='grey' inverted>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                                    <Table.HeaderCell>Web Sitesi</Table.HeaderCell>
                                    <Table.HeaderCell>Telefon</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {pRAEmployers.map((employer) => (
                                    <Table.Row key={employer.id}>
                                        <Table.Cell>{employer.companyName}</Table.Cell>
                                        <Table.Cell>{employer.webSite}</Table.Cell>
                                        <Table.Cell>{employer.phoneNumber}</Table.Cell>
                                        <Table.Cell>
                                            <Button color='green' inverted onClick={() => handleConfirmEmployer(employer)}>Onayla</Button>
                                            <Button color='red' inverted onClick={() => handleRejectEmployer(employer)}>Reddet</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>}
                    {showPUAEmployers && <Grid.Column>
                        <Header as='h2' color='violet'>
                            <Icon name='address card outline' />
                            <Header.Content>Güncelleme Onayı Bekleyen İşverenler</Header.Content>
                        </Header>
                        <Table color='violet' key='violet' inverted>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Mevcut Şirket Adı</Table.HeaderCell>
                                    <Table.HeaderCell>Mevcut Web Sitesi</Table.HeaderCell>
                                    <Table.HeaderCell>Mevcut Telefon</Table.HeaderCell>
                                    <Table.HeaderCell>Yeni Şirket Adı</Table.HeaderCell>
                                    <Table.HeaderCell>Yeni Web Sitesi</Table.HeaderCell>
                                    <Table.HeaderCell>Yeni Telefon</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {pUAEmployers.map((pUAEmployer) => (
                                    <Table.Row key={pUAEmployer.id}>
                                        <Table.Cell>{pUAEmployer.employer.companyName}</Table.Cell>
                                        <Table.Cell>{pUAEmployer.employer.webSite}</Table.Cell>
                                        <Table.Cell>{pUAEmployer.employer.phoneNumber}</Table.Cell>
                                        <Table.Cell>{pUAEmployer.companyName}</Table.Cell>
                                        <Table.Cell>{pUAEmployer.webSite}</Table.Cell>
                                        <Table.Cell>{pUAEmployer.phoneNumber}</Table.Cell>
                                        <Table.Cell>
                                            <Button color='green' inverted onClick={() => handleConfirmEmployerUpdate(pUAEmployer)}>Onayla</Button>
                                            <Button color='red' inverted onClick={() => handleRejectEmployerUpdate(pUAEmployer)}>Reddet</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>}
                    {showPRAJobAdvertisements && <Grid.Column>
                        <Header as='h2' color='blue'>
                            <Icon name='file alternate outline' />
                            <Header.Content>Kayıt Onayı Bekleyen İlanlar</Header.Content>
                        </Header>
                        <Table color='blue' key='blue' inverted>
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
                                {pRAJobAdvertisements.map((jobAdvertisement) => (
                                    <Table.Row key={jobAdvertisement.id}>
                                        <Table.Cell>{jobAdvertisement.employer.companyName}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.jobPosition.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.workplace.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.workTime.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.numberOfOpenPositions}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.applicationDeadline}</Table.Cell>
                                        <Table.Cell>
                                            <Button color='green' inverted onClick={() => handleConfirmJobAdvertisement(jobAdvertisement)}>Onayla</Button>
                                            <Button color='red' inverted onClick={() => handleRejectJobAdvertisement(jobAdvertisement)}>Reddet</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>}
                </Grid.Row>
            </Grid>
        </div>
    )
}
