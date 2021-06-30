import * as GovUK from 'govuk-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Uploader from './components/Uploader';


function App() {
  return (
    <Router>
      <GovUK.GlobalStyle />
      <GovUK.Page.WidthContainer>
        <GovUK.PhaseBanner level="beta">This is a new service - your feedback can help us improve it.</GovUK.PhaseBanner>
        <GovUK.Page.Main>
          <GovUK.H2>SSDA903 Data Validation Service</GovUK.H2>
          <Switch> 
            <Route exact path="/application" component={Uploader} />
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
    <GovUK.Button as={Link} to="/application">
      Start now
    </GovUK.Button>
    </>
  )
}

export default App;
