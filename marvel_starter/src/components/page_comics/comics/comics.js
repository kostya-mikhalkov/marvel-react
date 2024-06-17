import { useState, useEffect, useRef } from "react";
import { ComicsHeader } from "../comics_header/ComicsHeader";
import { ComicsServices } from "../../../service/ComicsServices";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../error/Error";
import './comics.css';
import '../../charList/charList.scss';

export const Comics = () => {
    const [char, setChar] = useState([]);
    const [charId, setCharId] = useState([]); // Ensure charId is initialized as an array
    const [id, setId] = useState(null);
    const [newItemLoaded, setNewItemLoaded] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const {loading, error, getAllCharacters, getCharacters, clearError} = ComicsServices();
    const arrRef = useRef([]);

    useEffect(() => {
        onRequest();
    }, []);

    useEffect(() => {
        if (id) {
            onRequestId(id);
        }
    }, [id]);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoaded(false) : setNewItemLoaded(true);
        getAllCharacters(offset)
            .then(onCharLoaded)
    }

    const onRequestId = (id) => {
        getCharacters(id)
            .then(onCharLoadedId)
    }

    const onCharLoadedId = (char) => {
        if (Array.isArray(char)) {
            setCharId(char);
        } else {
            setCharId([char]);
        }
    }

    const onCharLoaded = (newChar) => {
        let ended = false;
        if (newChar.length < 8) {
            ended = true;
        }
        setChar(char => [...char, ...newChar]);
        setNewItemLoaded(false);
        setOffset(offset => offset + 8);
        setCharEnded(ended);
    }

    const onChangeId = (id) => {
        setId(id);
    };

    const onChangeBorder = (ind, id) => {
        arrRef.current.forEach(item => item.classList.remove("activeBg"));
        arrRef.current[ind].classList.add("activeBg");
        onChangeId(id);
    }

    const onRenderListElemnt = () => {
        let elem;
        if (id == null) {
            elem = char.map(({id, prices, images, description, title, bool}, ind) => {
                let charImgStyle = bool ? 'contain' : 'cover';
                return (
                    <li className="char__item"
                        key={id}
                        ref={el => arrRef.current[ind] = el}
                        tabIndex={0}
                        onClick={() => onChangeBorder(ind, id)}>
                        <img src={images} style={{objectFit: `${charImgStyle}`}} alt="abyss"/>
                        <div className="char__name comics__item">{title}</div>
                        <span>{prices}</span>
                    </li>
                );
            });
        } else {
            if (Array.isArray(charId)) {
                elem = charId.map(({images, description, title, prices, pageCount}, ind) => {
                    return (
                        <li className="charId__item"
                            key={ind}>
                            <div className="charId__flex">
                                <img src={images} 
                                    className="charId__img"
                                    alt="img" />
                                <div className="charId__box">
                                    <h2>{title}</h2>
                                    <p>{description}</p>
                                    <span>{prices}</span>
                                </div>
                            </div>
                            <div className="charId__btn">
                                Back to list
                            </div>
                        </li>
                    )
                });
            } else {
                elem = <div>No data available</div>; // Handle case where charId is not an array
            }
        }
        return (
            <ul className="comics__list">
                {elem}
            </ul>
        )
    }

    const elem = char && !loading && !error ? onRenderListElemnt() : null;
    const loadPage = loading && !error ? <Spinner/> : null;
    const errorPage = error ? <ErrorMessage/> : null;

    return (
        <div>
            <ComicsHeader />
            {loadPage || errorPage || elem}
            {elem ? <button className="button button__main button__long"
                        disabled={newItemLoaded}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button> : null}
        </div>
    )
}