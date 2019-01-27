import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Charity from '../../../ethereum/charity';
import RequestRow from '../../../components/RequestRow';

class AllRequests extends Component {
static async getInitialProps(props){
  const { address } = props.query;
  const charity = Charity(address);
  const requestCount = await charity.methods.getRequestsCount().call();
  const approversCount = await charity.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount)).fill().map((element, index) => {
      return charity.methods.requests(index).call();
    })
  );



  return { address, requests, requestCount, approversCount };
}

renderRow(){
  return this.props.requests.map((request, index) => {
    return( <RequestRow
    key={index}
    id={index}
request={request}
address={this.props.address}
approversCount={this.props.approversCount}
     />
   );
  });
}

  render() {
const { Header, Row, HeaderCell, Body } = Table;


    return(
<Layout>
<h3>Request</h3>
<Link route={`/charities/${this.props.address}/requests/new`}>
<a>
<Button primary floated="right" style={{ marginBottom: 10 }}>Add Payment Request</Button>
</a>
</Link>
<Table>
<Header>
<Row>
<HeaderCell>ID</HeaderCell>
<HeaderCell>Description</HeaderCell>
<HeaderCell>Amount</HeaderCell>
<HeaderCell>Recipient</HeaderCell>
<HeaderCell>Approval Count</HeaderCell>
<HeaderCell>Approve</HeaderCell>
<HeaderCell>Finalize</HeaderCell>
</Row>
</Header>
<Body>
{this.renderRow()}
</Body>
</Table>
<div>Found {this.props.requestCount} requests.</div>
</Layout>
    );
  }
}

export default AllRequests;
