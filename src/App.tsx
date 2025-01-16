import './App.css'
import MainPage from '@pages/main';
import Impressum from '@pages/impressum';
import Datenschutz from '@pages/datenschutzerklärung';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { createBrowserRouter, RouterProvider } from 'react-router';
import NotFound from './pages/404';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/impressum",
    element: <Impressum />,
  },
  {
    path: "/datenschutz",
    element: <Datenschutz />,
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    // Add react router
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
