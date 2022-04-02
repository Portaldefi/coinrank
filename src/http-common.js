import axios from 'axios';

export default axios.create({
  baseURL: "http://localhost:3344/",
  // baseURL: "https://tokenlists.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});