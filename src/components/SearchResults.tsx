import React, { Fragment, useState } from 'react';
import { useSearchQuery } from '../queries/searchQuery';
import { Spinner } from 'reactstrap';
import { SearchQuery } from '../types/SearchQuery';

interface Props {
  query: string;
}

function table(data: SearchQuery) {
  return (
    <table>
      <th>
        <td>id</td>
        <td>year</td>
        <td>subject</td>
      </th>
    </table>
  );
}

function SearchResults({ query }: Props) {
  const { data, loading, error } = useSearchQuery(query);
  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }
  if (loading) {
    return <Spinner />;
  } else if (data) {
    return table(data);
  } else {
    return <div>No results</div>;
  }
}

export default SearchResults;
