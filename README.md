# To run this project
- `npm install`
- `npm start`
- navigate to http://localhost:3000/
- enable use-cors at http://cors-anywhere.herokuapp.com/corsdemo
    - note: app will NOT fail gracefully if cors-anywhere is not enabled

# Overview of files
- index.js : Javascript entry point
- App.tsx : 
    - handles client side routing
    - holds application state, including geolocation
    - makes call to the Yelp search API
- Searchbar.tsx:
    - renders search bar
    - recieves controlled input value from App component
    - on submit, invokes callback supplied by App component
- BizSummary.tsx
    - presentation component that displays a business summary
- BizDetails.tsx
    - recieves full list of business from App as a prop
    - determines which business information to display based on
      the route params

# Sharp edges to beware of
- If the app hasn't yet recieved the geolocation it will give the following error
    - Error calling Yelp API. VALIDATION_ERROR: Please specify a location or a latitude and longitude
    - To get rid of the error, just retry without refreshing.
    - I didn't have a quick and easy way to solve this that also made sense. We can chat
      more about it on our call.