import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Charity from '../../../ethereum/charity';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class NewRequest extends Component {
state = {
  value: '',
  description: '',
  recipient: ''
}


static async getInitialProps(props){
  const { address } = props.query;

  return { address: address };
}

onSubmit = async event => {
  event.preventDefault();

  const charity = Charity(this.props.address);
  const { description, value, recipient} = this.state;

  try {
    const accounts = await web3.eth.getAccounts();
    await charity.methods.createRequest(description,
    web3.utils.toWei(value, 'ether'),
recipient
).send({
  from: accounts[0]
});
  } catch(err) {

  }
};

  render(){
    return(
      <Layout>
      <h3>Create a Payment Request</h3>
      <Form onSubmit={this.onSubmit}>
<Form.Field>
<label>Description</label>
<Input
value={this.state.description}
onChange={event => this.setState({ description: event.target.value })}
/>
</Form.Field>

<Form.Field>
<label>Value in ether</label>
<Input
value={this.state.value}
onChange={event => this.setState({ value: event.target.value })}
 />
</Form.Field>

<Form.Field>
<label>Recipient address</label>
<Input
value={this.state.recipient}
onChange={event => this.setState({ recipient: event.target.value })}
/>
</Form.Field>

<Button primary>Create Payment Request</Button>

      </Form>
      </Layout>
    );
  }
}

export default NewRequest;
