import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Charity from '../../ethereum/charity';
import web3 from '../../ethereum/web3';
import ContributeCharity from '../../components/ContributeCharity';
import { Link } from '../../routes';

class ViewCharity extends Component {
static async getInitialProps(props) {
const charity = Charity(props.query.address);

const summary = await charity.methods.getSummary().call();

return {
address: props.query.address,
minimumContribution: summary[0],
balance: summary[1],
requestsCount: summary[2],
approversCount: summary[3],
manager: summary[4]
  };
}

renderStats(){
const {
  balance,
  manager,
  minimumContribution,
  requestsCount,
  approversCount
} = this.props;

  const items = [
    {
      header: manager,
      meta: 'Address of Manager',
      description: 'The manager created this charity & can create requests to spend funds collected',
      style: { overflowWrap: 'break-word' }
    },
{
  header: minimumContribution,
  meta: 'Minimum Contribution (wei)',
  description: 'You must contribute at least this much wei to be able to support the charity'
},
{
  header: requestsCount,
  meta: 'Number of requests',
  description: 'A request tries to send money to external address. Need to be approved by certain number of contributors'
},
{
  header: approversCount,
  meta: 'Number of approved',
  description: 'Number of contributors to this campaign'
},
{
  header: web3.utils.fromWei(balance, 'ether'),
  meta: 'Charity Balance (ether)',
  description: 'Total amount of ether collected by Charity so far'
}

  ];

  return <Card.Group items={items} />;
}

  render() {
    return (
<Layout>
      <h3>View Charity</h3>
      <Grid>
      <Grid.Row>
<Grid.Column width={10}>
    {this.renderStats()}
</Grid.Column>


<Grid.Column width={5}>
    <ContributeCharity address={this.props.address} />
</Grid.Column>
</Grid.Row>

<Grid.Row>
<Grid.Column>
<Link route={`/charities/${this.props.address}/requests`}>
<a>
<Button primary>View Charity Payment Requests</Button>
</a>
</Link>
</Grid.Column>
</Grid.Row>
  </Grid>
      </Layout>
    );
  }
}

export default ViewCharity;
