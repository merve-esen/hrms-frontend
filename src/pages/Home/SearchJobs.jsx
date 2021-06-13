import React from "react";
import { Form } from "semantic-ui-react";

const options = [
    { key: "sd", text: "Software Developer", value: "Software Developer" },
    { key: "sa", text: "Software Architect", value: "Software Architect" },
    { key: "fd", text: "Front-End Developer", value: "Front-End Developer" },
    { key: "bd", text: "Back-End Developer", value: "Back-End Developer" },
    { key: "fs", text: "Full-Stack Developer", value: "Full-Stack Developer" },
  ];

export default function SearchJobs() {
  return (
    <div>
      <Form
        style={{
          width: 1127,
          height: 380,
          display: "inline-block",
          backgroundImage: `url(${"https://career.luxoft.com/static/images/career/apply-banner-empty.jpg"})`,
          backgroundSize: "cover",
          fontWeight: "normal",
          marginBottom: 0,
        }}
      >
        <Form.Field style={{ marginTop: "3em" }}>
          <h1>The Easiest Way to Get Your New Job</h1>
        </Form.Field>
        <Form.Field style={{ marginTop: "2em" }}>
          <h3>
            Find jobs, create trackable resumes and enrich your applications.
          </h3>
        </Form.Field>

        <Form.Group
          widths="equal"
          style={{
            marginTop: "2em",
            marginLeft: "0.8em",
            marginRight: "0.8em",
          }}
        >
          <Form.Input fluid placeholder="Keywords" />
          <Form.Input fluid placeholder="Location" />
          <Form.Select fluid options={options} placeholder="Category" />
        </Form.Group>
        <Form.Button color="yellow" style={{ marginTop: "8em" }}>
          SEARCH JOBS
        </Form.Button>
      </Form>
    </div>
  );
}
