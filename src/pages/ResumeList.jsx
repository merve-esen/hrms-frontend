import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header, Image, Table, Button, Icon, Card, Segment, Grid } from "semantic-ui-react";
import ResumeService from '../services/resumeService';

export default function ResumeList() {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        let resumeService = new ResumeService();
        resumeService.getAll().then((result) => setResumes(result.data.data));
    }, []);

    return (
        <Card.Group>
            {resumes.map((resume) => (
                <Card fluid color="black">
                    <Card.Content>
                        <Grid celled>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Image
                                        floated='left'
                                        size='medium'
                                        src={resume.photo}
                                    />
                                </Grid.Column>
                                <Grid.Column width={13}>
                                    <Segment.Group piled>
                                        <Segment size="massive">
                                            <Card.Header>{resume.candidate.firstName + " " + resume.candidate.lastName}</Card.Header>
                                        </Segment>
                                        <Segment size="huge">
                                            <Card.Meta>{resume.candidate.birthYear}</Card.Meta>
                                        </Segment>
                                        <Segment size="big">
                                            <Card.Description>{resume.objective}</Card.Description>
                                        </Segment>
                                    </Segment.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                    <Card.Content extra>
                        <Segment.Group horizontal>
                            <Segment>
                                {resume.programmingTechnologySkills.map((p, index) => (
                                    <React.Fragment>
                                        <b> {p.name} </b> {resume.programmingTechnologySkills.length - 1 !== index && ", "}
                                    </React.Fragment>
                                ))}
                            </Segment>
                            <Segment>
                                {resume.languageSkills.map((l, index) => (
                                    <React.Fragment>
                                        <b> {l.language + " (Seviye: " + l.level + ")"} </b> {resume.languageSkills.length - 1 !== index && ", "}
                                    </React.Fragment>
                                ))}
                            </Segment>
                            <Segment>
                                <a href={resume.githubLink} target={"_blank"} rel="noopener noreferrer">
                                    <Button secondary disabled={!resume.githubLink}>
                                        <Icon name="github" /> Github
                                    </Button>
                                </a>
                                <a href={resume.linkedinLink} target={"_blank"} rel="noopener noreferrer">
                                    <Button color="linkedin" disabled={!resume.linkedinLink}>
                                        <Icon name="linkedin" /> LinkedIn
                                    </Button>
                                </a>
                                <Button animated as={Link} to={`/resumeDetail/${resume.candidate.id}`}>
                                    <Button.Content visible>Detaylar</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name="arrow right" />
                                    </Button.Content>
                                </Button>
                            </Segment>
                        </Segment.Group>
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    )
}
