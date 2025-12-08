'use client';

import { useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ReviewFormData } from '@/layers/04_shared/types/types';

interface ReviewFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ReviewFormData) => void;
}

export const ReviewFormDialog: React.FC<ReviewFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    email: '',
    rating: 0,
    comment: '',
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (
    _event: React.SyntheticEvent,
    newValue: number | null,
  ) => {
    setFormData((prev) => ({ ...prev, rating: newValue || 0 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    if (
      formData.name &&
      formData.email &&
      formData.rating > 0 &&
      formData.comment
    ) {
      onSubmit(formData);
      onClose();
      setFormData({ name: '', email: '', rating: 0, comment: '' });
    } else {
      setValidationError(
        'Please fill in all required fields and rate the business.',
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Write a Review</DialogTitle>
      <Box component="form" onSubmit={handleSubmit} m={2} mt={0}>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            name="name"
            label="Your name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />

          <Box sx={{ mb: 1 }}>
            <Typography component="legend" variant="body1">
              Rate the business
            </Typography>
            <Rating
              component="span"
              name="rating"
              value={formData.rating}
              max={5}
              precision={1}
              onChange={handleRatingChange}
              size="large"
            />
          </Box>

          <TextField
            required
            margin="dense"
            name="comment"
            label="Review"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={formData.comment}
            onChange={handleChange}
          />
          {validationError && (
            <Alert severity="error" variant="outlined" sx={{ my: 1 }}>
              {validationError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
