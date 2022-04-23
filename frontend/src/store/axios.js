import axios from 'axios'
exports.instance = axios.create({ baseURL: 'http://localhost:3000/api/' })
exports.config = {
  header: {
    'Content-Type': 'multipart/form-data'
  }
}
