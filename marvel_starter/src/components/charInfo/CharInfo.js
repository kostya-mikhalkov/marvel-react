import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
import MarvelService from '../../service/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import { PropTypes } from 'prop-types';

import './charInfo.scss';

function CharInfo(props) {
    // state = {
    //     char: null,
    //     loading: false,
    //     error: false
    // }
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvel = new MarvelService();

    // componentDidMount() {
    //     this.updateChar();
    // }
    useEffect(() => {
        updateChar();
    }, []);

    // componentDidUpdate(prevProps) {
    //     if (this.props.charId !== prevProps.charId) {
    //         this.updateChar();
    //     }
    // }
    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return
        }
        setLoading(true);
            marvel
            .getCharacters(charId)
            .then(onCharLoaded)
            .catch(onCharError)
    }
    const onCharLoaded = (char) => {
        // this.setState({
        //     char,
        //     loading: false,
        // })
        setChar(char);
        setLoading(false);
    }
    const onCharError = () => {
        // this.setState({
        //     loading: false,
        //     error: true
        // })
        setLoading(false);
        setError(true);
    }

        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton || errorMessage || spinner || content}
            </div>
        )
    }

const View = (char) => {
    const {name, thumbnail, description, homepage, wiki, comics, bool} = char.char;
    const styleImg = bool ? 'contain' : 'cover';
    return (
        <>
                <div className="char__basics">
                <img src={thumbnail} 
                     alt={name}
                     style={{objectFit: `${styleImg}`}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">{comics.length !== 0 ? 'Comics:' : 'Sorry, but this character doesn\'t have any comics in our database'}</div>
            <ul className="char__comics-list">
                {comics.map((item, i) => {
                        if (i <= 9) {
                            return (
                                <li className="char__comics-item"
                                    key={i}>
                                        {item.name}
                                </li>
                            )
                        }
                    })}
            </ul>
        </>      
    )
}
export default CharInfo;

CharInfo.propTypes = {
    charId: PropTypes.number
}