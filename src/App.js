import './App.css';
import Dashboard from './layouts/Dashboard';
import Navi from './layouts/Navi';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Navi/>
      <Container className="main"  style={{ marginTop: "5em" }}>
         
         <Dashboard/>
      </Container>   
    </div>
  );
}

export default App;
