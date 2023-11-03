import React from 'react'
import Avatar from '../img/perfil.jpeg'
import SocialNetwork from './SocialNetwork'

import '../styles/components/sidebar.sass'

const Sidebar = () => {
  return (
    <aside id='sidebar'>
      <img src={Avatar} alt="Douglas Bordinassi" />
      <p className="title">Dev React / Node.js</p>
      <SocialNetwork/>
      <p>Informações de Contato</p>
      <a href="" className='btn'>Download CV</a>
    </aside>
  )
}

export default Sidebar