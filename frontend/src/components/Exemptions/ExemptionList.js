import React from 'react'
import {Accordion} from 'semantic-ui-react'

const panels = [
  {
    title: 'Exemptions',
    content: [
      'Homeowner Exemption, ',
      'Senior Exemption, ',
      'Senior Freeze exemption, ',
      'Disabled Persons Exemption'
    ]
  }
]

const ExemptionList = () => (
  <Accordion defaultActiveIndex={1} panels={panels} />
)

export default ExemptionList
