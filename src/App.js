import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //  Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sorted=created:asc`
    );

    setRepos(res.data);
    setLoading(false);
  };

  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Routes>
              <Route
                exact
                path='/'
                element={
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                }
              />
              <Route exact path='/about' element={<About />} />
              <Route
                path='/user/:login'
                element={<User getUserRepos={getUserRepos} repos={repos} />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
