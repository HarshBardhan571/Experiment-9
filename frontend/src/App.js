import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc', // Vibrant purple
    },
    secondary: {
      main: '#03dac6', // Neon teal
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 16,
  },
});

function App(){
  const role = sessionStorage.getItem('role');

  const logout = ()=>{
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="sticky" elevation={0} sx={{ background: 'linear-gradient(135deg, rgba(187, 134, 252, 0.4) 0%, rgba(3, 218, 198, 0.4) 100%)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Toolbar>
            <SecurityIcon sx={{ mr: 2, color: '#03dac6' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: '800', letterSpacing: 1.5, background: '-webkit-linear-gradient(45deg, #bb86fc, #03dac6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              RBAC NEXT
            </Typography>
            {role === 'USER' && <Button color="secondary" component={Link} to="/user" sx={{ mr: 2, fontWeight: 'bold' }}>User Portal</Button>}
            {role === 'ADMIN' && <Button color="secondary" component={Link} to="/admin" sx={{ mr: 2, fontWeight: 'bold' }}>Admin Portal</Button>}
            {role && <Button variant="contained" color="secondary" sx={{ ml: 2, borderRadius: 8, boxShadow: '0 4px 12px rgba(3, 218, 198, 0.3)' }} onClick={logout}>Logout</Button>}
          </Toolbar>
        </AppBar>
        <Box sx={{ 
          minHeight: 'calc(100vh - 64px)', 
          background: 'radial-gradient(circle at 10% 20%, rgb(40, 31, 57) 0%, rgb(18, 18, 18) 40%, rgb(18, 25, 30) 100%)',
          py: { xs: 4, md: 8 }, 
          px: { xs: 2, md: 0 } 
        }}>
          <Container maxWidth="md">
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/user" element={<UserDashboard/>} />
              <Route path="/admin" element={<AdminDashboard/>} />
            </Routes>
          </Container>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
