import { Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../../errorboundary/ErrorBoundary";
import { Comics } from "../page_comics/comics/comics";
import { Main } from "../page_comics/main/main";
import { LostPage } from "../page_comics/lostPage/lostPage";
import { SinglePage } from "../page_comics/singlePage/SinglePage";

function App() {

        return (
            <div className="app">
                <ErrorBoundary>
                    <AppHeader/>
                </ErrorBoundary>
                <main>
                   <Routes>
                        <Route path="/" element={<Main />}/>
                        <Route path="/comics" element={<Comics />}/>
                        <Route path="/comics/:comicId" element={<SinglePage />}/>
                        <Route path="*" element={<LostPage />}/>
                   </Routes>
                </main>
            </div>
        )
    }

export default App;