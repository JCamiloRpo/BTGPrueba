import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClientsAction, getTokenAction } from '../../redux/user.ducks';
import { Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Person } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import Loading from '../Util/Loading';
import AdminLogo from '../../images/admin_logo.png';
import ClientLogo from '../../images/client_logo.png';

function DialogSelect(props) {
    const { onClose, open, clients, onSelect } = props;

    return (
        <Dialog onClose={() => onClose(false)} open={open}>
            <DialogTitle>Seleccionar un cliente</DialogTitle>
            <List sx={{ pt: 0 }}>
                {clients.map((item) => (
                <ListItem button onClick={() => onSelect(item._id, item.name, false)} key={item._id}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <Person />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default function Inicio() {
    const dispatch = useDispatch();

    const { clients } = useSelector(store => store.user);

    const [ state, setState ] = React.useState({
        init: false,
        open: false
    });
    
    const handleDialog = (open) => {
        setState({ ...state, open });
    };

    const onSelect = (id, name, admin) => {
        handleDialog(false);

        console.log("Inicio| getToken");
        dispatch(getTokenAction(id, name, admin));
    }

    React.useEffect(() => {
        if(!state.init){
            console.log("Inicio| getClientsAction");
            dispatch(getClientsAction());
            setState({ ...state, init: true });
        }
    }, [state, dispatch]);

    return(
        <Box pt="60px" pb="60px" px="12%">
            <Box display={{ xs:"block", md:"flex" }} mx={{ xs:"0px", md:"60px" }} mb="60px" width="auto" >
                <Box m={1} sx={{ wordBreak:"break-all" }} textAlign="center" flexGrow={1} >
                    <h2> Elige el modo de ingreso al sistema </h2>
                </Box>
            </Box>
            <Box mx={{ xs:"0px", md:"80px" }} width="auto" >
                { state.init ?
                    <Grid container width="auto" justifyContent="center" minWidth="min-content" >
                        <Grid item xs={12} md={6} p="16px" >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea onClick={() => onSelect("0","admin", true)}>
                                    <CardMedia component="img" image={AdminLogo} alt="Logo Admin" />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Admin
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} p="16px" >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea onClick={() => handleDialog(true)}>
                                    <CardMedia component="img" image={ClientLogo} alt="Logo Cliente" />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Cliente
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <DialogSelect value={state.value} open={state.open} onClose={handleDialog} onSelect={onSelect} clients={clients} />
                    </Grid>
                :
                    <Loading />
                }
                
            </Box>
        </Box>
    );
}