import React, { useEffect, useState } from 'react'
import CityService from '../services/cityService';
import JobPositionService from '../services/jobPositionService';
import WorkplaceService from '../services/workplaceService';
import WorkTimeService from '../services/workTimeService';
import { Label, Dropdown, Segment, Checkbox, Button } from 'semantic-ui-react'

export default function JobAdvertisementFilter({ clickEvent }) {
    const [cities, setCities] = useState([]);
    const [jobPositions, setJobPositions] = useState([]);
    const [workplaces, setWorkplaces] = useState([]);
    const [workTimes, setWorkTimes] = useState([]);

    useEffect(() => {
        let cityService = new CityService()
        cityService.getAll().then(result => setCities(result.data.data))

        let jobPositionService = new JobPositionService()
        jobPositionService.getAll().then(result => setJobPositions(result.data.data))

        let workplaceService = new WorkplaceService()
        workplaceService.getAll().then(result => setWorkplaces(result.data.data))

        let workTimeService = new WorkTimeService();
        workTimeService.getAll().then(result => setWorkTimes(result.data.data))
    }, [])

    const [cityIndex, setCityIndex] = useState([])
    const handleChangeCity = (e, { value }) => {
        setCityIndex(value)
    }

    const [jobPositionIndex] = useState([])
    const handleChangeJobPosition = (e, { value, checked }) => {
        if (checked) {
            jobPositionIndex.push(value)
        } else {
            let index = jobPositionIndex.indexOf(value)
            if (index > -1) {
                jobPositionIndex.splice(index, 1)
            }
        }
    }

    const [workplaceIndex] = useState([])
    const handleChangeWorkplace = (e, { value, checked }) => {
        if (checked) {
            workplaceIndex.push(value)
        } else {
            let index = workplaceIndex.indexOf(value)
            if (index > -1) {
                workplaceIndex.splice(index, 1)
            }
        }
    }

    const [workTimeIndex] = useState([])
    const handleChangeWorkTime = (e, { value, checked }) => {
        if (checked) {
            workTimeIndex.push(value)
        } else {
            let index = workTimeIndex.indexOf(value)
            if (index > -1) {
                workTimeIndex.splice(index, 1)
            }
        }
    }

    return (
        <div>
            <Segment color="black" raised>
                <Label attached="top" size="large">Şehir</Label>
                <Dropdown
                    placeholder="Şehir seçiniz"
                    selection
                    search
                    multiple
                    clearable
                    options={cities.map((city, index) => {
                        return { text: city.name, key: city.index, value: city.id }
                    })}
                    onChange={handleChangeCity}
                    value={cityIndex}
                />
            </Segment>
            <Segment color="black" raised>
                <Label attached="top" size="large">İş Pozisyonu</Label>
                {
                    jobPositions.map(jobPosition => (
                        <Checkbox
                            key={jobPosition.id}
                            label={jobPosition.name}
                            onChange={handleChangeJobPosition}
                            value={jobPosition.id}
                        />
                    ))
                }
            </Segment>
            <Segment color="black" raised>
                <Label attached="top" size="large">Çalışma Yeri</Label>
                {
                    workplaces.map(workplace => (
                        <Checkbox
                            key={workplace.id}
                            label={workplace.name}
                            onChange={handleChangeWorkplace}
                            value={workplace.id}
                        />
                    ))
                }
            </Segment>
            <Segment color="black" raised>
                <Label attached="top" size="large">Çalışma Süresi</Label>
                {
                    workTimes.map(workTime => (
                        <Checkbox
                            key={workTime.id}
                            label={workTime.name}
                            onChange={handleChangeWorkTime}
                            value={workTime.id}
                        />
                    ))
                }
            </Segment>
            <Button
                type="button"
                fluid
                color="olive"
                onClick={() => clickEvent({ cityId: cityIndex, jobPositionId: jobPositionIndex, workplaceId: workplaceIndex, workTimeId: workTimeIndex })}
            >
                Filtrele
            </Button>
        </div>
    )
}
