import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, BrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import UserInfoPage from './pages/UserInfoPage';
import { QueryClient, QueryClientProvider } from 'react-query';

/**
 * This application uses react-query. 
 * I want to avoid useEffect as much as possible,
 * react query seems to let you dodge using it a lot
 */
const client = new QueryClient();


/**
 * Sets the theme to dark mode
 * My monitor sucks and it hurts my eyes while testing
 */
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <MainLayout/>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
