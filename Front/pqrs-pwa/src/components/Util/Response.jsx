import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';

export default function Response(props){
    const { response, admin, onDialog } = props;

    return (
        <React.Fragment>
            <Grid item xs={12} mb="14px" px="14px" >
                <Typography sx={{ fontWeight:"600"}}>
                    Respuesta:
                </Typography>
            </Grid>
            <Grid item xs={12} mb="14px" px="14px">
                <Box >
                    { response  ? 
                        <Grid container>
                            <Grid item xs={12} mb="14px">
                                <Typography >
                                    <b>Usuario:</b> {response.user}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} mb="14px">
                                <Typography>
                                    <b>Detalles:</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography >
                                    {response.details}
                                </Typography>
                            </Grid>
                        </Grid>
                    :
                        (admin ?
                            <Button variant="contained" onClick={() => onDialog(true)} > 
                                Enviar respuesta
                            </Button>
                        :
                            <Grid item xs={12} px="14px" alignItems>
                                <Typography>
                                    Sin respuesta todavia
                                </Typography>
                            </Grid>
                        )
                    }
                </Box>
            </Grid>
        </React.Fragment>
    )
}