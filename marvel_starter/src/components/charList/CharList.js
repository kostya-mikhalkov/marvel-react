import { useState, useEffect, useRef } from 'react';
import MarvelService from '../../service/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
import { PropTypes } from 'prop-types';

import './charList.scss';

function CharList(props) {

    // state = {
    //     char: [],
    //     loading: true,
    //     error: false,
    //     newItemLoaded: false,
    //     offset: 210,
    //     charEnded: false
    // }
    const [char, setChar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoaded, setNewItemLoaded] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const arrRef = useRef([]);

    const marvel = new MarvelService();

    // componentDidMount() {
    //     this.onRequest();
    // }
    useEffect(() => {
        onRequest();
    },[])

    const onRequest = (offset) => {
        setNewItemLoaded(true)
            marvel
            .getAllCharacters(offset)
            .then(onCharLoaded)
            .catch(onErrorMessage)

    }
    const onCharLoaded = (newChar) => {
        let ended = false;
        if (newChar < 9) {
            ended = true;
        }
        // this.setState((({char, offset}) => ({
        //     char: [...char, ...newChar],
        //     loading: false,
        //     newItemLoaded: false,
        //     offset: offset + 9,
        //     charEnded: ended
        // })))
        setChar(char => [...char, ...newChar]);
        setLoading(false);
        setNewItemLoaded(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }
    const onErrorMessage = () => {
        // this.setState({
        //     loading: false,
        //     error: true
        // })
        setLoading(false);
        setError(true)
    }
    const onChangeBorder = (ind,id) => {
        arrRef.current.forEach(item => item.classList.remove("activeBg"))
        arrRef.current[ind].classList.add("activeBg");
        props.onChangeId(id);
    }
    const onChangeInTab = (e, ind, id) => {
        if (e.key === 'Tab') {
            onChangeBorder(ind, id);
        }
    }
    const onRenderListElemnt = (char) => {
        const elem = char.map(({name, thumbnail, bool, id}, ind) => {
            let charImgStyle = bool ? 'contain' : 'cover';
            return (
                <li className="char__item"
                    ind={ind}
                    ref={el => arrRef.current[ind] = el}
                    key={id}
                    tabIndex={0}
                    onClick={() => onChangeBorder(ind, id)}
                    onKeyDown={(e) => onChangeInTab(e, ind, id)}>
                    <img src={thumbnail} style={{objectFit: `${charImgStyle}`}} alt="abyss"/>
                    <div className="char__name">{name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {elem}
            </ul>
        )
    }

        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const elem = onRenderListElemnt(char);
        const content = !(loading || error) ? elem : null;
        console.log(arrRef)
        return (
            <div className="char__list">
                    {spinner || errorMessage || content}
                <button className="button button__main button__long"
                        disabled={newItemLoaded}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

export default CharList;

CharList.propTypes = {
    onChangeId: PropTypes.func.isRequired
}