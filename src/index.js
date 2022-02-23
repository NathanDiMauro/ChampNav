import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Indoor from './components/indoor';
import { 
  BrowserRouter, 
  Routes,
  Route } from "react-router-dom";
import MapContainer from "./components/outdoor"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapContainer />} />
        <Route path="/indoor" element={<Indoor />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);