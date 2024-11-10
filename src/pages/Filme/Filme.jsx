import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import "./Filme.css"

import api from "../../services/api"

function Filme() {

    const { id } = useParams()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "dc624ca1500425f63c30a8513c085deb",
                    language: "pt-br",
                }
            })
            .then(response => {
                setFilme(response.data)
                setLoading(false)
            })
            .catch(err => {
                console.log("filme não encotrado")
            })
        }

        loadFilme()

        return () => {
            console.log('Componente foi desmontado')
        }
    }, [])


    if(loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
        </div>
    )
}

export default Filme