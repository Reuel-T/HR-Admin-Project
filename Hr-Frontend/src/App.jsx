import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import MainLayout from "./layout/MainLayout";




function App() {

  return (
    <>
      <RouterProvider router={router}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <MainLayout/>
        </ThemeProvider>
      </RouterProvider>
    </>
  )
}

export default App
