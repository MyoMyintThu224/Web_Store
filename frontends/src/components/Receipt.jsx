import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box
} from '@mui/material';

const Receipt = ({ selectedDevices, onBack }) => {
  const devicesArray = Object.values(selectedDevices);
  const grandTotal = devicesArray.reduce(
    (sum, device) => sum + device.quantity * device.price,
    0
  );

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleConfirm = () => {
    alert("Purchase successful!");
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Receipt
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price ($)</TableCell>
              <TableCell>Total Price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devicesArray.map((device, index) => (
              <TableRow key={device.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{device.name || device.subtypeName}</TableCell>
                <TableCell>{device.quantity}</TableCell>
                <TableCell>{device.price}</TableCell>
                <TableCell>{(device.quantity * device.price).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <strong>Grand Total ($)</strong>
              </TableCell>
              <TableCell>
                <strong>{grandTotal.toFixed(2)}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4, gap: '14cm'}}>
        <Button variant="outlined" color="secondary" onClick={handleBack} paddingLeft="5px">
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default Receipt;
