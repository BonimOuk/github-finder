import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';

function User({ user, loading, getUser }) {
  const params = useParams();

  const {
    name,
    avatar_url,
    location,
    bio,
    login,
    html_url,
    followers,
    following,
    public_gists,
    public_repos,
    hireable,
    blog,
    company,
  } = user;

  useEffect(() => {
    getUser(params.login);
  }, []);

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-centre'>
          <img
            src={avatar_url}
            alt=''
            className='round-img'
            style={{ width: '150px' }}
          />
          <h1>{name || login}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit GitHub profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
    </Fragment>
  );
}

export default User;
