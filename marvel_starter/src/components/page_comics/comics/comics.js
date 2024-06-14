import { useState, useEffect } from "react";
import { ComicsHeader } from "../comics_header/ComicsHeader";
import { ComicsServices } from "../../../service/ComicsServices";

export const Comics = () => {
const [state, setState] = useState(null);
const {loading, error, getAllCharacters, getCharacters, clearError} = ComicsServices();
useEffect(() => {
    // setState(getAllCharacters());
}, [])
// console.log(state)
    return (
        <div>
            <ComicsHeader />
        </div>
    )
}