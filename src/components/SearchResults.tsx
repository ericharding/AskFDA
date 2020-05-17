import React from 'react';
import { useSearchQuery } from '../queries/searchQuery';
import { Table } from 'reactstrap';
import { SearchQuery } from '../types/SearchQuery';
import { Link } from 'react-router-dom';
import HandleErrorLoading from './HandleErrorLoading';

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
            <td>
              <Link to={'message/' + row.id}>{row.file_name}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function SearchResults({ query }: Props) {
  const { data, loading, error } = useSearchQuery(query);
  return HandleErrorLoading<SearchQuery>(data, loading, error, table);
}

export default SearchResults;
