import axios from 'axios'

const instance = axios.create({ baseURL: '//localhost:3000/persons' });

const post = (url, data) => {
    return instance.post(url, data)
}

const get = (url) => {
  return instance.get(url)
}

const remove = (id) => {
  return instance.delete(id)
}

const put = (id, data) => {
  return instance.put(id.toString(), data)
}

export default {
  get: get,
  post: post,
  remove: remove,
  put: put
}