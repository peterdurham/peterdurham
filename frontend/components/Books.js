import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Book from "./Book";

import Pagination from "./PaginationBooks";
import { perPage } from "../config";
import SearchBooks from "./SearchBooks";
import User from "./User";

const ALL_BOOKS_QUERY = gql`
  query ALL_BOOKS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    books(first: $first, skip: $skip, orderBy: title_DESC) {
      id
      title
      author
      year
      description
      genre1
      genre2
      genre3
      printLength
      publisher
      pdfURL
      image
      largeImage
      user {
        id
      }
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const BooksList = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 40px; */

  display: flex;
  flex-wrap: wrap;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 40px auto 100px auto;
`;

const Books = (props) => {
  const filters = ["all", "toRead", "readIt", "genre", "year"];
  // const view = ["default", "wide", "list"];
  const [view, setView] = React.useState("default");
  // const view = "wide";
  return (
    <User>
      {({ data: { me } }) => {
        return (
          <Center>
            <SearchBooks />
            <div className="cardStyleButtons">
              <button className="button" onClick={() => setView("default")}>
                Default
              </button>
              <button className="button" onClick={() => setView("wide")}>
                Wide
              </button>
              <button className="button" onClick={() => setView("list")}>
                List
              </button>
            </div>
            <Pagination page={props.page} />
            <Query
              query={ALL_BOOKS_QUERY}
              // fetchPolicy="network-only"
              variables={{
                skip: props.page * perPage - perPage,
                first: perPage,
              }}
            >
              {({ data, error, loading }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error: {error.message}</p>;

                return (
                  <BooksList>
                    {props.filter === "all" && (
                      <>
                        {data.books.map((book) => (
                          <Book book={book} key={book.id} me={me} view={view} />
                        ))}
                      </>
                    )}
                    {props.filter === "toRead" && (
                      <>
                        {data.books
                          .filter((book) => {
                            const toReadIds = me.toRead.map(
                              (item) => item.book.id
                            );

                            return toReadIds.indexOf(book.id) > -1;
                          })
                          .map((book) => (
                            <Book
                              book={book}
                              key={book.id}
                              me={me}
                              view={view}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "readIt" && (
                      <>
                        {data.books
                          .filter((book) => {
                            const readItIds = me.readIt.map(
                              (item) => item.book.id
                            );

                            return readItIds.indexOf(book.id) > -1;
                          })
                          .map((book) => (
                            <Book
                              book={book}
                              key={book.id}
                              me={me}
                              view={view}
                            />
                          ))}
                      </>
                    )}
                  </BooksList>
                );
              }}
            </Query>
            <Pagination page={props.page} />
          </Center>
        );
      }}
    </User>
  );
};

export default Books;
export { ALL_BOOKS_QUERY };
