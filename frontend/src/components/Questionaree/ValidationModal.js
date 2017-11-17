import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const ValidationModal = props => (
  <Modal
    open={props.modalOpened}
    onClose={() => console.log('Modal closed')}
    basic
    size='small'
  >
    <Header icon='info' content={props.headerMessage} />
    <Modal.Content>
      <p>{props.contentMessage}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' inverted onClick={props.handleClose}>
        <Icon name='checkmark' /> OK
      </Button>
    </Modal.Actions>
  </Modal>
)

ValidationModal.propTypes = {
  headerMessage: PropTypes.string,
  contentMessage: PropTypes.string,
  modalOpened: PropTypes.bool,
  handleClose: PropTypes.func
}

export default ValidationModal
