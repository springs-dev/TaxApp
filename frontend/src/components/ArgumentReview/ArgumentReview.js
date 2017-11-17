import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ArgumentReview extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }
  componentWillMount () {
    this.props.actions.fetchAllCases()
  }

  render () {
    const { caseData } = this.props.cases

    let tableBody = caseData.map(cases => (
      <Table.Row key={cases.id}>
        <Table.Cell>{cases.property_id}</Table.Cell>
        <Table.Cell>
          {cases.firstName + ' ' + cases.lastName}
        </Table.Cell>
        {/* <Table.Cell>{cases.street}</Table.Cell> */}
        {/* <Table.Cell>{cases.township}</Table.Cell> */}
        {/* <Table.Cell>{cases.ovacls}</Table.Cell> */}
        <Table.Cell>{cases.created_at}</Table.Cell>
        <Table.Cell>{cases.status}</Table.Cell>
        <Table.Cell>
          <Button
            as={Link}
            to={'/property/filter/' + cases.property_id}
            basic
            color='black'
          >
            Calculate
          </Button>
        </Table.Cell>
      </Table.Row>
    ))
    return (
      <container>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>PIN</Table.HeaderCell>
              <Table.HeaderCell>Petitioner</Table.HeaderCell>
              {/* <Table.HeaderCell>Address</Table.HeaderCell> */}
              {/* <Table.HeaderCell>Township</Table.HeaderCell> */}
              {/* <Table.HeaderCell>Class</Table.HeaderCell> */}
              <Table.HeaderCell>Appeal date</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>{tableBody}</Table.Body>
        </Table>
      </container>
    )
  }
}

ArgumentReview.propTypes = {
  cases: PropTypes.any,
  actions: PropTypes.any
}

export default ArgumentReview
