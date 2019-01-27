import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';


class CharityNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

try {
const accounts = await web3.eth.getAccounts();
await factory.methods
.createCharity(this.state.minimumContribution)
.send({
from: accounts[0]
});

Router.pushRoute('/');
} catch (err) {
this.setState({ errorMessage: err.message });
}

this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
      <h3>Create a new Charity Fundraising</h3>

      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
      <Form.Field>
      <label>Minimum Contribution</label>
      <input
      placeholder='Value in Wei'
      value={this.state.minimumContribution}
      onChange={event => this.setState({ minimumContribution: event.target.value })}
      />
      </Form.Field>

      <Message error header="Error!" content={this.state.errorMessage} />
      <Button loading={this.state.loading} primary>Create Charity Campaign</Button>
      </Form>
      </Layout>
    );
  }
}

export default CharityNew;
