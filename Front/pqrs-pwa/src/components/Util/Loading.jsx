import React from 'react';
import { Box, LinearProgress } from '@mui/material';

export default function Loading() {
    return(
        <Box pt="60px" pb="60px" px="12%">
            <LinearProgress />
        </Box>
    );
}