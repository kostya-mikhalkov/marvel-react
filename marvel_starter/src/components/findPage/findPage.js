import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from 'react';
import { ComicsServices } from "../../service/ComicsServices";
import MarvelService from "../../service/MarvelService";
import AppBanner from '../appBanner/AppBanner';
import '../page_comics/comics/comics.css';

const FindPage = () => {
    const [char, setCharId] = useState([]);
    const {charId} = useParams();
    const {getCharacters} = MarvelService();
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/')
    }
    useEffect(() => {
        onRequestId(charId)
    }, [charId])
    const onRequestId = (id) => {
        getCharacters(id)
            .then(onCharLoadedId)
    }

    const onCharLoadedId = (char) => {
        setCharId(char)
        console.log(char)
    }
    const {thumbnail, title, description} = char;
    return (
        <>
        <Helmet>
            <meta
            name="description"
            content="Comics portal"
            />
            <title>Comics portal</title>
        </Helmet>
            <AppBanner />
        <div className="charId__item  findPages">
            <div className="charId__flex">
            <img src={thumbnail} 
                className="charId__img"
                alt="img" />
            <div className="charId__box">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
        <div className="charId__btn">
            <button onClick={() => goBack()}>Back to list</button>
        </div>
    </div>
        </>
    )
}

export default FindPage;