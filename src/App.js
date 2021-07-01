import * as GovUK from 'govuk-react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <GovUK.GlobalStyle />
      <GovUK.Page.WidthContainer>
        <GovUK.PhaseBanner level="beta">This is a new service - your feedback can help us improve it.</GovUK.PhaseBanner>
        <GovUK.Page.Main>
          <GovUK.H2>SSDA903 Data Validation Service</GovUK.H2>
          <Switch>
            <Route path="/application" component={Dashboard} />
            <Route exact path="/" component={Start} />
          </Switch>
        </GovUK.Page.Main>
      </GovUK.Page.WidthContainer>
    </Router>
  );
}

function Start() {
  return (
    <>
    <GovUK.Paragraph>Click Start to begin.</GovUK.Paragraph>
    <GovUK.Button start as={Link} to="/application">
      Start now
    </GovUK.Button>
    </>
  )
}

export default App;
