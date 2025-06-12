import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 130 },
  {
    field: 'rewardsPoints',
    headerName: 'Rewards Points',
    type: 'number',
    width: 130,
  },
  {
    field: 'verificationStatus',
    headerName: 'Verification Status',
    width: 150,
    renderCell: (params) => (
      <Box
        sx={{
          backgroundColor:
            params.value === 'verified'
              ? 'success.light'
              : params.value === 'pending'
              ? 'warning.light'
              : 'error.light',
          color: 'white',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          textTransform: 'capitalize',
        }}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    renderCell: (params) => (
      <Box>
        <Tooltip title="View Details">
          <IconButton size="small" onClick={() => handleView(params.row.id)}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Client">
          <IconButton size="small" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];

// Mock data for demonstration
const rows = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-0123',
    rewardsPoints: 1500,
    verificationStatus: 'verified',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-0124',
    rewardsPoints: 750,
    verificationStatus: 'pending',
  },
  // Add more mock data as needed
];

const handleView = (id: number) => {
  console.log('View client:', id);
};

const handleEdit = (id: number) => {
  console.log('Edit client:', id);
};

const ClientList = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Clients
      </Typography>

      <Paper sx={{ height: 600, width: '100%', mt: 3 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
};

export default ClientList; 