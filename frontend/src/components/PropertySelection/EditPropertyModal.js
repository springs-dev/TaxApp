import React from 'react'
import { Button, Image, Modal, Form } from 'semantic-ui-react'

const EditPropertyModal = () => (
  <Modal
    size={'large'}
    trigger={<Button id='modalid' label='Edit Info' />}
    actions={['Cancel', { key: 'done', content: 'Save', positive: true }]}
  >
    <Modal.Header>Edit Property Details</Modal.Header>
    <Modal.Content image>
      <Image
        wrapped
        size='small'
        src='https://static.pexels.com/photos/164516/pexels-photo-164516.jpeg'
      />
      <Modal.Description size='large'>
        <Form>
          <Form.Input
            name='pin'
            value='17-06-419-018-2000'
            label='Property Identification Number'
            placeholder='Property Identification Number'
          />
          <Form.Input
            name='address'
            value='1028 N Marshfield, Chicago, IL 60622'
            label='Property Address'
          />
          <Form.Input
            name='township'
            value='West Town'
            label='Property Township'
          />
        </Form>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default EditPropertyModal
