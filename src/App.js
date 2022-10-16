import './App.css';
import Header from './Components/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

import Profiles from './Components/Profiles/Profiles';
import SubmitProfile from './Components/submitProfile/submitProfile';
import EditProfile from './Components/EditProfile/EditProfile'



function App() {
  return (
    <BrowserRouter>
      <div className="">
        <Header />
        <Routes>
          <Route path="SubmitProfile" element={<SubmitProfile />} />
          <Route path="/EditProfile/:id" element={<EditProfile />} />
          <Route  path="/" element={<Profiles />} />
        </Routes>
      </div>
  </BrowserRouter>
  );
}

export default App;
