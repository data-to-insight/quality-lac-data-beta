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

    <GovUK.Details summary="Version log">
        <u><b>Version 0.1.1</b></u>
        <p></p>
        <p>This is an early release which implements the SSDA 903 validation checks for the 2021 to 2022 return as described in <a href='https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1023549/CLA_SSDA903_2021-22_Validation_rules_Version_1.2.pdf'>this document</a>.</p>
        <p>It currently contains all 'Stage 1' rules except:
        <ul>
        <li>rule 1008, which requires a URN lookup table (will be added in future release)</li>
        <li>rules 105, 205A-D & 330, which rely on the XML specification (will be added in future release)</li>
        <li>rules 1000, 1001, 1002, 1008, 199 which require historical data held on the DfE system (will be added in future release, with the caveat of potential false positives/negatives, since this tool only accepts up to 2 years of data)</li>
        </ul></p>
        <p>141 of 184 'Stage 2' Rules are currently implemented, with the rest to be added over the coming weeks.</p>
        <p>Planned features also include:
        <ul>
          <li>Full XML support</li>
          <li>All URN-related validation checks</li>
          <li>UI enhancements</li>
          <li>Preliminary data integrity checks</li>
        </ul>
        </p>
    </GovUK.Details>

    </>
  )
}

export default App;
