import axios from 'axios'

//BASE DA URL:  ://api.themoviedb.org/3
//URL DA API: /movie/now_playing?api_key=dc624ca1500425f63c30a8513c085deb&language=pt-br

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api