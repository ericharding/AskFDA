import React, { Fragment } from 'react';
import SearchResults from 'components/SearchResults';
import { Input, FormGroup, Label } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory<string>();
  const usp = new URLSearchParams(history.location.search);
  const search = usp.get('q') ?? '';

  const setSearch = (s: string) => {
    history.push({
      search: `?q=${s}`,
    });
  };
  // history
  return (
    <Fragment>
      <FormGroup>
        <Label for="query">Yo, FDA. What's up with</Label>
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
