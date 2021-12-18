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

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
});

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github Users
  const searchUsers = async (text) => {
    setLoading(true);

    const res = await github.get(
      `https://api.github.com/search/users?q=${text}`
    );

    setUsers(res.data.items);
    setLoading(false);
  };

  // Get single Github user
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}`);

    setUser(res.data);
    setLoading(false);
  };

  //  Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sorted=created:asc`
    );

    setRepos(res.data);
    setLoading(false);
  };

  // Clear Users from State
  const clearUsers = () => {
    setUsers([]);
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
                    <Search
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                }
              />
              <Route exact path='/about' element={<About />} />
              <Route
                path='/user/:login'
                element={
                  <User
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    repos={repos}
                    user={user}
                    loading={loading}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
