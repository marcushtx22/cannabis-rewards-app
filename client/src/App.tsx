import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ClientRegistration from './pages/ClientRegistration';
import ClientList from './pages/ClientList';
import Transactions from './pages/Transactions';
import Rewards from './pages/Rewards';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green shade
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#FFA000', // Amber shade
      light: '#FFB74D',
      dark: '#F57C00',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<ClientRegistration />} />
              <Route path="/clients" element={<ClientList />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/rewards" element={<Rewards />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 