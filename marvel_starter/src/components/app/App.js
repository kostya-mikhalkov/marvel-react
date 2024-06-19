import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../../errorboundary/ErrorBoundary";
import { Comics } from "../page_comics/comics/comics";
import { Main } from "../page_comics/main/main";

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
                   </Routes>
                </main>
            </div>
        )
    }

export default App;