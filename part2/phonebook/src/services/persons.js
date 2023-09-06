import axios from 'axios'

const instance = axios.create({ baseURL: '//localhost:3000/persons' });

const post = (url, data) => {
    return instance.post(url, data)
    // .then((response) => {
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   console.log("Error:", error.message);
    // });
}

const get = (url) => {
  return instance.get(url)
}

export default {
  get: get,
  post: post
}