import './App.css'
import MainPage from '@pages/main/index';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    // Add react router
    <ThemeProvider theme={darkTheme}>
      <MainPage />
    </ThemeProvider>
  )
}

export default App
