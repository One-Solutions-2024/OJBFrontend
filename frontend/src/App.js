import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs/:id/:slug" element={<JobDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
