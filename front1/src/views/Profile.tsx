import React from 'react';
// import { Container, Row, Col } from "react-bulma-components";

import Loading from '../components/Loading';
import { useAuth0 } from '../react-auth0-spa';

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <>
      <div className="columns">
        <div className="column is-vcentered">
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="column is-vcentered">
          <h2>{user.nickname}</h2>
          <p className="lead text-muted">{user.email}</p>
        </div>
      </div>
      <div className="columns">
        <div>{JSON.stringify(user, null, 2)}</div>
      </div>
    </>
  );
};

export default Profile;
