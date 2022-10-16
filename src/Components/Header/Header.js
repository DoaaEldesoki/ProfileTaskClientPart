import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/Group.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'
import { NavLink, useLocation } from 'react-router-dom';


const Header = () => {
  const { pathname } = useLocation()
  return (
    <div>

      <nav class="navbar   navbar-expand-lg navbar-dark bg-primary fixed-top header ">
        <div class="container-fluid ">
          <a class="navbar-brand" href="#"> <img src={logo} width='120px' /></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarText">
            <div className='links'>
              <NavLink exact={true} to="/" end
                class="nav-link"
                activeClassName="active"
                isActive={() => ['/EditProfile', '/'].includes(pathname)}
              >
                <a> PROFILES</a>
              </NavLink>
              <NavLink exact to="/SubmitProfile" activeClassName="active"
                class="nav-link" >
                <a>ADD PROFILES</a>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>

  )
}

export default Header