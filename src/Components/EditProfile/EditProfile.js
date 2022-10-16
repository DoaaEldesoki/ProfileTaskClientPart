import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import '../submitProfile/submitProfile.css'
import nameIcon from '../../images/name.png'
import mailIcon from '../../images/mail.png'
import jobIcon from '../../images/job.png'
import countryIcon from '../../images/country.png'
import stateIcon from '../../images/state.png'
import { axiosInstance } from '../../config/axiosconfig';



const EditProfile = () => {

  const navigate = useNavigate();

  const data = {
    countries: [
      { name: "Egypt", states: ["Cairo", "Giza", "Alexandria", "Mansoura"] },
      { name: "KSA", states: ["Riyadh", "Dammam", "Makkah", "Madinah"] },
      { name: "USA", states: ["New York", " New Jersy"] },
      { name: "UK", states: ["London"] },
      { name: "Qatar", states: ["Doha"] }]
  };


  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();

  const availableState = data.countries.find((c) => c.name === selectedCountry);

  const [formValues, setFormValues] = useState({
    firstName: '',
    secondName: '',
    email: '',
    jobTitle: '',
    country: "Egypt",
    state: "Cairo"
  });
  const params = useParams();
  const [profile, setProfile] = useState([]);
  const handleFormChange = (event) => {
    switch (event.target.name) {
      case "firstName":
        setFormValues({
          ...formValues,
          firstName: event.target.value,
        });
        break;
      case "secondName":
        setFormValues({
          ...formValues,
          secondName: event.target.value,
        });
        break;
      case "email":
        setFormValues({
          ...formValues,
          email: event.target.value,
        });
        break;
      case "jobTitle":
        setFormValues({
          ...formValues,
          jobTitle: event.target.value,
        });
        break;
      case "country":
        setFormValues({
          ...formValues,
          country: event.target.value,
        });
        break;
      case "state":
        setFormValues({
          ...formValues,
          state: event.target.value,
        });
        break;

      default:
        break;
    }
  };
  const getProfile = () => {
    axiosInstance
      .get(`/profiles/${params.id}`)
      .then((response) => {
        const myProfile = response.data;
        setProfile(myProfile);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => getProfile(), [])

  const handleSubmitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .patch(`/profiles/${params.id}`, formValues)
      .then((response) => {
        alert('item updated')
        navigate('/')


      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteForm = (e) => {
    e.preventDefault();
    axiosInstance
      .delete(`/profiles/${params.id}`, formValues)
      .then((response) => {
        alert('item deleted')
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='submitProfile'>
      <form>
        <h2>Edit Profile</h2>
        <div className='inputGroup'>
          <input type="text"
            className="form-control"
            id="firstName"
            name='firstName'
            value={formValues.firstName}
            required
            onChange={(e) => handleFormChange(e)}
            placeholder={profile.firstName}
          />
          <img className='icon' src={nameIcon} />

        </div>
        <div className='inputGroup'>
          <input type="text" className="form-control" id="secondName"
            name='secondName'
            value={formValues.secondName}
            onChange={(e) => handleFormChange(e)}
            placeholder={profile.secondName} />
          <img className='icon' src={nameIcon} />
        </div>

        <div className='inputGroup'>
          <input type="email" className="form-control" id="email"
            name='email'
            value={formValues.email}
            onChange={(e) => handleFormChange(e)}
            placeholder={profile.email} />
          <img className='icon' src={mailIcon} />
        </div>
        <div className='inputGroup'>
          <input type="text"
            className="form-control"
            id="jobTitle"
            name='jobTitle'
            value={formValues.jobTitle}
            onChange={(e) => handleFormChange(e)}
            placeholder={profile.jobTitle}
          />
          <img className='icon' src={jobIcon} />
        </div>

        <div className="form-row align-items-center">
          <div className="col-auto my-1">
            <div className='inputGroup inlineSelect'>
              <select
                placeholder="Country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option>Country..</option>
                {data.countries.map((value, key) => {
                  return (
                    <option value={value.name} key={key}>
                      {value.name}
                    </option>
                  );
                })}
              </select>
              <img className='icon' src={countryIcon} />

            </div>
            <div className='inputGroup inlineSelect'>
              <select
                placeholder="State"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option> State..</option>
                {availableState?.states?.map((e, key) => {

                  return (
                    <option value={e.states} key={key}>
                      {e}

                    </option>
                  );
                })}
              </select>
              <img className='icon' src={stateIcon} />
            </div>
          </div>
        </div>
        <button type="submit" id="submitBtn"
          onClick={(e) => handleSubmitForm(e)}
          className="btn btn-primary"
        >Submit</button>
        <button type="submit" id="submitBtnDelete"
          onClick={(e) => handleDeleteForm(e)}
          className="btn btn-primary">Delete</button>
      </form>
    </div>
  )
}

export default EditProfile