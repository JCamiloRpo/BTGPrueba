import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPQRClientAction, updatePQRClientAction } from '../../redux/pqr.ducks';
import { Grid, Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, DialogActions, Button } from '@mui/material';

function generateRadicado(){
    const addZero = (x, n) =>{
        while(x.toString().length < n){
            x = "0" + x;
        }
        return x;
    }
    const date = new Date();
    return addZero(date.getHours(), 2) + addZero(date.getMinutes(), 2) + addZero(date.getSeconds(), 2) + addZero(date.getMilliseconds(), 3);

}

export const DialogPQ = (props) => {
    const { onClose, open, info } = props;

    const dispatch = useDispatch();
    const { id } = useSelector(store => store.user);

    const init = info ? 
        { ...info, 
            closedDate: new Date().toISOString()
        } :
        {
            _id: generateRadicado(),
            idClient: id,
            type: "Peticion",
            creationDate: new Date().toISOString(),
            closedDate: "",
            area: "",
            content: {
                reason: "",
                details: ""
            },
            response: {},
            claim: {}
        }
    
    const [ state, setState ] = React.useState(init);

    const onChange = (name, value, subname) => {
        if(!subname) setState({ ...state, [name]: value })
        else setState({ ...state, [subname]: { ...state[subname], [name]: value }});
    }

    const onConfirm = (event) => {
        if(state.area !== "" && state.content.reason !== "" && state.content.details !== ""){
            event.preventDefault();
            if(info){
                console.log("DialogNew| updatePQRClient");
                dispatch(updatePQRClientAction(state._id, state));
            }
            else{
                console.log("DialogNew| createPQRClient");
                dispatch(createPQRClientAction(state));
            }
            onClose(false, false);
            setState(init)
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
                    <Select name="type" value={state.type} onChange={(event) => onChange(event.target.name, event.target.value)} variant="outlined" size="small" fullWidth disabled={!!info} >
                        <MenuItem value="Peticion">Peticion</MenuItem>
                        <MenuItem value="Queja">Queja</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={6} mb="14px" px="14px">
                    <TextField name="area" value={state.area} onChange={(event) => onChange(event.target.name, event.target.value)} label="Area" variant="outlined" size="small" fullWidth required disabled={!!info} />
                </Grid>
                <Grid item xs={6} mb="14px" px="14px">
                    <TextField name="reason" value={state.content.reason} onChange={(event) => onChange(event.target.name, event.target.value, "content")} label="Motivo" variant="outlined" size="small" fullWidth required disabled={!!info} />
                </Grid>
                <Grid item xs={12} mb="14px" px="14px">
                    <TextField name="details" value={state.content.details} onChange={(event) => onChange(event.target.name, event.target.value, "content")} label="Detalles" variant="outlined" size="small" fullWidth required disabled={!!info} />
                </Grid>
                { info &&
                    <React.Fragment>
                        <Grid item xs={12} mt="20px" px="14px" textAlign="Center">
                            Respuesta
                        </Grid>
                        <Grid item xs={6} mb="14px" px="14px">
                            <TextField name="user" onChange={(event) => onChange(event.target.name, event.target.value, "response")} label="User" variant="outlined" size="small" fullWidth required />
                        </Grid>
                        <Grid item xs={12} mb="14px" px="14px">
                            <TextField name="details" onChange={(event) => onChange(event.target.name, event.target.value, "response")} label="Detalles" variant="outlined" size="small" fullWidth required />
                        </Grid>
                    </React.Fragment>
                }
          </Grid>
      </DialogContent>
      <DialogActions>
          <Button variant="contained" color="secondary" size="small" type="button" onClick={() => onClose(false)} > Cancelar </Button>
          <Button variant="contained" color="primary" size="small" type="submit" > Confirmar </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
}

export const DialogR = (props) => {
    const { onClose, open, info, claim } = props;

    const dispatch = useDispatch();

    const init = claim ? 
        { 
            ...info,
            closedDate: info.closedDate ?? new Date().toISOString(),
            claim:{
                ...info.claim,
                closedDate: new Date().toISOString(),
            },
        } :
        {
            ...info,
            closedDate: info.closedDate ?? new Date().toISOString(),
            claim: {
                _id: info._id+"-"+generateRadicado(),
                creationDate: new Date().toISOString(),
                closedDate: "",
                content: {
                    reason: "",
                    details: ""
                },
                response: { }
            }
        }
    
    const [ state, setState ] = React.useState(init);

    const onChange = (name, value, subname) => {
        if(!subname) setState({ 
            ...state, 
            claim:{
                ...state.claim,
                [name]: value
            }
        })
        else setState({
            ...state, 
            claim:{
                ...state.claim,
                [subname]: { 
                    ...state.claim[subname], 
                    [name]: value 
                }
            }
        });
    }

    const onConfirm = (event) => {
        if(state.claim.reason !== "" && state.claim.details !== "" ){
            event.preventDefault();
            console.log("DialogNew| updatePQRClient");
            dispatch(updatePQRClientAction(state._id, state));
            setState(init)
            onClose(false, false);
        }
    }

  return (
    <Dialog onClose={() => onClose(false)} open={open} >
      <DialogTitle>Reclamo a solicitud</DialogTitle>
      <form onSubmit={(event) => onConfirm(event)}>
      <DialogContent dividers>
          <Grid container justifyContent="center">
                <Grid item xs={6} mb="14px" px="14px">
                    <TextField name="radicadoS" value={state._id} label="Radicado solicitud" variant="outlined" size="small" fullWidth required disabled />
                </Grid>
                <Grid item xs={6} mb="14px" px="14px">
                    <TextField name="radicado" value={state.claim._id} label="Radicado queja" variant="outlined" size="small" fullWidth required disabled />
                </Grid>
                <Grid item xs={12} mb="14px" px="14px">
                    <TextField name="reason" value={state.claim.content?.reason} onChange={(event) => onChange(event.target.name, event.target.value, "content")} label="Motivo" variant="outlined" size="small" fullWidth required disabled={!!info.claim} />
                </Grid>
                <Grid item xs={12} mb="14px" px="14px">
                    <TextField name="details" value={state.claim.content?.details} onChange={(event) => onChange(event.target.name, event.target.value, "content")} label="Detalles" variant="outlined" size="small" fullWidth required disabled={!!info.claim} />
                </Grid>
                { claim &&
                    <React.Fragment>
                        <Grid item xs={12} mt="20px" px="14px" textAlign="Center">
                            Respuesta
                        </Grid>
                        <Grid item xs={6} mb="14px" px="14px">
                            <TextField name="user" onChange={(event) => onChange(event.target.name, event.target.value, "response")} label="User" variant="outlined" size="small" fullWidth required />
                        </Grid>
                        <Grid item xs={12} mb="14px" px="14px">
                            <TextField name="details" onChange={(event) => onChange(event.target.name, event.target.value, "response")} label="Detalles" variant="outlined" size="small" fullWidth required />
                        </Grid>
                    </React.Fragment>
                }
          </Grid>
      </DialogContent>
      <DialogActions>
          <Button variant="contained" color="secondary" size="small" type="button" onClick={() => onClose(false)} > Cancelar </Button>
          <Button variant="contained" color="primary" size="small" type="submit" > Confirmar </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
}