import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import {BrowserRouter, Route, Routes} from "react-router";
import App from "./App.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<App/>} />
                  <Route path="/login" element={<LoginPage/>} />
                  <Route path="/register" element={<RegisterPage/>} />
              </Routes>
          </BrowserRouter>
      </Provider>
  </StrictMode>,
)
