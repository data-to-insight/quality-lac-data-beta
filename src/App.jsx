import * as GovUK from 'govuk-react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <GovUK.GlobalStyle />
      <GovUK.Page.WidthContainer style={{'height': '100vh', 'width': '75%', 'maxWidth': 'none'}}>
        <GovUK.PhaseBanner level="beta">This is a new service - <GovUK.Link href="https://join.slack.com/t/datatoinsight/shared_invite/zt-nuw179pj-n5Glvc7S1bFbeE~l2vZf_w">your feedback can help us improve it.</GovUK.Link></GovUK.PhaseBanner>
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
