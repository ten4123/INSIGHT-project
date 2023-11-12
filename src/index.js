import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import { GenderAgeProvider } from '../src/page/GenderAgeContext';

import StartPage from './page/StartPage';
import SetupPage from './page/SetupPage';
import CamPage from './page/CamPage';
import PersonalAnalyzePage from './page/PersonalAnalyzePage'
import TotalAnalyzePage from './page/TotalAnalyzePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <GenderAgeProvider>
        <Routes>
          <Route index element={<StartPage />} />
          <Route path="1" element={<SetupPage />} />
          <Route path="2" element={<CamPage />} />
          <Route path="3" element={<PersonalAnalyzePage />} />
          <Route path="4" element={<TotalAnalyzePage />} />
        </Routes>
      </GenderAgeProvider>
    </BrowserRouter>
  );

