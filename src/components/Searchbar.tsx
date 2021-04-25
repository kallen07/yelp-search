import React, { FormEvent, ChangeEvent, useState } from 'react';

interface SearchbarProps {
  onSubmit: CallableFunction
}

const Searchbar= (props: SearchbarProps) => {
  const [input, setInput] = useState("")

  // TODO: argument validation
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    props.onSubmit(input);
    setInput("");
  }

  return (
    <div>
      <h1>Find a business nearby!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"
              placeholder="Hardware stores..."
              value={input}
              onChange={handleChange} />
        <button type="submit">Search</button>
        </form>
    </div>
  );
};

export default Searchbar;
