import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import BizDetails from "./components/BizDetails";
import Searchbar from "./components/Searchbar";
import BizSummary from './components/BizSummary';
import { BizDetailsType, Location } from './types';

const corsAnywhereURL = 'https://cors-anywhere.herokuapp.com/';
const yelpSearchAPI = 'https://api.yelp.com/v3/businesses/search';
const APIKey = '3OtNU97WseE5jip1a7PEO7yjx4fIeOGbXUWDsuh-4Rrxoiy7dkZ5hIDA3HRwjax8AK4jc9syhRlfi-NF0nuAt-hph4iOeFbDobfUfHdO7DaQ3gB6G3ZYNjxlcPSAYHYx'


function App() {
  const [geolocationErr, setGeolocationErr] = useState<string>("");
  const [position, setPostition] = useState<Location>({lat: null, long: null});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [yelpAPIErr, setYelpAPIErr] = useState<string>("");
  const [businesses, setBusinesses] = useState<BizDetailsType[]>([]);

  useEffect(() => {
    const handleGeolocationErr = (error: GeolocationPositionError) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          setGeolocationErr("Please enable location services and refresh the page!");
          break;
        case error.POSITION_UNAVAILABLE || error.TIMEOUT:
          setGeolocationErr("Sorry, location information is unavailable!");
          break;
      };
    };

    const handleGeolocationSuccess = (position: GeolocationPosition) => {
      setPostition({lat: position.coords.latitude, long: position.coords.longitude});
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(handleGeolocationSuccess, handleGeolocationErr);
    } else {
      setGeolocationErr("Geolocation isn't supported by this browser. Try Firefox?")
    }
  }, []);

  const getBusinesses = () => {
    axios.get(corsAnywhereURL + yelpSearchAPI, {
      headers: {
        'Authorization': 'Bearer ' + APIKey
      },
      params: {
        'latitude': position.lat,
        'longitude': position.long,
        'term': searchTerm
      }
    })
    .then(response => {
      if (response.data.total === 0) {
        setYelpAPIErr("No results returned for " + searchTerm);
        setSearchTerm("");
      } else {
        const newBizData = response.data.businesses.map((biz: any) => {
          return ({
            id: biz.id,
            name: biz.name,
            distance: biz.distance,
            rating: biz.rating,
            address: biz.location.display_address,
            phone: biz.phone,
            price: biz.price,
            review_count: biz.review_count
          });
        });
        setBusinesses(newBizData);
        setYelpAPIErr("");
        setSearchTerm("");
      }
    })
    .catch(error => {
      setYelpAPIErr(error.response.data.error.code + ": " +
                    error.response.data.error.description);
    });
  }

  return (
    <Router>
      <Switch>
        <Route path="/details/:id">
          <BizDetails businesses={businesses}/>
        </Route>
        <Route path="/">
          {geolocationErr ?
            <p>{geolocationErr}</p> :
            <Searchbar searchTerm={searchTerm} updateSearchTerm={setSearchTerm} onSubmit={getBusinesses} />}
          {yelpAPIErr && <p>Error calling Yelp API. {yelpAPIErr}</p>}
          {businesses.map(biz => {
            return <BizSummary key={biz.id}
                               id={biz.id}
                               name={biz.name}
                               distance={biz.distance}
                               rating={biz.rating}/>
          })}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
