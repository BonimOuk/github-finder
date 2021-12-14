import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
});
class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };

  // Search Github Users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await github.get(
      `https://api.github.com/search/users?q=${text}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  // Get single Github user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}`);

    this.setState({ user: res.data, loading: false });
  };

  // Clear Users from State
  clearUsers = () => this.setState({ users: [], loading: false });

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, user, loading } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Routes>
              <Route
                exact
                path='/'
                element={
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                }
              />
              <Route exact path='/about' element={<About />} />
              <Route
                path='/user/:login'
                element={
                  <User getUser={this.getUser} user={user} loading={loading} />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
