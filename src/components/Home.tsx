import React, { useEffect, useState } from 'react';
import Searchbar from "./Searchbar";
import axios from 'axios';

type Location = {
  lat: Number | null
  long: Number | null
};

const Home = () => {

  const [postion, setPostition] = useState<Location>({lat: null, long: null}) 

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Gelocation is available!")
      navigator.geolocation.getCurrentPosition((position) => {
        setPostition({lat: position.coords.latitude, long: position.coords.longitude});
        console.log("position is", position);
      });
    } else {
      // TODO: add use error messages
      console.log("No geolocation :(")
    }

  }, [])

  const getBusinesses = (input: string) => {
    console.log('submitted input, value is ', input);
    axios.get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search", {
      headers: {
        'Authorization': 'Bearer 3OtNU97WseE5jip1a7PEO7yjx4fIeOGbXUWDsuh-4Rrxoiy7dkZ5hIDA3HRwjax8AK4jc9syhRlfi-NF0nuAt-hph4iOeFbDobfUfHdO7DaQ3gB6G3ZYNjxlcPSAYHYx'
      },
      params: {
        'latitude': postion.lat,
        'longitude': postion.long,
        'term': input
      }
    })
    .then(response => {console.log(response.data)})
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Searchbar onSubmit={getBusinesses} />
    </div>
  );
};

export default Home;

