import { useState } from "react";
import { Helmet } from 'react-helmet-async';

import CharInfo from "../../charInfo/CharInfo";
import CharList from "../../charList/CharList";
import RandomChar from "../../randomChar/RandomChar";
import ErrorBoundary from "../../../errorboundary/ErrorBoundary";
import CharSearchForm from "../../charSearchForm/charSearchForm";

import decoration from '../../../resources/img/vision.png';

const Main = () => {
    const [charId, setCharId] = useState(null)

    const onChangeId = (id) => {
        setCharId(id)
    }
    return (
        <>
            <Helmet>
            <meta
            name="description"
            content="Marvel information portal"
            />
            <title>Marvel portal</title>
            </Helmet>
            <RandomChar/>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onChangeId={onChangeId}/>
                </ErrorBoundary>
                <div>
                <ErrorBoundary>
                    <CharInfo charId={charId}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharSearchForm />
                </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}
export default Main;