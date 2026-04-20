import React from "react";
import axios from "axios";
import { Button, Typography, Paper, Box, Avatar, Divider, Zoom } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StorageIcon from '@mui/icons-material/Storage';

function AdminDashboard() {
  const role = sessionStorage.getItem("role");

  if (role !== "ADMIN") {
    alert("Access Denied");
    window.location.href = "/";
  }

  const fetchAdmin = async () => {
    try {
      const cleanUser = (sessionStorage.getItem('user') || '').trim();
      const cleanPass = (sessionStorage.getItem('pass') || '').trim();
      const res = await axios.get("http://localhost:8080/api/admin/dashboard", {
        auth: { 
          username: cleanUser, 
          password: cleanPass 
        }
      });
      alert(JSON.stringify(res.data));
    } catch (err) {
      alert('Admin API error: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <Zoom in={true} style={{ transitionDelay: '300ms' }}>
        <Paper elevation={12} sx={{ p: { xs: 3, md: 6 }, mt: 3, textAlign: 'center', borderRadius: 6, background: 'rgba(30, 30, 30, 0.65)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.05)' }}>
          
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Avatar sx={{ width: 90, height: 90, background: 'linear-gradient(135deg, #bb86fc 0%, #7b1fa2 100%)', mb: 3, boxShadow: '0 8px 24px rgba(187, 134, 252, 0.4)' }}>
              <AdminPanelSettingsIcon sx={{ fontSize: 56, color: '#fff' }} />
            </Avatar>
            <Typography variant="h3" fontWeight="900" sx={{ background: '-webkit-linear-gradient(45deg, #fff, #bb86fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1 }}>
              Admin Controller
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 2, letterSpacing: 1 }}>
              Current Role: <span style={{ color: '#fff', fontWeight: 'bold', padding: '6px 16px', background: '#bb86fc', borderRadius: '24px', marginLeft: 8, boxShadow: '0 4px 12px rgba(187, 134, 252, 0.3)' }}>{role}</span>
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 5, borderColor: 'rgba(255,255,255,0.1)' }} />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<StorageIcon />} 
              onClick={fetchAdmin}
              sx={{ py: 2, px: 6, borderRadius: 8, textTransform: 'none', background: 'linear-gradient(45deg, #bb86fc, #9c27b0)', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 8px 24px rgba(187, 134, 252, 0.4)', '&:hover': { background: 'linear-gradient(45deg, #9c27b0, #7b1fa2)' } }}
            >
              Fetch Admin Data
            </Button>
          </Box>
          
        </Paper>
      </Zoom>
    </div>
  );
}

export default AdminDashboard;
