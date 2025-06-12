import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  CardGiftcard as CardGiftcardIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }: any) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            backgroundColor: `${color}.light`,
            borderRadius: '50%',
            p: 1,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Clients',
      value: '1,234',
      icon: <PeopleIcon sx={{ color: 'primary.main' }} />,
      color: 'primary',
    },
    {
      title: 'Today\'s Transactions',
      value: '45',
      icon: <ReceiptIcon sx={{ color: 'secondary.main' }} />,
      color: 'secondary',
    },
    {
      title: 'Active Rewards',
      value: '12',
      icon: <CardGiftcardIcon sx={{ color: 'success.main' }} />,
      color: 'success',
    },
    {
      title: 'Points Issued Today',
      value: '2,450',
      icon: <TrendingUpIcon sx={{ color: 'info.main' }} />,
      color: 'info',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Transaction History
            </Typography>
            {/* Add transaction history chart here */}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Rewards Distribution
            </Typography>
            {/* Add rewards distribution chart here */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 