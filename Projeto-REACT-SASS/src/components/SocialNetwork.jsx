import React from 'react'
import {FaLinkedinIn, FaGithub, FaInstagram} from 'react-icons/fa'

import '../styles/components/socialnetwork.sass'

const socialNetworks = [
    {
        name: "linkedin",
        icon: <FaLinkedinIn/>,
        link: "www.linkedin.com/in/douglas-bordinassi-739241143"
    },
    {
        name: "github",
        icon: <FaGithub/>,
        link: "https://github.com/DBDev90"
    },
    {
        name: "instagram",
        icon: <FaInstagram/>,
        link: "https://www.instagram.com/dbordinassi/"
    }
]


const SocialNetwork = () => {
  return (
    <section id="social-networks">
        {socialNetworks.map((network) => {
            <a href={network.link} className="social-btn" id={network.name} key={network.name}>
                {network.icon}
            </a>
        })}
    </section>
  )
}

export default SocialNetwork