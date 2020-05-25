/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MessageQuery
// ====================================================

export interface MessageQuery_inquiries {
  __typename: "inquiries";
  text: string;
  title: string | null;
  year: number;
  file_name: string;
  id: number;
}

export interface MessageQuery {
  /**
   * fetch data from the table: "inquiries"
   */
  inquiries: MessageQuery_inquiries[];
}

export interface MessageQueryVariables {
  id?: number | null;
}
