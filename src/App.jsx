import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from 'react-helmet';
import "./App.css";
import MyNav from "./component/MyNav";
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Arte del Pulito - Servizi di Lavanderia Professionale</title>
        <meta name="description" content="Servizi di lavanderia professionale a Tor San Lorenzo Ardea. Tintoria, lavaggio a secco e ad acqua, stireria di alta qualità." />
        <meta name="keywords" content="lavanderia, tintoria, lavaggio a secco, stireria, Tor San Lorenzo Ardea" />
        <meta property="og:title" content="Arte del Pulito - Servizi di Lavanderia Professionale" />
        <meta property="og:description" content="Servizi di lavanderia professionale a Tor San Lorenzo Ardea. Tintoria, lavaggio a secco e ad acqua, stireria di alta qualità." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.artedelpulito.it" /> {/* Replace with your actual URL */}
        <link rel="canonical" href="https://www.artedelpulito.it" /> {/* Replace with your actual URL */}
      </Helmet>
      <MyNav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* Add other routes here if needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;