import React, { Fragment } from 'react';

import Hero from '../components/Hero';
import Content from '../components/Content';
import { useAuth0 } from '../react-auth0-spa';

import { useSearchQuery } from '../queries/searchQuery';

const SearchResults = () => {
  const { isAuthenticated } = useAuth0();
  const { data, error } = useSearchQuery('lorem');
  if (!isAuthenticated) return null;
  if(error) console.log(error);
  return <div>{data?.search_inquiries[0].text}</div>;
};

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <SearchResults />
      <hr />
      <Content />
    </Fragment>
  );
};

export default Home;
