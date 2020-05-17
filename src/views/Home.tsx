import React, { Fragment, useState } from 'react';
import SearchResults from 'components/SearchResults';
import { Input, FormGroup, Label } from 'reactstrap';

const Home = () => {
  const [search, setSearch] = useState<string>('');
  return (
    <Fragment>
      <FormGroup>
        <Label for="query">Search</Label>
        <Input
          name="query"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </FormGroup>
      <SearchResults query={search} />
    </Fragment>
  );
};

export default Home;
