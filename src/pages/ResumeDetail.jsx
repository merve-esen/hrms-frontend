import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Image, Table, Button, Grid } from "semantic-ui-react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { toast } from "react-toastify";
import ResumeService from "../services/resumeService";
import UpdateObjective from "./popups/resume/UpdateObjective";
import UpdateWorkExperience from "./popups/resume/UpdateWorkExperience";
import UpdatePhoto from "./popups/resume/UpdatePhoto";
import UpdateLanguageSkill from "./popups/resume/UpdateLanguageSkill";
import UpdateLinkedinLink from "./popups/resume/UpdateLinkedinLink";
import UpdateGithubLink from "./popups/resume/UpdateGithubLink";
import UpdateEducation from "./popups/resume/UpdateEducation";
import UpdateProgrammingTechnologySkill from "./popups/resume/UpdateProgrammingTechnologySkill";

export default function ResumeDetail() {
    let { id } = useParams()
    let [resume, setResume] = useState({});
    let author = true; //TODO: login ile kontrol edilecek.

    let resumeService = new ResumeService();
    useEffect(() => {
        let resumeService = new ResumeService();
        resumeService.getByCandidateId(id).then((result) => setResume(result.data.data));
    }, [id]);

    const handleGithubDelete = (resumeId) => {
        resumeService.deleteGithubLink(resumeId).then((result) => {
            toast.success(result.data.message)
            updateResumeValues();
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }

    const handleLinkedinDelete = (resumeId) => {
        resumeService.deleteLinkedinLink(resumeId).then((result) => {
            toast.success(result.data.message)
            updateResumeValues();
        }).catch((result) => {
            alert(result.response.data.message)
            toast.error(result.response.data.message)
        })
    }

    const updateResumeValues = () => {
        resumeService.getByCandidateId(id).then((result) => {
            setResume(result.data.data)
        })
    }

    return (
        <div>
            <Card.Group>
                <Card fluid color={"black"}>
                    <Card.Content>
                        <Image
                            floated="left"
                            size="small"
                            src={resume.photo}
                            circular
                            key={resume.id}
                        />
                        {author && <Popup trigger={<button className="ui yellow circular icon button"><i className="edit icon"></i></button>} modal>
                            <UpdatePhoto resumeId={resume.id} updateResumeValues={updateResumeValues} />
                        </Popup>}
                        <Card.Header style={{ marginTop: "0.3em" }}>
                            {resume.candidate?.firstName + " " + resume.candidate?.lastName}
                        </Card.Header>
                        <Card.Meta>
                            <strong>{resume.objective}</strong>
                        </Card.Meta>
                        <Card.Description>
                            <Table celled color={"black"}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Ad</Table.HeaderCell>
                                        <Table.HeaderCell>Soyad</Table.HeaderCell>
                                        <Table.HeaderCell>Doğum Yılı</Table.HeaderCell>
                                        <Table.HeaderCell>E-mail</Table.HeaderCell>
                                        <Table.HeaderCell>Github</Table.HeaderCell>
                                        <Table.HeaderCell>Linkedin</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>{resume.candidate?.firstName}</Table.Cell>
                                        <Table.Cell>{resume.candidate?.lastName}</Table.Cell>
                                        <Table.Cell>{resume.candidate?.birthYear}</Table.Cell>
                                        <Table.Cell>{resume.candidate?.email}</Table.Cell>
                                        <Table.Cell>
                                            <Grid columns={3}>
                                                <Grid.Column width={10}>{resume.githubLink}</Grid.Column>
                                                <Grid.Column width={3}>
                                                    {author && <Popup trigger={<button className="ui yellow circular icon button"><i className="edit icon"></i></button>} modal>
                                                        <UpdateGithubLink resumeId={resume.id} updateResumeValues={updateResumeValues} />
                                                    </Popup>}
                                                </Grid.Column>
                                                <Grid.Column width={3}>
                                                    {author && <Button color="red" circular icon="x" onClick={() => handleGithubDelete(resume.id)} disabled={!resume.githubLink}>
                                                    </Button>}
                                                </Grid.Column>
                                            </Grid>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Grid columns={3}>
                                                <Grid.Column width={10}>{resume.linkedinLink}</Grid.Column>
                                                <Grid.Column width={3}>
                                                    {author && <Popup trigger={<button className="ui yellow circular icon button"><i className="edit icon"></i></button>} modal>
                                                        <UpdateLinkedinLink resumeId={resume.id} updateResumeValues={updateResumeValues} />
                                                    </Popup>}
                                                </Grid.Column>
                                                <Grid.Column width={3}>
                                                    {author && <Button color="red" circular icon="x" onClick={() => handleLinkedinDelete(resume.id)} disabled={!resume.linkedinLink}>
                                                    </Button>}
                                                </Grid.Column>
                                            </Grid>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra></Card.Content>
                </Card>
            </Card.Group>
            <Card fluid color={"black"}>
                <Card.Content>
                    <Card.Header>
                        Ön Yazı
                        {author && <Popup trigger={<button className="ui yellow circular icon button" style={{ marginLeft: "1em" }}><i className="edit icon"></i></button>} modal>
                            <UpdateObjective resumeId={resume.id} updateResumeValues={updateResumeValues} curentObjective={resume.objective} />
                        </Popup>}
                    </Card.Header>
                </Card.Content>
                <Card.Content description={resume.objective} />
            </Card>
            <Card fluid color={"black"}>
                <Card.Content>
                    <Card.Header>
                        Eğitim Bilgileri
                        {author && <Popup trigger={<button className="ui yellow circular icon button" style={{ marginLeft: "1em" }}><i className="edit icon"></i></button>} modal>
                            <UpdateEducation resumeId={resume.id} updateResumeValues={updateResumeValues} />
                        </Popup>}
                    </Card.Header>
                </Card.Content>
                <Table celled color={"black"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Okul Adı</Table.HeaderCell>
                            <Table.HeaderCell>Bölüm</Table.HeaderCell>
                            <Table.HeaderCell>Başlangıç Yılı</Table.HeaderCell>
                            <Table.HeaderCell>Mezuniyet Yılı</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {resume.educations?.map((education) => (
                            <Table.Row key={education.id}>
                                <Table.Cell>{education.schoolName}</Table.Cell>
                                <Table.Cell>{education.departmentName}</Table.Cell>
                                <Table.Cell>{education.startYear}</Table.Cell>
                                <Table.Cell>{education.endYear ? education.endYear : <p>Devam Ediyor</p>}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        Tecrübeler
                        {author && <Popup trigger={<button className="ui yellow circular icon button" style={{ marginLeft: "1em" }}><i className="edit icon"></i></button>} modal>
                            <UpdateWorkExperience resumeId={resume.id} updateResumeValues={updateResumeValues} />
                        </Popup>}
                    </Card.Header>
                </Card.Content>
                <Table celled color={"black"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                            <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                            <Table.HeaderCell>Başlangıç Yılı</Table.HeaderCell>
                            <Table.HeaderCell>Bitiş Yılı</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {resume.workExperiences?.map((workExperience) => (
                            <Table.Row key={workExperience.id}>
                                <Table.Cell>{workExperience.workplaceName}</Table.Cell>
                                <Table.Cell>{workExperience.position}</Table.Cell>
                                <Table.Cell>{workExperience.startYear}</Table.Cell>
                                <Table.Cell>{workExperience.endYear ? workExperience.endYear : <p>Devam Ediyor</p>}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card>
            <Card fluid color={"black"}>
                <Card.Content>
                    <Card.Header>
                        Yabancı Diller
                        {author && <Popup trigger={<button className="ui yellow circular icon button" style={{ marginLeft: "1em" }}><i className="edit icon"></i></button>} modal>
                            <UpdateLanguageSkill resumeId={resume.id} updateResumeValues={updateResumeValues} />
                        </Popup>}
                    </Card.Header>
                </Card.Content>
                <Table celled color={"black"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Dil Adı</Table.HeaderCell>
                            <Table.HeaderCell>Seviye min:1 max:5</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {resume.languageSkills?.map((languageSkill) => (
                            <Table.Row key={languageSkill.id}>
                                <Table.Cell>{languageSkill.language}</Table.Cell>
                                <Table.Cell>{languageSkill.level}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card>
            <Card fluid color={"black"}>
                <Card.Content>
                    <Card.Header>
                        Yazılım Teknolojileri
                        {author && <Popup trigger={<button className="ui yellow circular icon button" style={{ marginLeft: "1em" }}><i className="edit icon"></i></button>} modal>
                            <UpdateProgrammingTechnologySkill resumeId={resume.id} updateResumeValues={updateResumeValues} />
                        </Popup>}
                    </Card.Header>
                </Card.Content>
                <Table celled color={"black"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Teknoloji Adı</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {resume.programmingTechnologySkills?.map((programmingTechnologySkill) => (
                            <Table.Row key={programmingTechnologySkill.id}>
                                <Table.Cell>{programmingTechnologySkill.name}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card>
        </div>
    )
}
