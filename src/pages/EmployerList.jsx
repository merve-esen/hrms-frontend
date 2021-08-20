import React, { useEffect, useState } from 'react'
import { Table, Header, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import EmployerService from '../services/employerService';

export default function EmployerList() {

    const [employers, setEmployers] = useState([]);
    useEffect(() => {
        let employerService = new EmployerService();
        employerService
            .getAll()
            .then((result) => setEmployers(result.data.data));
    }, []);

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
                        <Table.HeaderCell>Detaylar</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {employers.map((employer) => (
                        <Table.Row key={employer.id}>
                            <Table.Cell>{employer.companyName}</Table.Cell>
                            <Table.Cell>{employer.webSite}</Table.Cell>
                            <Table.Cell>{employer.phoneNumber}</Table.Cell>
                            <Table.Cell>
                                <Button color="yellow" as={Link} to={`/employerDetail/${employer.id}`}
                                    content="Detay"
                                    icon="arrow right"
                                    labelPosition="right"
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}
