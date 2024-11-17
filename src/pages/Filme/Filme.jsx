import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { toast} from "react-toastify"

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
            toast.warn("Esse filme já está na sua lista!")
            return;
        }

        filmeSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmeSalvos))
        toast.success("Filmes salvo com sucesso!")
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
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.title}`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme