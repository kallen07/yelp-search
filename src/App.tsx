import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import Details from "./components/BizDetails";
import Searchbar from "./components/Searchbar";
import BizSummary from './components/BizSummary';
import { BizSummaryType, Location } from './types';


function App() {
  const [position, setPostition] = useState<Location>({lat: null, long: null});
  const [businesses, setBusinesses] = useState<BizSummaryType[]>([]);

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

  }, []);

  const getBusinesses = (input: string) => {
    console.log('submitted input, value is ', input);
    axios.get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search", {
      headers: {
        'Authorization': 'Bearer 3OtNU97WseE5jip1a7PEO7yjx4fIeOGbXUWDsuh-4Rrxoiy7dkZ5hIDA3HRwjax8AK4jc9syhRlfi-NF0nuAt-hph4iOeFbDobfUfHdO7DaQ3gB6G3ZYNjxlcPSAYHYx'
      },
      params: {
        'latitude': position.lat,
        'longitude': position.long,
        'term': input
      }
    })
    .then(response => {
      const newBizData = response.data.businesses.map((biz: any) => {
        return ({
          id: biz.id,
          name: biz.name,
          distance: biz.distance,
          address: biz.location.display_address,
          rating: biz.rating
        });
      });
      setBusinesses(newBizData);
      console.log(businesses)
    })
    .catch(err => console.log(err));
  }

  return (
    <Router>
      <Switch>
        <Route path="/details/:id">
          <Details/>
        </Route>
        <Route path="/">
          <Searchbar onSubmit={getBusinesses} />
          {businesses.map(biz => <BizSummary key={biz.id} {...biz}/>)}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
