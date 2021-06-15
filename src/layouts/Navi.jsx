import React, {useState} from "react";
import { Menu, Container } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import { useHistory } from "react-router";

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const history = useHistory()
  function handleSignOut() {
    setIsAuthenticated(false)
    history.push("/")
  }

  function handleSignIn() {
    setIsAuthenticated(true)
  }

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
          {isAuthenticated?<SignedIn signOut={handleSignOut} bisey="1"/>
            :<SignedOut signIn={handleSignIn}/>}  
        </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
