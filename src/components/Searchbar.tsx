import React, { FormEvent, ChangeEvent } from 'react';

interface SearchbarProps {
  searchTerm: string,
  updateSearchTerm: CallableFunction,
  onSubmit: CallableFunction
}

const Searchbar= (props: SearchbarProps) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.updateSearchTerm(event.target.value);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    props.onSubmit();
  }

  return (
    <div>
      <h1>Find a business nearby!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"
              placeholder="Surprise me!"
              value={props.searchTerm}
              onChange={handleChange} />
        <button type="submit">Search</button>
        </form>
    </div>
  );
};

export default Searchbar;
