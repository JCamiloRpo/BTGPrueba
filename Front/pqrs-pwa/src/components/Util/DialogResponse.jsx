import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPQRClientAction } from '../../redux/pqr.ducks';
import { Grid, Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, DialogActions, Button } from '@mui/material';

export default function DialogEdit(props) {
    const { onClose, open, pqr } = props;

    const dispatch = useDispatch();
    const { id } = useSelector(store => store.user);

    const [ state, setState ] = React.useState( pqr );

    const onChange = (name, value, content=false) => {
        if(!content) setState({ ...state, [name]: value })
        else setState({ ...state, content: { ...state.content, [name]: value }});
    }

    const onConfirm = (event) => {
        if(state.area !== "" && state.content.reason !== "" && state.content.details !== ""){
            event.preventDefault();
            console.log("DialogNew| createPQRClient");
            dispatch(createPQRClientAction(state));
            onClose();
        }
    }

  return (
    <Dialog onClose={() => onClose(false)} open={open} >
      <DialogTitle>Nueva solicitud</DialogTitle>
      <form onSubmit={(event) => onConfirm(event)}>
      <DialogContent dividers>
          <Grid container justifyContent="center">
                <Grid item xs={6} mb="14px" px="14px">
                    <TextField name="radicado" value={state._id} label="Radicado" variant="outlined" size="small" fullWidth required disabled />
                </Grid>
                <Grid item xs={6} mb="14px" px="14px">
                    <Select name="type" value={state.type} onChange={(event) => onChange(event.target.name, event.target.value)} variant="outlined" size="small" fullWidth >
                        <MenuItem value="Peticion">Peticion</MenuItem>
                        <MenuItem value="Queja">Queja</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={6} mb="14px" px="14px">
                    <TextField name="area" value={state.area} onChange={(event) => onChange(event.target.name, event.target.value)} label="Area" variant="outlined" size="small" fullWidth required />
                </Grid>
                <Grid item xs={6} mb="14px" px="14px">
                    <TextField name="reason" value={state.content.reason} onChange={(event) => onChange(event.target.name, event.target.value, true)} label="Motivo" variant="outlined" size="small" fullWidth required />
                </Grid>
                <Grid item xs={12} mb="14px" px="14px">
                    <TextField name="details" value={state.content.details} onChange={(event) => onChange(event.target.name, event.target.value, true)} label="Detalles" variant="outlined" size="small" fullWidth required />
                </Grid>
          </Grid>
      </DialogContent>
      <DialogActions>
          <Button variant="contained" color="secondary" size="small" type="button" onClick={() => onClose()} > Cancelar </Button>
          <Button variant="contained" color="primary" size="small" type="submit" > Confirmar </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
}