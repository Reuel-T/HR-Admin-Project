import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import UserInfoPage from './pages/UserInfoPage';
import { QueryClient, QueryClientProvider } from 'react-query';

/**
 * This application use react-query. 
 * I want to avoid useEffect like the plague
 */
const client = new QueryClient();

/* Holds the routes for the application */
const router = createBrowserRouter([
  {
    path: '/', element: <MainLayout />, children:
      [
        { path: '/', element: <UserInfoPage /> },
        { path: '/login', element: <Login /> }
      ]
  },
])

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
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
