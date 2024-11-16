import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import "./Filme.css"

import api from "../../services/api"

function Filme() {

    const { id } = useParams()
    const navigate = useNavigate()

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
                    navigate("/", { replace: true })
                    return;
                })
        }

        loadFilme()

        return () => {
            console.log('Componente foi desmontado')
        }
    }, [navigate, id])

    function filmesFavoritos() {
        const minhaLista = localStorage.getItem("@primeflix")

        let filmeSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id )

        if(hasFilme) {
            alert("ESSE FILME JÁ ESTA NA LISTA...")
            return;
        }

        filmeSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmeSalvos))
    }

    if (loading) {
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
            <div className="area-button">
                <button onClick={filmesFavoritos}>Salvar</button>
                <button>
                    <a href="#">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme