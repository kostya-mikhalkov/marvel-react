import { useState } from "react";

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
            <RandomChar/>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onChangeId={onChangeId}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={charId}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharSearchForm />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}
export default Main;