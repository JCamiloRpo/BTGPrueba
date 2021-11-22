import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export default function Page404() {
    return(
        <Box pt="60px" pb="60px" px="12%">
            <Box display={{ xs:"block", md:"flex" }} mx={{ xs:"0px", md:"60px" }} mb="60px" width="auto" >
                <Box m={1} sx={{ wordBreak:"break-all" }} textAlign="center" flexGrow={1} >
                    <h2> Oops Page not found </h2>
                </Box>
            </Box>
            <Box mx={{ xs:"0px", md:"80px" }} width="auto" textAlign="center" >
                <Typography mb="20px" > La página que solicitó no existe o primero debe elegir un usuario en el inicio </Typography>
                <Button variant="contained" LinkComponent={Link} to={process.env.REACT_APP_BASE_PATH} > Volver al inicio</Button>
            </Box>
        </Box>
    );
}