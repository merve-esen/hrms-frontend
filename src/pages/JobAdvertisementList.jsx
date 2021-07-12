import React, { useEffect, useState } from 'react'
//import { useDispatch, useSelector } from 'react-redux';
import { Icon, Menu, Table, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import JobAdvertisementService from "../services/jobAdvertisementService";
import FavoriteJobAdvertisementService from '../services/favoriteJobAdvertisementService';

export default function JobAdvertisementList() {
  //const dispatch = useDispatch();

  const [jobAdvertisements, setJobAdvertisements] = useState([]);
  let [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getAll()
      .then((result) => setJobAdvertisements(result.data.data));

    let favoriteAdvertisementService = new FavoriteJobAdvertisementService();
    favoriteAdvertisementService.getByCandidateId(1).then((result) => {
      setFavorites(result.data.data.map((favoriteAd) => (
        favoriteAd.jobAdvertisement.id
      )))
    })
  }, []);

  //let favoriteAdvertisementService = new FavoriteJobAdvertisementService();
  const handleAddFavorite = (jobAdvertisementId) => {
    if (favorites.includes(jobAdvertisementId)) {
      let favoriteAdvertisementService = new FavoriteJobAdvertisementService();
      favoriteAdvertisementService.delete(jobAdvertisementId,1).then((result) => {
        toast.success("İlan favorilerden kaldırıldı")
        let newFavorites = favorites.filter((f) => f !== jobAdvertisementId)
        setFavorites([...newFavorites])
      }).catch((result) => {
        toast.error(result)
      })
    } else {
      let favoriteAdvertisementService = new FavoriteJobAdvertisementService();
      favoriteAdvertisementService.add({ jobAdvertisementId, candidateId: 1 }).then((result) => {
        toast.success("İlan favorilere eklendi")
        favorites.push(jobAdvertisementId)
        setFavorites([...favorites])
      }).catch((result) => {
        toast.error(result.response.data.message)
      })
    }
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Firma Adı</Table.HeaderCell>
          <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
          <Table.HeaderCell>Açık Pozisyon Adedi</Table.HeaderCell>
          <Table.HeaderCell>Yayın Tarihi</Table.HeaderCell>
          <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {jobAdvertisements.map((jobAdvertisement) => (
          <Table.Row key={jobAdvertisement.id}>
            <Table.Cell>{jobAdvertisement.employer.companyName}</Table.Cell>
            <Table.Cell>{jobAdvertisement.jobPosition.name}</Table.Cell>
            <Table.Cell>{jobAdvertisement.numberOfOpenPositions}</Table.Cell>
            <Table.Cell>{jobAdvertisement.createDate}</Table.Cell>
            <Table.Cell>{jobAdvertisement.applicationDeadline}</Table.Cell>
            <Table.Cell>
              <Button
                circular
                icon="heart"
                color={favorites.includes(jobAdvertisement.id) ? "red" : "grey"}
                onClick={() => handleAddFavorite(jobAdvertisement.id)}
              />
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
