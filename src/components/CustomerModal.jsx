import React from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CustomerModal = ({ open, onClose, customerName, setCustomerName, onSave }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <h2 id="modal-modal-title">Update Customer</h2>
        <TextField
          label="Customer Name"
          variant="outlined"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          fullWidth
          style={{ marginBottom: '16px' }}
        />
        <Button onClick={onSave} variant="contained" color="primary">
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomerModal;
