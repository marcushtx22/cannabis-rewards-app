import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Mock data for demonstration
const rewards = [
  {
    id: 1,
    name: '10% Off Purchase',
    description: 'Get 10% off your next purchase',
    pointsCost: 500,
    discountAmount: 10,
    discountType: 'percentage',
    validFrom: '2024-03-01',
    validUntil: '2024-04-01',
    isActive: true,
  },
  {
    id: 2,
    name: '$20 Store Credit',
    description: 'Redeem for $20 in store credit',
    pointsCost: 1000,
    discountAmount: 20,
    discountType: 'fixed',
    validFrom: '2024-03-01',
    validUntil: '2024-06-01',
    isActive: true,
  },
];

const RewardDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pointsCost: '',
    discountAmount: '',
    discountType: 'percentage',
    validFrom: '',
    validUntil: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Reward</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reward Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Points Cost"
                type="number"
                value={formData.pointsCost}
                onChange={(e) => setFormData({ ...formData, pointsCost: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Discount Amount"
                type="number"
                value={formData.discountAmount}
                onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Discount Type"
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                required
              >
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="fixed">Fixed Amount</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Valid From"
                type="date"
                value={formData.validFrom}
                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Valid Until"
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Create Reward
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const Rewards = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Rewards
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          New Reward
        </Button>
      </Box>

      <Grid container spacing={3}>
        {rewards.map((reward) => (
          <Grid item xs={12} sm={6} md={4} key={reward.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {reward.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {reward.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={`${reward.pointsCost} points`}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={
                      reward.discountType === 'percentage'
                        ? `${reward.discountAmount}% off`
                        : `$${reward.discountAmount} off`
                    }
                    color="secondary"
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  Valid: {reward.validFrom} to {reward.validUntil}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="error">
                  Deactivate
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <RewardDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
};

export default Rewards; 