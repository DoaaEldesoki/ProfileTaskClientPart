
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosconfig';
import logo from '../../images/Group (1).png'
import add from '../../images/Vector (1).png'
import vector from '../../images/Vector (2).png'
import { Link } from 'react-router-dom'
import './Profile.css'

const Profiles = () => {
  const [ProfileDetails, setDetails] = useState([]);
  useEffect(() => {
    axiosInstance
      .get('/profiles')
      .then((res) => setDetails((res.data)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='mainPage'>
    <div className='container'>
      <h2>Professional Profiles</h2>
      <div className="row">
        {ProfileDetails && ProfileDetails.map((profile) => {
          return (
            <div className="item ">
              <Link key={profile._id} to={`/EditProfile/${profile._id}`}>
                <div className=''>
                <div className='name col'>
                  {profile.firstName} {profile.secondName}<br/><span className='jobTitle'>
                  {profile.jobTitle}
                </span>
                </div>
                </div>
                <div className='vectorImg '>
                  <img className='vector' src={vector} width='80px' />
                </div>
              </Link>

              <div className='info col '>
                 <img className='logoImg' src={logo} width='140px' />  
                <div className='mail-country'>
                  +20115454646<br />
                  {profile.email} <br />
                  {profile.state}, {profile.country}
                </div>
              </div>
            </div>
         

          )
        })}
      </div>
      <Link className="" to="/SubmitProfile">
        <button className='fixedButton'>
          <img src={add} width='30px' />
        </button>
      </Link>

    </div>
    </div>
    
  )
}




export default Profiles;