import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Divider } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import Response from './Response';
import Claim from './Claim';
import { DialogPQ } from './DialogPQR';

export default function AccordionCard(props){
    const { radicado, info, admin } = props;
    const { area, creationDate, closedDate, content, response, claim } = info;
    const { reason, details } = content;

    const enable = (response || (new Date().getDate() - new Date(creationDate).getDate()) > 5)

    const [ open, setOpen ] = React.useState(false);

    const handleDialog = (open) =>{
        setOpen(open);
    }

    return(
        <Accordion elevation={5}>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Box flexGrow={1} >
                    <Typography sx={{ fontWeight:"600", wordBreak:"break-all" }} >
                        Radicado: {radicado}
                    </Typography>
                </Box>
                <Box flexGrow={1} >
                    <Typography sx={{ fontWeight:"600", wordBreak:"break-all" }} >
                        Area: {area}
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails >
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={6} mb="14px" px="14px">
                        <Typography sx={{ wordBreak:"break-all" }}>
                            <b>Fecha de creación:</b> {creationDate.split("T")[0]}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} mb="14px" px="14px">
                        <Typography sx={{ wordBreak:"break-all" }}>
                            <b>Fecha de cierre:</b>{closedDate?.split("T")[0]}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} mb="14px" px="14px">
                        <Typography sx={{ fontWeight:"600", wordBreak:"break-all" }}>
                            Detalles:
                        </Typography>
                    </Grid>
                    <Grid item xs={6} mb="14px" px="14px">
                        <Typography sx={{ wordBreak:"break-all" }}>
                            <b>Motivo:</b> {reason}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} px="14px" pl="28px" >
                        <Typography sx={{ wordBreak:"break-all" }}>
                            {details}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} my="10px" >
                        <Divider />
                    </Grid>
                    <Response response={response} admin={admin} onDialog={handleDialog} />
                    <Grid item xs={12} my="10px" >
                        <Divider />
                    </Grid>
                    <Claim claim={claim} enable={enable} admin={admin} info={info} />
                </Grid>
            </AccordionDetails>
            <DialogPQ open={open} onClose={handleDialog} info={info} />
        </Accordion>
    )
}