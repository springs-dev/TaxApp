import React from 'react'
import { Grid, Table, Form, Button } from 'semantic-ui-react'

const SelectProperty = () => (
  <Grid columns={3}>
    <Grid.Row>
      <Grid.Column width={4} />
      <Grid.Column width={8}>
        <h2>Search for Property</h2>
        <Form.Group widths='equal'>
          <Form.Input
            id='form-input-control-first-name'
            name='pin'
            label='Property Identification Number'
            placeholder='Property Identification Number'
          />
        </Form.Group>
        <h3>or</h3>
        <Form.Group widths='equal'>
          <Form.Input
            id='form-input-control-first-name'
            name='streetno'
            label='Street Number'
            placeholder='Street Number'
          />
          <Form.Input
            id='form-input-control-first-name'
            name='address'
            label='Street Name'
            placeholder='Street Name'
          />
          <Form.Input
            id='form-input-control-first-name'
            name='pin'
            label='City'
            placeholder='City'
          />
        </Form.Group>
        <Button color='orange' type='submit' content='Search' />
      </Grid.Column>
      <Grid.Column width={4} />
    </Grid.Row>
    <Grid.Row>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>PIN</Table.HeaderCell>
            <Table.HeaderCell>Township</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>17-06-419-018-2000</Table.Cell>
            <Table.Cell>West Town</Table.Cell>
            <Table.Cell>1028 N Marshfield, Chicago, IL 60622</Table.Cell>
            <Table.Cell>Available</Table.Cell>
            <Table.Cell>
              <Button color='orange' label='Select' />{' '}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      {/* <Button as={Link} to='/property/detail' label='Continue' /> */}
    </Grid.Row>
  </Grid>
)

export default SelectProperty
