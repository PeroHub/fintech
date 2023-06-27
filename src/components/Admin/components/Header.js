import React from 'react'
import '../styles/transaction.css'
import { icons } from '../../../assets'

function Header() {
 
    return (
        <div className="transaction">
            <div className="profile-me">
                <img src={icons.profileadmin} alt="Profile" />
                <p>Wecome, Admin</p>
            </div>
            <div className="heading">
                <h2>Header here</h2>
            </div>
            <div className="input-setting">
                <input type="text" placeholder="Search" />
                <img src={icons.bellnoti} alt="Bell" />
                <img src={icons.settings} alt="Setting" />
            </div>
        </div>
    )
}

export default Header