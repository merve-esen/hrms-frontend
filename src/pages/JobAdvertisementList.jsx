import React, { useEffect, useState } from 'react'
//import { useDispatch, useSelector } from 'react-redux';
import { Icon, Menu, Table, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import JobAdvertisementService from "../services/jobAdvertisementService";

export default function JobAdvertisementList() {
  //const dispatch = useDispatch();

    const [jobAdvertisements, setJobAdvertisements] = useState([]);

    useEffect(() => {
      let jobAdvertisementService = new JobAdvertisementService();
      jobAdvertisementService
        .getAll()
        .then((result) => setJobAdvertisements(result.data.data));
    }, []);

    //const {jobAdvertisementItems} = useSelector(state => state.jobAdvertisement)

    

    const handleApplyJobAdvertisement = (jobAdvertisement) => {
      //dispatch(applyJobAdvertisement(jobAdvertisement));
      toast.success(`${jobAdvertisement.jobPosition.name} is applied!`)
    };

    return (
        <Table celled>
        <Table.Header>   
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Job Position</Table.HeaderCell>
            <Table.HeaderCell>Number of Open Positions</Table.HeaderCell>
            <Table.HeaderCell>Minimum Salary</Table.HeaderCell>
            <Table.HeaderCell>Maximum Salary</Table.HeaderCell>
            <Table.HeaderCell>Application Deadline</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {jobAdvertisements.map((jobAdvertisement) => (
            <Table.Row key={jobAdvertisement.id}>
              <Table.Cell>{jobAdvertisement.employer.companyName}</Table.Cell>
              <Table.Cell>{jobAdvertisement.jobPosition.name}</Table.Cell>
              <Table.Cell>{jobAdvertisement.numberOfOpenPositions}</Table.Cell>
              <Table.Cell>{jobAdvertisement.minimumSalary}</Table.Cell>
              <Table.Cell>{jobAdvertisement.maximumSalary}</Table.Cell>
              <Table.Cell>{jobAdvertisement.applicationDeadline}</Table.Cell>
              <Table.Cell>
                <Button onClick={()=>handleApplyJobAdvertisement(jobAdvertisement)}>Apply</Button>
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
