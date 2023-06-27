import React from 'react'
import './footer.css'
import { icons } from '../../../../assets'

export default function Footer() {
    return (
        <div className="footer-section">
            <div className="footer-logo" style={{color: '#FF842B'}}>FuturePay<div style={{background: "#FF842B"}}></div></div>
            <div className="all-contact">
            <div className="Contact">
                    
                    <p>About Us</p>
                    <p>Our Partners</p>
                    <p>Our Team</p>
                    
            </div>

            <div className="Contact">
                    
                    <p>Legal</p>
                    <p>Contact Us</p>
                    
            </div>
            <div className="Contact">
                    <h4>Contact</h4>
                    <p>Support@futurepay.app</p>
                    <p>+234 7042040580</p>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/futurepay" ><img src={icons.facebook} alt="facebook" /></a>
                        <a href="https://www.twitter.com/futurepayHQ" ><img src={icons.twitter} alt="twitter" /></a>
                        <img src={icons.link} alt="linkedin" />
                    </div>
                </div>
                
               
            </div>
        </div>
    )
}