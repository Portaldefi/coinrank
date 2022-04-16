import axios from 'axios';

export default axios.create({
  // baseURL: "http://localhost:3344/",
  // baseURL: "https://tokenlists.herokuapp.com",
  // baseURL: "https://thingproxy.freeboard.io/fetch/https://tokenlists.herokuapp.com",
  baseURL: "https://api.allorigins.win/get?url=https://tokenlists.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});