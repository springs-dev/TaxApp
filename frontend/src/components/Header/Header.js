import React from 'react'
import { Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import renderIf from 'render-if'

import logUserOut from '../../actions/loginActions'
import resetPinState from '../../actions/pinActions'
import UserMenu from '../../components/Header/UserMenu'
import './Header.styl'

let logo = require('../../assets/Home-Icon.png')
class Header extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if (name === 'logout') {
      this.props.logUserOut()
    }
    if (name === 'property' || name === 'questionaree') {
      this.props.resetPinState()
    }
  }

  render () {
    const { activeItem } = this.state
    return (
      <Menu size='huge' width={3}>
        <Menu.Menu position='left'>

          <Menu.Item as={Link} name='property' active={activeItem === 'property'} onClick={this.handleItemClick} to='/taxappeal/property'>
          New Case
          </Menu.Item>
          <Menu.Item as={Link} name='properties' active={activeItem === 'properties'} onClick={this.handleItemClick} to='/taxappeal/myproperties'>
          My Properties
          </Menu.Item><Menu.Item as={Link} name='questionaree' active={activeItem === 'questionaree'} onClick={this.handleItemClick} to='/taxappeal/questionaree' >
          Questionaree
          </Menu.Item>
        </Menu.Menu>
        {renderIf(this.props.loggedIn)(
          <Menu.Menu style={{paddingLeft: '55px!important'}}>

            <Image style={{position: 'centered', height: '50px', width: '50px'}} as={Link} onClick={this.handleItemClick} to='/taxappeal' centered src={logo} />
          </Menu.Menu>
        )}
        {renderIf(!this.props.loggedIn)(
          <Menu.Menu style={{paddingRight: '230px!important'}} >

            <Image style={{position: 'centered', height: '50px', width: '50px'}} as={Link} onClick={this.handleItemClick} to='/taxappeal' centered src={logo} />
          </Menu.Menu>
        )}
        <Menu.Menu position='right'>
          {/* {renderIf(this.props.loggedIn)(
            <Menu.Item as={Link} name='import' active={activeItem === 'import'} onClick={this.handleItemClick} to='/taxappeal/import'>
            Import Wizard
            </Menu.Item>)
          } */}
          {renderIf(this.props.loggedIn)(
            <Menu.Item as={Link} name='admin' active={activeItem === 'admin'} onClick={this.handleItemClick} to='/taxappeal/admin'>
            Admin
            </Menu.Item>)
          }
          {renderIf(this.props.loggedIn)(
            <Menu.Item name='sideMenu' active={activeItem === 'sideMenu'} onClick={this.handleItemClick} >
              <UserMenu />
            </Menu.Item>
          )}
          {renderIf(!this.props.loggedIn)(
            <Menu.Item as={Link} name='login' active={activeItem === 'login'} onClick={this.handleItemClick} to='/taxappeal/login'>
            Log in
            </Menu.Item>)
          }
        </Menu.Menu>
      </Menu>
    )
  }
}

Header.propTypes = {
  loggedIn: PropTypes.any.isRequired,
  logUserOut: PropTypes.func,
  resetPinState: PropTypes.func
}

export default connect(null, { logUserOut, resetPinState })(Header)
