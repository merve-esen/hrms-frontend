import React from "react";
import { Button, Menu, Container } from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
        <Menu.Item name="home" />
        <Menu.Item name="messages" />

        <Menu.Menu position="right">
          <Menu.Item>
            Find A Job
          </Menu.Item>
          <Menu.Item>
            Post A Job
          </Menu.Item>
          <Menu.Item>
            <Button color='yellow'>Sign Up</Button>
          </Menu.Item>
          <Menu.Item>
            <Button color='yellow'>Login</Button>
          </Menu.Item>
        </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
