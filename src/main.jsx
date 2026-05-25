import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import Header from "./Header.jsx";
import {BrowserRouter, Route, Routes} from "react-router";
import App from "./App.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Header />
              <Routes>
                  <Route exact path="/" element={<App/>} />
                  <Route exact path="/login" element={<LoginPage/>} />
                  <Route exact path="/register" element={<RegisterPage/>} />
              </Routes>
          </BrowserRouter>
      </Provider>
  </StrictMode>,
)
