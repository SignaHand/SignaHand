import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HandContextProvider } from "./context/HandContext";
import Home from "./page/home/Home";
import Edit from "./page/edit/Edit";
import End from "./page/End";
import {PageProvider} from "./context/PageContext";

function App() {
  return (
    <div className="App">
      <PageProvider>
        <HandContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Edit />} />
              <Route path="/End" element={<End />} />
            </Routes>
          </BrowserRouter>
        </HandContextProvider>
      </PageProvider>
    </div>
  );
}

export default App;
