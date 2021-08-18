import React, { useEffect, useState } from 'react'
import { Table, Header, Icon, Button } from 'semantic-ui-react'
import { toast } from "react-toastify";
import EmployerService from '../services/employerService';

export default function EmployerList() {

    const [employers, setEmployers] = useState([]);
    useEffect(() => {
        let employerService = new EmployerService();
        employerService
            .getAll()
            .then((result) => setEmployers(result.data.data));
    }, []);

    const handleConfirmEmployer = (employer) => {
        //dispatch(applyJobAdvertisement(jobAdvertisement));
        toast.success(`${employer.companyName} şirketi onaylandı!`)
    };

    return (
        <div>
            <Header as='h2' color='olive'>
                <Icon name='address card outline' />
                <Header.Content>İşverenler</Header.Content>
            </Header>
            <Table color='olive' key='olive' inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                        <Table.HeaderCell>Web Sitesi</Table.HeaderCell>
                        <Table.HeaderCell>Telefon</Table.HeaderCell>
                        <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
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
        </div>
    )
}
