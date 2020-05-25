/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchQuery
// ====================================================

export interface SearchQuery_search_inquiries {
  __typename: "inquiries";
  id: number;
  year: number;
  file_name: string;
  title: string | null;
  category: string | null;
  updated_at: any | null;
}

export interface SearchQuery {
  /**
   * execute function "search_inquiries" which returns "inquiries"
   */
  search_inquiries: SearchQuery_search_inquiries[];
}

export interface SearchQueryVariables {
  term: string;
}
