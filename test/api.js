import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const users = async () => axios.post(API_URL, {
  query: `
  query () {
    users {
      email,
    }
  }
  `
});
