import React from 'react';
import { Box, Typography, Grid, Button, Tooltip, Divider } from '@mui/material';
import Response from './Response';
import { DialogR } from './DialogPQR';

export default function Claim(props){
    const { claim, enable, admin, info } = props;

    const [ open, setOpen ] = React.useState(false);

    const handleDialog = (open) =>{
        setOpen(open);
    }

    return (
        <React.Fragment>
            <Grid item xs={12} mb="14px" px="14px">
                <Typography sx={{ fontWeight:"600"}}>
                    Reclamo:
                </Typography>
            </Grid>
            <Grid item xs={12} mb="14px" px="14px">
                <Box>
                    { claim ? 
                        <Grid container justifyContent="center" sx={{ wordBreak:"break-all" }}>
                            <Grid item xs={12} mb="14px">
                                <Typography >
                                    <b>Radicado:</b> {claim._id}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} mb="14px">
                                <Typography >
                                    <b>Fecha de creación:</b> {claim.creationDate.split("T")[0]}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} mb="14px">
                                <Typography >
                                    <b>Fecha de cierre:</b> {claim.closedDate?.split("T")[0]}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} mb="14px">
                                <Typography >
                                    <b>Motivo:</b> {claim.content.reason}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} mb="14px">
                                <Typography>
                                    <b>Detalles:</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} mb="14px">
                                <Typography >
                                    {claim.content.details}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} my="10px" >
                                <Divider />
                            </Grid>
                            <Response response={claim.response} admin={admin} onDialog={handleDialog} />
                        </Grid>
                    :
                        (admin ?
                            <Grid item xs={12} mb="14px">
                                <Typography >
                                    No hay reclamo
                                </Typography>
                            </Grid>
                        :
                            (enable ?
                                <Button variant="contained" onClick={() => handleDialog(true)}> 
                                    Presentar reclamo
                                </Button>
                            :
                                <Tooltip title="Debe esperar una respuesta o que pasen 5 días despues de la solicitud">
                                    <span>
                                        <Button variant="contained" disabled > 
                                            Presentar reclamo
                                        </Button>
                                    </span>
                                </Tooltip>
                            )
                        )
                    }
                </Box>
                <DialogR open={open} onClose={handleDialog} info={info} claim={claim} />
            </Grid>
        </React.Fragment>
    );
}