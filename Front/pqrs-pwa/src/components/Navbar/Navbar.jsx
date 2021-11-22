import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exitClientAction } from '../../redux/user.ducks';
import { Link, NavLink } from 'react-router-dom';
import { Box, AppBar, Toolbar, MenuItem, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Menu, Dashboard, Person } from '@mui/icons-material';
import styled from '@emotion/styled';
import BTGPactual from '../../images/btgpactual.png'

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function NavbarMobile(props){
    const { isOpen, onClick, anchor, name } = props;

    return(
        <React.Fragment>
            <Drawer open={isOpen} onClose={onClick} anchor={anchor} >
                <List >
                    <ListItem onClick={onClick} buttom component={NavLink} to={process.env.REACT_APP_BASE_PATH + "/dashboard"} activeClassName="active_alt" >
                        <ListItemIcon size="large" sx={{ color:"black.main" }} > <Dashboard /> </ListItemIcon>
                        <ListItemText primary="PQRs" sx={{ color:"black.main" }} />
                    </ListItem>
                    <ListItem >
                        <ListItemIcon size="large" sx={{ color:"black.main" }} > <Person /> </ListItemIcon>
                        <ListItemText primary={name} sx={{ color:"black.main" }} />
                    </ListItem>
                </List>
                <Divider />
                <List sx={{ minWidth:"200px" }}>
                    <ListItem onClick={onClick} buttom component={NavLink} to={process.env.REACT_APP_BASE_PATH + "/pqr"} >
                        <Button variant="contained" color="secondary" onClick={onClick} fullWidth >
                            Salir
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    );
}

export default function Navbar() {
    const dispatch = useDispatch();
    const { token, name } = useSelector(store => store.user);

    const [ menuMobile, setMenuMobile ] = React.useState(false);
    const anchorMobile = "right";

    const onClick = () => {
        console.log("Navbar| exitClientAction");
        dispatch(exitClientAction());
    }

    const handleMenuMobile = () => {
        setMenuMobile(!menuMobile);
    }

    return(
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar component="div" sx={{ minHeight:"40px !important" }} >
                    <Box component="div" >
                        <Link to={process.env.REACT_APP_BASE_PATH} >
                            <Box component="img" height="40px" mx="20px" src={BTGPactual} alt="PQR logo" />
                        </Link>
                    </Box>
                    <Box flexGrow={1} />
                    <Box sx={{ display:{ xs:"none", md:"flex" }}} px="10px" >
                        { token === "" ?
                            <MenuItem >
                                <p>PQR Prueba</p>
                            </MenuItem>
                        :
                            <React.Fragment>
                                <MenuItem component={NavLink} to={process.env.REACT_APP_BASE_PATH + "/dashboard"} activeClassName="active" sx={{ py:"0px", pl:"0px" }} >
                                    <IconButton size="large" color="inherit" >
                                        <Dashboard />
                                    </IconButton>
                                    <p>PQRs</p>
                                </MenuItem>
                                <MenuItem sx={{ py:"0px", pl:"0px" }} >
                                    <IconButton size="large" color="inherit" >
                                        <Person />
                                    </IconButton>
                                    <p>{name}</p>
                                </MenuItem>
                                <MenuItem sx={{ p:"0px" }} >
                                    <Button variant="contained" color="secondary" fullWidth onClick={() => onClick()} component={Link} to={process.env.REACT_APP_BASE_PATH} >
                                        Salir
                                    </Button>
                                </MenuItem>
                            </React.Fragment>
                        }
                        
                    </Box>
                    <Box sx={{ display:{ xs:"flex", md:"none" }}} >
                        { token === "" ?
                            <MenuItem >
                                <p>PQR Prueba</p>
                            </MenuItem>
                        :
                            <IconButton size="large" color="inherit" aria-haspopup="true" onClick={handleMenuMobile} >
                                <Menu />
                            </IconButton>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <NavbarMobile isOpen={menuMobile} anchor={anchorMobile} name={name} onClick={handleMenuMobile} />
            <Offset />
        </React.Fragment>
    );
}