import React from 'react';
import { useSearchQuery } from '../queries/searchQuery';
import { Spinner, Table } from 'reactstrap';
import { SearchQuery } from '../types/SearchQuery';

interface Props {
  query: string;
}

function table(data: SearchQuery) {
  return (
    <Table>
      <thead>
        <tr>
        <td>id</td>
        <td>year</td>
        <td>subject</td>
        <td>file</td>
        </tr>
      </thead>
      <tbody>
      {data.search_inquiries.map((row) => (
        <tr>
          <td>{row.id}</td>
          <td>{row.year}</td>
          <td>{row.title}</td>
          <td>{row.file_name}</td>
        </tr>
      ))}
      </tbody>
    </Table>
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
