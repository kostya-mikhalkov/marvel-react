import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ComicsServices } from '../../../service/ComicsServices';
import '../comics/comics.css';

const SinglePage = () => {
    const [char, setCharId] = useState([])
    const {comicId} = useParams();
    const {getCharacters} = ComicsServices();
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/comics')
    }
    useEffect(() => {
        onRequestId(comicId)
    }, [comicId])
    const onRequestId = (id) => {
        getCharacters(id)
            .then(onCharLoadedId)
    }

    const onCharLoadedId = (char) => {
        setCharId(char)
    }
    const {images, title, description, prices, pageCount} = char;
    return (
    <div className="charId__item">
        <div className="charId__flex">
            <img src={images} 
                className="charId__img"
                alt="img" />
            <div className="charId__box">
                <h2>{title}</h2>
                <p>{description}</p>
                <span>{prices}</span>
                <span>{pageCount}</span>
            </div>
        </div>
        <div className="charId__btn">
            <button onClick={() => goBack()}>Back to list</button>
        </div>
    </div>
    )
}
export default SinglePage;