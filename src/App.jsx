import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import "./App.css";
import MyNav from "./component/MyNav";
import MainPage from './pages/MainPage';
import AdminPanel from './Admin.jsx';
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Helmet>
          <title>Arte del Pulito - Servizi di Lavanderia Professionale</title>
          <meta name="description" content="Servizi di lavanderia professionale a Tor San Lorenzo Ardea. Tintoria, lavaggio a secco e ad acqua, stireria di alta qualità." />
          <meta name="keywords" content="lavanderia, tintoria, lavaggio a secco, stireria, Tor San Lorenzo Ardea" />
          <meta property="og:title" content="Arte del Pulito - Servizi di Lavanderia Professionale" />
          <meta property="og:description" content="Servizi di lavanderia professionale a Tor San Lorenzo Ardea. Tintoria, lavaggio a secco e ad acqua, stireria di alta qualità." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://artedelpulito.vercel.app" />
          <link rel="canonical" href="https://artedelpulito.vercel.app" />
        </Helmet>
        <MyNav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;