import React, { useEffect, useState } from 'react'
//import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Pagination, Dropdown, Grid } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import JobAdvertisementService from "../services/jobAdvertisementService";
import FavoriteJobAdvertisementService from '../services/favoriteJobAdvertisementService';
import JobAdvertisementFilter from '../layouts/JobAdvertisementFilter';

export default function JobAdvertisementList() {
  //const dispatch = useDispatch();

  let [jobAdvertisements, setJobAdvertisements] = useState([]);
  let [favorites, setFavorites] = useState([]);
  let [activePage, setActivePage] = useState(1);
  let [pageSize, setPageSize] = useState(10);
  let [totalPageSize, setTotalPageSize] = useState(0);
  let [filterOption, setFilterOption] = useState({});

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getPageableAndFilterJobAdvertisements(activePage, pageSize, filterOption)
      .then((result) => {
        setJobAdvertisements(result.data.data);
        setTotalPageSize(parseInt(result.data.message));
      });

    let favoriteJobAdvertisementService = new FavoriteJobAdvertisementService();
    favoriteJobAdvertisementService.getByCandidateId(1).then((result) => {
      setFavorites(result.data.data.map((favoriteAd) => (
        favoriteAd.jobAdvertisement.id
      )))
    })
  }, [filterOption, activePage, pageSize]);

  let favoriteJobAdvertisementService = new FavoriteJobAdvertisementService();
  const handleAddFavorite = (jobAdvertisementId) => {
    if (favorites.includes(jobAdvertisementId)) {
      favoriteJobAdvertisementService.delete(jobAdvertisementId, 1).then((result) => {
        toast.success("İlan favorilerden kaldırıldı")
        let newFavorites = favorites.filter((f) => f !== jobAdvertisementId)
        setFavorites([...newFavorites])
      }).catch((result) => {
        toast.error(result)
      })
    } else {
      favoriteJobAdvertisementService.add({ jobAdvertisementId, candidateId: 1 }).then((result) => {
        toast.success("İlan favorilere eklendi")
        favorites.push(jobAdvertisementId)
        setFavorites([...favorites])
      }).catch((result) => {
        toast.error(result.response.data.message)
      })
    }
  }

  const handleFilterClick = (filterOption) => {
    if (filterOption.cityId.length === 0) {
      filterOption.cityId = null;
    }
    if (filterOption.jobPositionId.length === 0) {
      filterOption.jobPositionId = null;
    }
    if (filterOption.workplaceId.length === 0) {
      filterOption.workplaceId = null;
    }
    if (filterOption.workTimeId.length === 0) {
      filterOption.workTimeId = null;
    }
    setFilterOption(filterOption);
    setActivePage(1);
  }

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  }

  const handlePaginationSizeChange = (value) => {
    setPageSize(value);
  }

  const paginationOptions = [
    { key: 10, text: "10", value: 10 },
    { key: 20, text: "20", value: 20 },
    { key: 50, text: "50", value: 50 },
    { key: 100, text: "100", value: 100 },
  ];

  return (
    <Grid >
      <Grid.Row>
        <Grid.Column width={4}>
          <JobAdvertisementFilter clickEvent={handleFilterClick} />
        </Grid.Column>
        <Grid.Column width={12}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Firma Adı</Table.HeaderCell>
                <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                <Table.HeaderCell>Şehir</Table.HeaderCell>
                <Table.HeaderCell>Açık Pozisyon Adedi</Table.HeaderCell>
                <Table.HeaderCell>Yayın Tarihi</Table.HeaderCell>
                <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {jobAdvertisements.map((jobAdvertisement) => (
                <Table.Row key={jobAdvertisement.id}>
                  <Table.Cell>{jobAdvertisement.employer.companyName}</Table.Cell>
                  <Table.Cell>{jobAdvertisement.jobPosition.name}</Table.Cell>
                  <Table.Cell>{jobAdvertisement.city.name}</Table.Cell>
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
                  <Table.Cell>
                    <Button color="teal" as={Link} to={`/jobAdvertisementDetail/${jobAdvertisement.id}`}
                      content="Detay"
                      icon="arrow right"
                      labelPosition="right"
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Pagination
            firstItem={null}
            lastItem={null}
            activePage={activePage}
            onPageChange={handlePaginationChange}
            totalPages={Math.ceil(totalPageSize / pageSize)}
          />
          <Dropdown
            onChange={(e, data) => {
              setActivePage(1)
              setPageSize(data.value);
              handlePaginationSizeChange(data.value);
            }}
            selection
            defaultValue={pageSize}
            text={"Sayfa başına " + pageSize + " kayıt"}
            style={{ marginLeft: "2em" }}
            options={paginationOptions}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>





  )
}
