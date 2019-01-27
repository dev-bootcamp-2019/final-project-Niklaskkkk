import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CharityIndex extends Component {
static async getInitialProps() {
const charities = await factory.methods.getDeployedCharities().call();

return { charities: charities };
}

renderCharities() {
  const items = this.props.charities.map(address => {
    return {
      header: address,
      description: (
        <Link route={`/charities/${address}`}>
        <a>View Charity Funding Details</a>
      </Link>
      ),
      fluid: true
    };
  });

  return <Card.Group items={items} />;
}

  render() {
    return (
      <Layout>
    <div>
<h3>Active Charity Fundings</h3>

<Link route="/charities/new">
<a>
<Button
floated="right"
content="Create Charity Funding"
icon="add circle"
primary
/>
</a>
</Link>

    {this.renderCharities()}
    </div>
    </Layout>
  );
  }
}

export default CharityIndex;
