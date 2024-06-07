import "./App.css";
import { Toaster } from 'react-hot-toast';
import '@fontsource/poppins';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { lazy, Suspense } from "react";
import { Loader } from './components';
import { ErrorBoundary } from 'react-error-boundary';
import { fallbackRender } from "./components/ErrorBoundaryComp";

const GetStart = lazy(() => import('./pages/GetStart'));
const Playground = lazy(() => import('./pages/Playground'));
const MainForm = lazy(() => import('./pages/MainForm'));
const DetailForm = lazy(() => import('./pages/DetailForm'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <React.Fragment>
      <Toaster />
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<GetStart />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/form" element={<MainForm />} />
              <Route path="/personal-detail" element={<DetailForm />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Router>
      </ErrorBoundary>
    </React.Fragment>
  )
}

export default App;
