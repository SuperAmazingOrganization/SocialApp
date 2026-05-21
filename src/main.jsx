import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Tweet from './Tweet.jsx'
import Feed from './Feed.jsx'
// import FeedContextProvider from './FeedContext.jsx'
import { store } from './store/store'
import { Provider } from 'react-redux'
import Header from "./Header.jsx";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CreateTweet from "./CreateTweet.jsx";
import Box from "@mui/material/Box";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <Header />
          <Feed />
          <Fab
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
          >
              <AddIcon />
          </Fab>
              <CreateTweet />

      </Provider>
  </StrictMode>,
)
