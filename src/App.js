import * as GovUK from 'govuk-react';
import { MemoryRouter as Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import * as dfd from "danfojs/src/index";


function App() {
  return (
    <Router>
      <GovUK.GlobalStyle />
      <GovUK.Page.WidthContainer>
        <GovUK.PhaseBanner level="beta">This is a new service - your feedback can help us improve it.</GovUK.PhaseBanner>
        <GovUK.Page.Main>
          <GovUK.H2>Welcome to the govuk-react example application.</GovUK.H2>
          <GovUK.Paragraph>Click Start to continue.</GovUK.Paragraph>
          <GovUK.Button>
            Start now
          </GovUK.Button>
          <GovUK.Paragraph>{get_data()}</GovUK.Paragraph>
        </GovUK.Page.Main>
      </GovUK.Page.WidthContainer>
    <GovUK.Footer />
    </Router>
  );
}


export default App;
