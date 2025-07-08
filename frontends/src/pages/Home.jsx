/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import devicesJson from '../data/devices.json';
import {
  Container, Typography, Card, CardMedia, CardContent,
  Grid, Dialog, DialogTitle, DialogContent, IconButton, Button, Radio
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Store = ({ onConfirm, selectedDevices: initialSelectedDevices = {} }) => {
  const [selectedDevices, setSelectedDevices] = useState(initialSelectedDevices);
  const [openDialog, setOpenDialog] = useState(null);
  const [selectedSubtypeId, setSelectedSubtypeId] = useState(null);
  const navigate = useNavigate();

  const handleSubtypeSelect = () => {
    const deviceId = openDialog;
    const device = devicesJson.find((d) => d.id === deviceId);
    const subtype = device?.subtypes.find((s) => s.id === selectedSubtypeId);

    if (subtype) {
      setSelectedDevices((prev) => ({
        ...prev,
        [deviceId]: {
          ...subtype,
          quantity: 0,
        },
      }));
    }

    setOpenDialog(null);
    setSelectedSubtypeId(null);
  };

  const handleQuantityChange = (deviceId, delta) => {
    setSelectedDevices((prev) => {
      const device = prev[deviceId];
      if (!device) return prev;
      const newQuantity = Math.max(0, device.quantity + delta);
      return {
        ...prev,
        [deviceId]: {
          ...device,
          quantity: newQuantity,
        },
      };
    });
  };

  const handleReset = () => {
    setSelectedDevices({});
  };

  const grandTotal = Object.values(selectedDevices).reduce(
    (sum, dev) => sum + dev.quantity * dev.price,
    0
  );

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(selectedDevices, navigate);
    }
  };

  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Store of Robot Devices
      </Typography>

      <Grid container spacing={2}>
        {devicesJson.map((device) => (
          <Grid item xs={6} sm={4} md={3} key={device.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardMedia
                component="img"
                image={`/${device.photo}`}
                alt={device.name}
                onClick={() => setOpenDialog(device.id)}
                sx={{
                  height: 100,
                  objectFit: 'contain',
                  width: '100%',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  padding: '6px',
                  borderRadius: '6px'
                }}
              />
              <CardContent sx={{ padding: '6px' }}>
                <Typography variant="subtitle2" noWrap>{device.name}</Typography>
                {selectedDevices[device.id] && (
                  <>
                    <Typography variant="body2">{selectedDevices[device.id].name}</Typography>
                    <Typography variant="body2">${selectedDevices[device.id].price}</Typography>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                      <IconButton onClick={() => handleQuantityChange(device.id, -1)} size="small">
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography>{selectedDevices[device.id].quantity}</Typography>
                      <IconButton onClick={() => handleQuantityChange(device.id, 1)} size="small">
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Dialog open={openDialog === device.id} onClose={() => setOpenDialog(null)} fullWidth>
              <DialogTitle>Select {device.name}</DialogTitle>
              <DialogContent>
                <Grid container spacing={1}>
                  {device.subtypes.map((sub) => (
                    <Grid item xs={6} key={sub.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          padding: '4px',
                          border: selectedSubtypeId === sub.id ? '2px solid blue' : '1px solid #ccc',
                          maxWidth: 140,
                          mx: 'auto'
                        }}
                        onClick={() => setSelectedSubtypeId(sub.id)}
                      >
                        <CardMedia
                            component="img"
                            height="120"
                            image={`/${sub.photo}`}
                            alt={sub.name}
                            sx={{
                              objectFit: 'contain',
                              width: '100%',
                              height: 120,
                              backgroundColor: '#f5f5f5',
                              padding: '8px',
                              borderRadius: '4px'
                          }}
                        />
                        <CardContent sx={{ padding: '4px' }}>
                          <Typography variant="body2" noWrap>{sub.name}</Typography>
                          <Typography variant="caption">${sub.price}</Typography>
                          <Radio
                            checked={selectedSubtypeId === sub.id}
                            value={sub.id}
                            onChange={() => setSelectedSubtypeId(sub.id)}
                            size="small"
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <Button variant="outlined" onClick={() => {
                    setOpenDialog(null);
                    setSelectedSubtypeId(null);
                  }}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleSubtypeSelect}>
                    OK
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" align="right" sx={{ marginTop: 3 }}>
        Grand Total: ${grandTotal.toFixed(2)}
      </Typography>

      <div style={{ 
        marginTop: '1.5rem', 
        display: 'flex', 
        justifyContent: 'space-between',
        
        }}
      >
        <Button variant="outlined" color="warning" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </Container>
  );
};

export default Store;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import devicesJson from '../data/devices.json';
import {
  Container, Typography, Card, CardMedia, CardContent,
  Grid, Dialog, DialogTitle, DialogContent, IconButton, Button, Radio
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Store = ({ onConfirm, selectedDevices: initialSelectedDevices = {} }) => {
  const [selectedDevices, setSelectedDevices] = useState(initialSelectedDevices);
  const [openDialog, setOpenDialog] = useState(null);
  const [selectedSubtypeId, setSelectedSubtypeId] = useState(null);
  const navigate = useNavigate();

  const handleSubtypeSelect = () => {
    const deviceId = openDialog;
    const device = devicesJson.find((d) => d.id === deviceId);
    const subtype = device?.subtypes.find((s) => s.id === selectedSubtypeId);

    if (subtype) {
      setSelectedDevices((prev) => ({
        ...prev,
        [deviceId]: {
          ...subtype,
          quantity: 0,
        },
      }));
    }

    setOpenDialog(null);
    setSelectedSubtypeId(null);
  };

  const handleQuantityChange = (deviceId, delta) => {
    setSelectedDevices((prev) => {
      const device = prev[deviceId];
      if (!device) return prev;
      const newQuantity = Math.max(0, device.quantity + delta);
      return {
        ...prev,
        [deviceId]: {
          ...device,
          quantity: newQuantity,
        },
      };
    });
  };

  const handleReset = () => {
    setSelectedDevices({});
  };

  const grandTotal = Object.values(selectedDevices).reduce(
    (sum, dev) => sum + dev.quantity * dev.price,
    0
  );

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(selectedDevices, navigate);
    }
  };

  return (
    <Container sx={{ paddingBottom: '120px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Store of Robot Devices
      </Typography>

      <Grid container spacing={2}>
        {devicesJson.map((device) => (
          <Grid item xs={6} sm={4} md={3} key={device.id}>
            <Card sx={{
              height: 240,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <CardMedia
                component="img"
                image={`/${device.photo}`}
                alt={device.name}
                onClick={() => setOpenDialog(device.id)}
                sx={{
                  height: 140,
                  objectFit: 'contain',
                  width: '100%',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  padding: '6px',
                  borderRadius: '6px'
                }}
              />
              <CardContent sx={{ padding: '6px' }}>
                <Typography variant="subtitle2" noWrap>{device.name}</Typography>
                {selectedDevices[device.id] && (
                  <>
                    <Typography variant="body2">{selectedDevices[device.id].name}</Typography>
                    <Typography variant="body2">${selectedDevices[device.id].price}</Typography>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                      <IconButton onClick={() => handleQuantityChange(device.id, -1)} size="small">
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography>{selectedDevices[device.id].quantity}</Typography>
                      <IconButton onClick={() => handleQuantityChange(device.id, 1)} size="small">
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Dialog open={openDialog === device.id} onClose={() => setOpenDialog(null)} fullWidth>
              <DialogTitle>Select {device.name}</DialogTitle>
              <DialogContent>
                <Grid container spacing={1}>
                  {device.subtypes.map((sub) => (
                    <Grid item xs={6} key={sub.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          padding: '4px',
                          border: selectedSubtypeId === sub.id ? '2px solid blue' : '1px solid #ccc',
                          maxWidth: 140,
                          mx: 'auto'
                        }}
                        onClick={() => setSelectedSubtypeId(sub.id)}
                      >
                        <CardMedia
                          component="img"
                          height="120"
                          image={`/${sub.photo}`}
                          alt={sub.name}
                          sx={{
                            objectFit: 'contain',
                            width: '100%',
                            backgroundColor: '#f5f5f5',
                            padding: '8px',
                            borderRadius: '4px'
                          }}
                        />
                        <CardContent sx={{ padding: '4px' }}>
                          <Typography variant="body2" noWrap>{sub.name}</Typography>
                          <Typography variant="caption">${sub.price}</Typography>
                          <Radio
                            checked={selectedSubtypeId === sub.id}
                            value={sub.id}
                            onChange={() => setSelectedSubtypeId(sub.id)}
                            size="small"
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <Button variant="outlined" onClick={() => {
                    setOpenDialog(null);
                    setSelectedSubtypeId(null);
                  }}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleSubtypeSelect}>
                    OK
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </Grid>
        ))}
      </Grid>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: '#fff',
        padding: '1rem 2rem',
        borderTop: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 999
      }}>
        <Typography variant="h6">
          Grand Total: ${grandTotal.toFixed(2)}
        </Typography>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="outlined" color="warning" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Store;*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import devicesJson from '../data/devices.json';
import {
  Container, Typography, Card, CardMedia, CardContent,
  Grid, Dialog, DialogTitle, DialogContent, IconButton, Button, Radio
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Store = ({ onConfirm, selectedDevices: initialSelectedDevices = {} }) => {
  const [selectedDevices, setSelectedDevices] = useState(initialSelectedDevices);
  const [openDialog, setOpenDialog] = useState(null);
  const [selectedSubtypeId, setSelectedSubtypeId] = useState(null);
  const navigate = useNavigate();

  const handleSubtypeSelect = () => {
    const deviceId = openDialog;
    const device = devicesJson.find((d) => d.id === deviceId);
    const subtype = device?.subtypes.find((s) => s.id === selectedSubtypeId);

    if (subtype) {
      setSelectedDevices((prev) => ({
        ...prev,
        [deviceId]: {
          ...subtype,
          quantity: 0,
        },
      }));
    }

    setOpenDialog(null);
    setSelectedSubtypeId(null);
  };

  const handleQuantityChange = (deviceId, delta) => {
    setSelectedDevices((prev) => {
      const device = prev[deviceId];
      if (!device) return prev;
      const newQuantity = Math.max(0, device.quantity + delta);
      return {
        ...prev,
        [deviceId]: {
          ...device,
          quantity: newQuantity,
        },
      };
    });
  };

  const handleReset = () => {
    setSelectedDevices({});
  };

  const grandTotal = Object.values(selectedDevices).reduce(
    (sum, dev) => sum + dev.quantity * dev.price,
    0
  );

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(selectedDevices, navigate);
    }
  };

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Store of Robot Devices
      </Typography>

      <Grid container spacing={2}>
        {devicesJson.map((device) => (
          <Grid item xs={6} sm={4} md={3} key={device.id}>
            <Card sx={{ height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardMedia
                component="img"
                image={`/${device.photo}`}
                alt={device.name}
                onClick={() => setOpenDialog(device.id)}
                sx={{
                  height: 120,
                  objectFit: 'contain',
                  width: '100%',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  padding: '6px',
                  borderRadius: '6px'
                }}
              />
              <CardContent sx={{ padding: '6px', textAlign: 'center' }}>
                <Typography variant="subtitle2" noWrap>{device.name}</Typography>
                {selectedDevices[device.id] && (
                  <>
                    <Typography variant="body2">{selectedDevices[device.id].name}</Typography>
                    <Typography variant="body2">${selectedDevices[device.id].price}</Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
                      <IconButton onClick={() => handleQuantityChange(device.id, -1)} size="small">
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography>{selectedDevices[device.id].quantity}</Typography>
                      <IconButton onClick={() => handleQuantityChange(device.id, 1)} size="small">
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Dialog open={openDialog === device.id} onClose={() => setOpenDialog(null)} fullWidth>
              <DialogTitle>Select {device.name}</DialogTitle>
              <DialogContent>
                <Grid container spacing={1}>
                  {device.subtypes.map((sub) => (
                    <Grid item xs={6} key={sub.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          padding: '4px',
                          border: selectedSubtypeId === sub.id ? '2px solid blue' : '1px solid #ccc',
                          maxWidth: 140,
                          mx: 'auto'
                        }}
                        onClick={() => setSelectedSubtypeId(sub.id)}
                      >
                        <CardMedia
                          component="img"
                          height="120"
                          image={`/${sub.photo}`}
                          alt={sub.name}
                          sx={{ objectFit: 'contain', width: '100%', backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '4px' }}
                        />
                        <CardContent sx={{ padding: '4px' }}>
                          <Typography variant="body2" noWrap>{sub.name}</Typography>
                          <Typography variant="caption">${sub.price}</Typography>
                          <Radio
                            checked={selectedSubtypeId === sub.id}
                            value={sub.id}
                            onChange={() => setSelectedSubtypeId(sub.id)}
                            size="small"
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <Button variant="outlined" onClick={() => {
                    setOpenDialog(null);
                    setSelectedSubtypeId(null);
                  }}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleSubtypeSelect}>
                    OK
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </Grid>
        ))}
      </Grid>



      <div style={{
        marginTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        position: 'sticky',
        bottom: 0,
        padding: '10px 0',
        zIndex: 1000
      }}>

        <Button variant="outlined" color="warning" onClick={handleReset}>
          RESET
        </Button>
        <Typography variant="h6" align="right" sx={{ marginTop: 1 }}>
        Grand Total: ${grandTotal.toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          CONFIRM
        </Button>
      </div>
    </Container>
  );
};

export default Store;




