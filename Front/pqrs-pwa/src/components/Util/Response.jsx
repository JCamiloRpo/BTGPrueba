import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';

export default function Response(props){
    const { response, admin, onDialog } = props;

    return (
        <React.Fragment>
            <Grid item xs={12} mb="14px" px="14px" >
                <Typography sx={{ fontWeight:"600", wordBreak:"break-all" }}>
                    Respuesta:
                </Typography>
            </Grid>
            <Grid item xs={12} mb="14px" px="14px">
                <Box px="10px" >
                    { response  ? 
                        <Grid container>
                            <Grid item xs={6} mb="14px" px="14px">
                                <Typography>
                                    Detalles:
                                </Typography>
                            </Grid>
                            <Grid item xs={6} mb="14px" px="14px">
                                <Typography sx={{ wordBreak:"break-all" }}>
                                    Usuario: {response.user}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} px="14px" pl="32px">
                                <Typography sx={{ wordBreak:"break-all" }}>
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