import React, { Fragment, useState } from 'react';


const SearchResults = ({search}) => {
  if(error) console.log(error);
  return <div>{data?.search_inquiries[0].text}</div>;
};

const Home = () => {
  const { search, setSearch } = useState(""); 
  return (
    <Fragment>
      <SearchResults query={search} />
    </Fragment>
  );
};

export default Home;
