import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAccusoft, faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './navigation.css';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/images/creatingbox.png';

function Navigation(){
   
    return (
        <nav className='navbar'>
            <div className='navbar__logo'>
                <a href='/'><img src={LogoImage} alt="Logo"/></a>
                <a href="/home">KKH's Portfolio</a> 
            </div>
            <ul className='navbar__menu'>
                <li><a href='/home'>Home</a></li>
                <li><a href='/Personal_Statement'>Personal Statement</a></li>
                <li><a href='/Project'>Project</a></li>
                <li><a href='/Interesting'>Interesting</a></li>
                <li><a href='/board'>Board</a></li>
                <li><a href='/test'>Test</a></li>
            </ul>

            <ul className='navbar__icons'>
                <li>
                    <Link to='/send_email'>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </Link>
                </li>
                <li>
                    <a href='https://github.com/creatingbox'>
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </li>
            </ul>
            <a href="#" className="navbar__toggleBtn">
                <FontAwesomeIcon icon={faBars} />
            </a>
        </nav>
    );
}

export default Navigation


// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       {/* Logo with text */}
//       <div className="navbar__logo">
//         <FontAwesomeIcon icon={faAccusoft} />
//         <a href="">DreamCoding</a>
//       </div>
//       {/* Menu */}
//       <ul className="navbar__menu">
//         <li><a href="">Home</a></li>
//         <li><a href="">Gallery</a></li>
//         <li><a href="">Weddings</a></li>
//         <li><a href="">FAQ</a></li>
//         <li><a href="">Bookings</a></li>
//       </ul>
//       {/* Icons */}
//       <ul className="navbar__icons">
//         <li><FontAwesomeIcon icon={faTwitter} /></li>
//         <li><FontAwesomeIcon icon={faFacebookF} /></li>
//       </ul>
//       {/* Toggle button */}
//       <a href="#" className="navbar__toggleBtn">
//         <FontAwesomeIcon icon={faBars} />
//       </a>
//     </nav>
//   );
// }

// export default Navbar;
