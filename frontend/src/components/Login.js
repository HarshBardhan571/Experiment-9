import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Card, CardContent, Typography, Box, Avatar, Fade } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const cleanUser = username.trim();
      const cleanPass = password.trim();

      // call a simple protected endpoint to validate credentials
      const res = await axios.get("http://localhost:8080/api/user/profile", {
        auth: { username: cleanUser, password: cleanPass }
      });

      if (res.status === 200) {
        sessionStorage.setItem("user", cleanUser);
        sessionStorage.setItem("pass", cleanPass);
        const role = cleanUser.toLowerCase().includes("admin") ? "ADMIN" : "USER";
        sessionStorage.setItem("role", role);
        if (role === "ADMIN") window.location.href = "/admin";
        else window.location.href = "/user";
      }
    } catch (err) {
      alert('Login failed: ' + (err.response?.statusText || err.message));
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Fade in={true} timeout={800}>
        <Card sx={{ maxWidth: 420, width: '100%', p: { xs: 2, sm: 4 }, background: 'rgba(30, 30, 30, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 48px rgba(0,0,0,0.4)', borderRadius: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0 }}>
            <Avatar sx={{ m: 1, background: 'linear-gradient(45deg, #bb86fc, #03dac6)', width: 72, height: 72, mb: 3, boxShadow: '0 8px 16px rgba(3, 218, 198, 0.3)' }}>
              <LockOutlinedIcon fontSize="large" sx={{ color: '#fff' }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="900" sx={{ background: '-webkit-linear-gradient(45deg, #fff, #bb86fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 4, letterSpacing: 0.5 }}>
              Sign in to continue to your dashboard
            </Typography>
            
            <Box component="form" noValidate sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 4, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<LoginIcon />}
                sx={{ py: 2, fontSize: '1.1rem', background: 'linear-gradient(45deg, #bb86fc, #9c27b0)', '&:hover': { background: 'linear-gradient(45deg, #9c27b0, #7b1fa2)' }, borderRadius: 8, textTransform: 'none', boxShadow: '0 8px 24px rgba(187, 134, 252, 0.4)' }}
                onClick={login}
              >
                Sign In
              </Button>
              
              <Box sx={{ mt: 4, p: 2.5, background: 'rgba(255,255,255,0.03)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ lineHeight: 1.8 }}>
                  <span style={{ color: '#03dac6', fontWeight: 'bold' }}>Hint:</span> Use configured credentials<br/>
                  <span style={{ color: '#aaa' }}>User:</span> <strong style={{ color: '#fff' }}>user1 / user123</strong><br/>
                  <span style={{ color: '#aaa' }}>Admin:</span> <strong style={{ color: '#fff' }}>admin1 / admin123</strong>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </div>
  );
}

export default Login;
