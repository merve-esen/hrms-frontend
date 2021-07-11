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
      favoriteAdvertisementService.getByCandidateId(3).then((result) => {
        console.log(result);
          setFavorites(result.data.data.map((favoriteAd) => (
            favoriteAd.id
          )))
        })
  }, []);

  //const {jobAdvertisementItems} = useSelector(state => state.jobAdvertisement)

  const handleCloseJobAdvertisement = (jobAdvertisement) => {
    //dispatch(applyJobAdvertisement(jobAdvertisement));
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .close(jobAdvertisement.id)
      .then((result) => console.log(result));
    toast.success(`${jobAdvertisement.jobPosition.name} ilanı yayından kaldırıldı!`)
  };

  const handlePublishJobAdvertisement = (jobAdvertisement) => {
    //dispatch(applyJobAdvertisement(jobAdvertisement));
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .publish(jobAdvertisement.id)
      .then((result) => console.log(result));
    toast.success(`${jobAdvertisement.jobPosition.name} ilanı yayına alındı!`)
  };

  //let favoriteAdvertisementService = new FavoriteJobAdvertisementService();
  const handleAddFavorite = (jobAdvertisementId) => {
    if(favorites.includes(jobAdvertisementId)){
      let favoriteAdvertisementService = new FavoriteJobAdvertisementService();
      favoriteAdvertisementService.delete({jobAdvertisementId: 3, candidateId: 3}).then((result) => {
        toast.success(result.data.message)
        setFavorites([favorites.filter((f) => f.id !== jobAdvertisementId.id)])
      }).catch((result) => {
        console.log(result)
        toast.error(result)
      })
    } else {
      let favoriteAdvertisementService = new FavoriteJobAdvertisementService();
      favoriteAdvertisementService.add({jobAdvertisementId, candidateId: 3}).then((result) => {
        toast.success(result.data.message)
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
          <Table.HeaderCell>Durumu</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
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
            <Table.Cell>{jobAdvertisement.active ? 'Aktif' : 'Pasif'}</Table.Cell>
            <Table.Cell>
              {jobAdvertisement.active ? 
              <Button negative fluid onClick={() => handleCloseJobAdvertisement(jobAdvertisement)}>Yayından Kaldır</Button> : 
              <Button positive fluid onClick={() => handlePublishJobAdvertisement(jobAdvertisement)}>Yayına Al</Button>}
            </Table.Cell>
            <Table.Cell>
                <Button
                    circular
                    icon={favorites.includes(jobAdvertisement.id)?"heart":"heart outline"}
                    color={favorites.includes(jobAdvertisement.id)?"red":"white"}
                    onClick = {() => handleAddFavorite(jobAdvertisement.id)}
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
