import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function User({ user, loading, getUser }) {
  const params = useParams();
  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    piublic_gists,
    hireable,
  } = user;

  useEffect(() => {
    console.log(params);
    getUser(params.login);
  }, []);

  return <div>{name || login}</div>;
}

export default User;
