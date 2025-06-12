import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'clientName', headerName: 'Client', width: 200 },
  { field: 'amount', headerName: 'Amount', width: 130, type: 'number' },
  { field: 'pointsEarned', headerName: 'Points Earned', width: 130, type: 'number' },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => (
      <Box
        sx={{
          backgroundColor:
            params.value === 'completed'
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
  { field: 'transactionDate', headerName: 'Date', width: 180 },
  { field: 'verificationCode', headerName: 'Verification Code', width: 150 },
];

// Mock data for demonstration
const rows = [
  {
    id: 1,
    clientName: 'John Doe',
    amount: 150.00,
    pointsEarned: 150,
    status: 'completed',
    transactionDate: '2024-03-15 14:30:00',
    verificationCode: 'ABC123',
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    amount: 75.50,
    pointsEarned: 75,
    status: 'pending',
    transactionDate: '2024-03-15 15:45:00',
    verificationCode: 'DEF456',
  },
];

const TransactionDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    amount: '',
    products: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>New Transaction</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Client"
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                required
              >
                <MenuItem value="1">John Doe</MenuItem>
                <MenuItem value="2">Jane Smith</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Products"
                multiline
                rows={4}
                value={formData.products}
                onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                required
                helperText="Enter product details (one per line)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Create Transaction
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const Transactions = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Transactions
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          New Transaction
        </Button>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>

      <TransactionDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
};

export default Transactions; 