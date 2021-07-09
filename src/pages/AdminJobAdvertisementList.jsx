import React, { useEffect, useState } from 'react'
//import { useDispatch, useSelector } from 'react-redux';
import { Icon, Menu, Table, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import JobAdvertisementService from "../services/jobAdvertisementService";

export default function AdminJobAdvertisementList() {
    //const dispatch = useDispatch();

    const [jobAdvertisements, setJobAdvertisements] = useState([]);

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService
            .getAll()
            .then((result) => setJobAdvertisements(result.data.data));
    }, []);

    //const {jobAdvertisementItems} = useSelector(state => state.jobAdvertisement)

    const handleRejectJobAdvertisement = (jobAdvertisement) => {
        //dispatch(applyJobAdvertisement(jobAdvertisement));
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService
            .reject(jobAdvertisement.id)
            .then((result) => console.log(result));
        toast.success(`${jobAdvertisement.jobPosition.name} ilanı reddedildi!`)
    };

    const handleConfirmJobAdvertisement = (jobAdvertisement) => {
        //dispatch(applyJobAdvertisement(jobAdvertisement));
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService
            .confirm(jobAdvertisement.id)
            .then((result) => console.log(result));
        toast.success(`${jobAdvertisement.jobPosition.name} ilanı onaylandı!`)
    };

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Kayıt No</Table.HeaderCell>
                    <Table.HeaderCell>Firma Adı</Table.HeaderCell>
                    <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                    <Table.HeaderCell>Açık Pozisyon Adedi</Table.HeaderCell>
                    <Table.HeaderCell>Yayın Tarihi</Table.HeaderCell>
                    <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                    <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
                    <Table.HeaderCell>Durumu</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {jobAdvertisements.map((jobAdvertisement) => (
                    <Table.Row key={jobAdvertisement.id}>
                        <Table.Cell>{jobAdvertisement.id}</Table.Cell>
                        <Table.Cell>{jobAdvertisement.employer.companyName}</Table.Cell>
                        <Table.Cell>{jobAdvertisement.jobPosition.name}</Table.Cell>
                        <Table.Cell>{jobAdvertisement.numberOfOpenPositions}</Table.Cell>
                        <Table.Cell>{jobAdvertisement.createDate}</Table.Cell>
                        <Table.Cell>{jobAdvertisement.applicationDeadline}</Table.Cell>
                        <Table.Cell>{jobAdvertisement.confirmed ? 'Onaylandı' : 'Onaylanmadı'}</Table.Cell>
                        <Table.Cell>{jobAdvertisement.active ? 'Aktif' : 'Pasif'}</Table.Cell>
                        <Table.Cell>
                            {jobAdvertisement.confirmed ?
                                <Button negative fluid onClick={() => handleRejectJobAdvertisement(jobAdvertisement)}>Reddet</Button> :
                                <Button positive fluid onClick={() => handleConfirmJobAdvertisement(jobAdvertisement)}>Onayla</Button>}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan="3">
                        <Menu floated="right" pagination>
                            <Menu.Item as="a" icon>
                                <Icon name="chevron left" />
                            </Menu.Item>
                            <Menu.Item as="a">1</Menu.Item>
                            <Menu.Item as="a">2</Menu.Item>
                            <Menu.Item as="a">3</Menu.Item>
                            <Menu.Item as="a">4</Menu.Item>
                            <Menu.Item as="a" icon>
                                <Icon name="chevron right" />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}
