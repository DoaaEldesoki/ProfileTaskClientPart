import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './submitProfile.css'
import nameIcon from '../../images/name.png'
import mailIcon from '../../images/mail.png'
import jobIcon from '../../images/job.png'
import countryIcon from '../../images/country.png'
import stateIcon from '../../images/state.png'
import {axiosInstance} from '../../config/axiosconfig';


const SubmitProfile = () => {
  const data = {
    countries: [
      {name: "Egypt",states: ["Cairo", "Giza", "Alexandria", "Mansoura"]},
      { name: "KSA", states: [ "Riyadh" , "Dammam", "Makkah", "Madinah"] },
      { name: "USA", states: ["New York", " New Jersy" ] },
      {name: "UK", states: ["London"]},
      { name: "Qatar", states: ["Doha"]}]};
  

  const navigate = useNavigate();
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
  const [formValuesErrors, setFormValuesErrors] = useState({
    firstNameError: null,
    secondNameError: null,
    countryError: null,
    stateError: null,
  });
  const handleFormChange = (event) => {
    switch (event.target.name) {
      case "firstName":
        setFormValues({
          ...formValues,
          firstName: event.target.value,
        });
        setFormValuesErrors({
          ...formValuesErrors,
          firstNameError:
            event.target.value.length === 0 ? "First Name is required" : null,
        });
        break;
      case "secondName":
        setFormValues({
          ...formValues,
          secondName: event.target.value,
        });
        setFormValuesErrors({
          ...formValuesErrors,
          secondNameError:
            event.target.value.length === 0 ? "Second Name is required" : null,
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
        setFormValuesErrors({
          ...formValuesErrors,
          countryError:
            event.target.value.length === 0 ? "Country is required" : null,
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      !formValuesErrors.firstNameError &&
      !formValuesErrors.secondNameError &&
      !formValuesErrors.countryError
    )

      axiosInstance
        .post("/profiles", formValues)
        .then((response) => {
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
    <div className='submitProfile'>
      <form>
        <h2>Submit Profile</h2>
        <div className='inputGroup'>
          <input type="text"
            className="form-control"
            id="firstName"
            name='firstName'
            value={formValues.firstName}
            required
            onChange={(e) => handleFormChange(e)}
            placeholder='First Name*' />
          <img className='icon' src={nameIcon} />
          {formValuesErrors.firstNameError && (
            <div id="firstNameHelp" className="form-text text-danger">
              {formValuesErrors.firstNameError}
            </div>
          )}
        </div>
        <div className='inputGroup'>
          <input type="text" className="form-control" id="secondName"
            name='secondName'
            value={formValues.secondName}
            onChange={(e) => handleFormChange(e)}
            placeholder="Last Name*" />
          <img className='icon' src={nameIcon} />
        </div>
        {formValuesErrors.secondNameError && (
          <div id="secondNameHelp" className="form-text text-danger">
            {formValuesErrors.secondNameError}
          </div>
        )}
        <div className='inputGroup'>
          <input type="email" className="form-control" id="email"
            name='email'
            value={formValues.email}
            onChange={(e) => handleFormChange(e)}
            placeholder="Email" />
          <img className='icon' src={mailIcon} />
        </div>
        <div className='inputGroup'>
          <input type="text"
            className="form-control"
            id="jobTitle"
            name='jobTitle'
            value={formValues.jobTitle}
            onChange={(e) => handleFormChange(e)}
            placeholder="Job Title" />
          <img className='icon' src={jobIcon} />
        </div>

        <div class="form-row align-items-center">
          <div class="col-auto my-1">
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
        disabled={
          formValuesErrors.firstNameError ||
          formValuesErrors.secondNameError ||
          formValuesErrors.countryError ||
          (formValues.firstName &&
            formValues.secondName &&
            formValues.country) === ""
        }
          onClick={(e) => handleSubmitForm(e)}
          className="btn btn-primary"
        >Submit</button>
      </form>



    </div>
  )
}

export default SubmitProfile;