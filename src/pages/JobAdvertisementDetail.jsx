import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Icon, Table, Button} from "semantic-ui-react";
import { toast } from "react-toastify";
import JobAdvertisementService from "../services/jobAdvertisementService";
import FavoriteJobAdvertisementService from '../services/favoriteJobAdvertisementService';

export default function JobAdvertisementDetail() {
    let { id } = useParams();

    const [jobAdvertisement, setJobAdvertisement] = useState({});
    let [favorites, setFavorites] = useState([]);

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService.getById(id)
            .then((result) => {
                setJobAdvertisement(result.data.data);
            });

        let favoriteJobAdvertisementService = new FavoriteJobAdvertisementService();
        favoriteJobAdvertisementService.getByCandidateId(1).then((result) => {
            setFavorites(result.data.data.map((favoriteAd) => (
                favoriteAd.jobAdvertisement.id
            )))
        })
    }, [id]);

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

    return (
        <div>
            <Table celled color="teal">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>İlan Detayı</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Firma Adı</Table.Cell>
                        <Table.Cell>{jobAdvertisement.employer?.companyName}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>İş Pozisyonu</Table.Cell>
                        <Table.Cell>{jobAdvertisement.jobPosition?.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Şehir</Table.Cell>
                        <Table.Cell>{jobAdvertisement.city?.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Çalışma Şekli</Table.Cell>
                        <Table.Cell>{jobAdvertisement.workplace?.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Çalışma Zamanı</Table.Cell>
                        <Table.Cell>{jobAdvertisement.workTime?.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Açık Pozisyon Adedi</Table.Cell>
                        <Table.Cell>{jobAdvertisement.numberOfOpenPositions}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Minimum Ücret</Table.Cell>
                        <Table.Cell>{jobAdvertisement.minimumSalary}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Maksimum Ücret</Table.Cell>
                        <Table.Cell>{jobAdvertisement.maximumSalary}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Yayınlanma Tarihi</Table.Cell>
                        <Table.Cell>{jobAdvertisement.createDate}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Son Başvuru Tarihi</Table.Cell>
                        <Table.Cell>{jobAdvertisement.applicationDeadline}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Açıklama</Table.Cell>
                        <Table.Cell>{jobAdvertisement.jobDescription}</Table.Cell>
                    </Table.Row>
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>
                            <Button floated="right" color={favorites.includes(jobAdvertisement.id) ? "red" : "green"} onClick={() => handleAddFavorite(jobAdvertisement.id)}>
                                <Icon name={favorites.includes(jobAdvertisement.id) ? "heart" : "heart outline"} />{favorites.includes(jobAdvertisement.id) ? "İlan Favorilerinizde" : "İlanı Favorilerine Ekle"}
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    )
}
