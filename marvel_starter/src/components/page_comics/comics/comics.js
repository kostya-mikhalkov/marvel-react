import { useState, useEffect } from "react";
import { ComicsHeader } from "../comics_header/ComicsHeader";
import { ComicsServices } from "../../../service/ComicsServices";
import './comics.css';

export const Comics = () => {
    const [char, setChar] = useState([]);
const [newItemLoaded, setNewItemLoaded] = useState(false);
const [offset, setOffset] = useState(210);
const [charEnded, setCharEnded] = useState(false);
const {loading, error, getAllCharacters, getCharacters, clearError} = ComicsServices();

useEffect(() => {
    onRequest();
}, []);

const onRequest = (offset, initial) => {
    initial ? setNewItemLoaded(false) : setNewItemLoaded(true);
        getAllCharacters(offset)
        .then(onCharLoaded)
}

const onCharLoaded = (newChar) => {
    let ended = false;
    if (newChar < 8) {
        ended = true;
    }
    setChar(char => [...char, ...newChar]);
    setNewItemLoaded(false);
    setOffset(offset => offset + 8);
    setCharEnded(ended);
}

const onRenderListElemnt = (char) => {
    const elem = char.map(({id, prices, images, description, title, bool}, ind) => {
        let charImgStyle = bool ? 'contain' : 'cover';
        return (
            <li className="char__item"
                key={id}
                tabIndex={0}
                >
                <img src={images} style={{objectFit: `${charImgStyle}`}} alt="abyss"/>
                <div className="char__name comics__item">{title}</div>
                <span>{prices}</span>
            </li>
        )
    });
    return (
        <ul className="comics__list">
            {elem}
        </ul>
    )
}
const elem = onRenderListElemnt(char);
    return (
        <div>
            <ComicsHeader />
            {elem}
                <button className="button button__main button__long"
                        disabled={newItemLoaded}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
        </div>
    )
}