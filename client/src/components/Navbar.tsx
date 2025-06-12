import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  PersonAdd as PersonAddIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  CardGiftcard as CardGiftcardIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Register Client', icon: <PersonAddIcon />, path: '/register' },
    { text: 'Clients', icon: <PeopleIcon />, path: '/clients' },
    { text: 'Transactions', icon: <ReceiptIcon />, path: '/transactions' },
    { text: 'Rewards', icon: <CardGiftcardIcon />, path: '/rewards' },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Cannabis Rewards
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
                startIcon={item.icon}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 