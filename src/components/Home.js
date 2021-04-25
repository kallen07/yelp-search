import React from 'react';
import Searchbar from "./Searchbar";

const Home = () => {

  const onSubmit = (input) => {
    console.log('submitted input, value is ', input);
  }

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
    </div>
  );
};

export default Home;
