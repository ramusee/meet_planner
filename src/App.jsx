import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

import { Timing } from './pages/timing/Timing';
import { Home } from './pages/home/Home';
import { DatePicker } from './pages/datePicker/DatePicker';
import { Naming } from './pages/naming/Naming';
import { Concurrences } from './pages/concurrences/Concurrences';

import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="date" element={<DatePicker />} />
          <Route path="timing" element={<Timing />} />
          <Route path="naming" element={<Naming />} />
          <Route path=":meetingCode" element={<Concurrences />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
