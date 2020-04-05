import SingleGame from "../components/SingleGame";
import User from "../components/User";

const Game = (props) => {
  return (
    <User>
      {({ data: { me } }) => {
        return <SingleGame id={props.query.id} me={me} />;
      }}
    </User>
  );
};

export default Game;
