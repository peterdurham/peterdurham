import Link from "next/link";
// import React from 'react';
import Items from "../components/Items";
import Movies from "../components/Movies";
import Books from "../components/Books";
import Games from "../components/Games";

const Home = props => {
  return (
    <div>
      {/* <Items page={parseFloat(props.query.page) || 1} />
      <Books page={parseFloat(props.query.page) || 1} />
      <Games page={parseFloat(props.query.page) || 1} /> */}
      <Link href="/movies">
        <a>Movies</a>
      </Link>
      <Link href="/books">
        <a>Books</a>
      </Link>
      <Link href="/games">
        <a>Games</a>
      </Link>{" "}
      <Movies filter="all" page={parseFloat(props.query.page) || 1} />
    </div>
  );
};
export default Home;
