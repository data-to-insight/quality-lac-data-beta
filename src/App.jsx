import * as GovUK from 'govuk-react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <GovUK.GlobalStyle />
      <GovUK.Page.WidthContainer style={{'height': '100vh', 'width': '75%', 'maxWidth': 'none'}}>
        <GovUK.PhaseBanner level="beta">This is a new service - <GovUK.Link href="mailto:datatoinsight.enquiries@gmail.com">your feedback can help us improve it.</GovUK.Link></GovUK.PhaseBanner>
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
    <GovUK.Paragraph>Data to Insight is a national project led by local authorities with support from the ADCS, DLUHC, DfE and Ofsted to help local authorities make better use of data. </GovUK.Paragraph>
    <GovUK.Paragraph>This tool was developed by local authority data analysts, supported by technical expertise from our friends at Social Finance. It will let you perform the same kinds of data validation as the DfE’s SSDA903 statutory data submission tool. You can run this tool at any time, using your year-to-date extract of SSDA903 data. We recommend a monthly data checking cycle.</GovUK.Paragraph>
    <GovUK.Paragraph>Click Start to begin.</GovUK.Paragraph>
    <GovUK.Button start as={Link} to="/application">
      Start
    </GovUK.Button>
    </>
  )
}

export default App;
