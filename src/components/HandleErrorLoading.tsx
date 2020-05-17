import React from 'react';
import { ApolloError } from 'apollo-client';
import { Spinner } from 'reactstrap';

function HandleErrorLoading<T>(
  data: T | undefined,
  loading: boolean,
  error: ApolloError | undefined,
  child: (t: T) => JSX.Element|null
) {
  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }
  if (loading) {
    return <Spinner />;
  }
  if (data) {
    return child(data);
  } else {
    return <div>No results</div>;
  }
}

export default HandleErrorLoading;
