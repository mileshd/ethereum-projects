import React from 'react';
import { Message, Form, Input, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends React.Component {
  // Always assume you're working with a string with user input
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  // auto bind this, arrow function inherits this from parent scope
  onSubmit = async (event) => {
    event.preventDefault()

    this.setState({ loading: true });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ loading: false });
      this.setState({ errorMessage: err.message });
    }
  };

  render () {
    return (
      <Layout>
        <h3>New Campaign</h3>

        <Form onSubmit={this.onSubmit} error={Boolean(this.state.errorMessage)}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label='wei'
              labelPosition='right'
              value={this.state.minimumContribution}
              onChange={event => this.setState({
                minimumContribution: event.target.value
              })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
