import React from "react";
import axios from "axios";
import { Button, Typography, Paper, Box, Avatar, Divider, Zoom } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BlockIcon from '@mui/icons-material/Block';

function UserDashboard() {
  const role = sessionStorage.getItem("role");

  if (!role) window.location.href = "/";

  const fetchData = async () => {
    try {
      const cleanUser = (sessionStorage.getItem('user') || '').trim();
      const cleanPass = (sessionStorage.getItem('pass') || '').trim();
      const res = await axios.get("http://localhost:8080/api/user/profile", {
        auth: {
          username: cleanUser,
          password: cleanPass
        }
      });
      alert(JSON.stringify(res.data));
    } catch (err) {
      alert('Error: ' + (err.response?.data || err.message));
    }
  };

  const tryAdmin = async ()=>{
    try {
      const cleanUser = (sessionStorage.getItem('user') || '').trim();
      const cleanPass = (sessionStorage.getItem('pass') || '').trim();
      await axios.get("http://localhost:8080/api/admin/dashboard", {
        auth: {
          username: cleanUser,
          password: cleanPass
        }
      });
    } catch (err) {
      alert('Admin access denied as expected');
    }
  }

  return (
    <div className="container mt-5">
      <Zoom in={true} style={{ transitionDelay: '300ms' }}>
        <Paper elevation={12} sx={{ p: { xs: 3, md: 6 }, mt: 3, textAlign: 'center', borderRadius: 6, background: 'rgba(30, 30, 30, 0.65)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.05)' }}>
          
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Avatar sx={{ width: 90, height: 90, background: 'linear-gradient(135deg, #03dac6 0%, #018786 100%)', mb: 3, boxShadow: '0 8px 24px rgba(3, 218, 198, 0.4)' }}>
              <PersonIcon sx={{ fontSize: 56, color: '#fff' }} />
            </Avatar>
            <Typography variant="h3" fontWeight="900" sx={{ background: '-webkit-linear-gradient(45deg, #fff, #03dac6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1 }}>
              User Portal
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 2, letterSpacing: 1 }}>
              Current Role: <span style={{ color: '#000', fontWeight: 'bold', padding: '6px 16px', background: '#03dac6', borderRadius: '24px', marginLeft: 8, boxShadow: '0 4px 12px rgba(3, 218, 198, 0.3)' }}>{role}</span>
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 5, borderColor: 'rgba(255,255,255,0.1)' }} />

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, sm: 4 }, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<AccountCircleIcon />} 
              onClick={fetchData}
              sx={{ py: 2, px: 5, borderRadius: 8, textTransform: 'none', background: 'linear-gradient(45deg, #03dac6, #018786)', color: '#000', fontWeight: 'bold', fontSize: '1.05rem', boxShadow: '0 8px 24px rgba(3, 218, 198, 0.35)', '&:hover': { background: 'linear-gradient(45deg, #00b3a3, #006b6a)' } }}
            >
              Get User Profile
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              startIcon={<BlockIcon />} 
              onClick={tryAdmin}
              sx={{ py: 2, px: 5, borderRadius: 8, textTransform: 'none', borderWidth: 2, color: '#cf6679', borderColor: '#cf6679', fontSize: '1.05rem', '&:hover': { borderWidth: 2, background: 'rgba(207, 102, 121, 0.1)', borderColor: '#ff8a9f', color: '#ff8a9f' } }}
            >
              Try Admin API (Fails)
            </Button>
          </Box>
          
        </Paper>
      </Zoom>
    </div>
  );
}

export default UserDashboard;
