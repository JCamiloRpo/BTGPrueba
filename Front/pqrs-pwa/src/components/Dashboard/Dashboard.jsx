import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPQRsAction, getPQRsClientAction } from '../../redux/pqr.ducks';
import { Box, Tabs, Tab, Button } from '@mui/material';
import Loading from '../Util/Loading';
import AccordionCard from '../Util/AccordionCard';
import { DialogPQ } from '../Util/DialogPQR';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other} >
            {value === index && (
                <Box sx={{ p:"6px" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function Dashboard() {
    const dispatch = useDispatch();
    
    const { PQRs, isLoading } = useSelector(store => store.pqr);

    const { admin } = useSelector(store => store.user);

    const [ state, setState ] = React.useState({
        init: false,
        open: false,
        id: 0
    });

    const handleChange = (event, id) => {
        setState({ ...state, id });
    };

    const handleDialog= (open, init=true) => {
        setState({ ...state, open, init});
    }

    React.useEffect(() => {

        if(!state.init){
            if(admin === "true"){
                console.log("Dashboard| getPQRs");
                dispatch(getPQRsAction());
            }
            else{
                console.log("Dashboard| getPQRsClient");
                dispatch(getPQRsClientAction());
            }
            setState({ ...state, init: true });
        }
        else if (isLoading){
            if(admin === "true"){
                console.log("Dashboard| getPQRs");
                dispatch(getPQRsAction());
            }
            else{
                console.log("Dashboard| getPQRsClient");
                dispatch(getPQRsClientAction());
            }
        }

    }, [isLoading, admin, state, dispatch]);

    return(
        <Box py="60px" px="12%">
            <Box display={{ xs:"block", md:"flex" }} mx={{ xs:"0px", md:"60px" }} mb="60px" width="auto" >
                <Box m={1} sx={{ wordBreak:"break-all" }} textAlign="center" flexGrow={1} >
                    {admin === "true" ?
                        <h2> Administrar PQR de los clientes </h2>
                    :
                        <React.Fragment>
                            <h2> Gestionar mis PQR </h2>
                            <Button variant="contained" sx={{ mt:"8px" }} onClick={() => handleDialog(true)} > Nueva solicitud </Button>
                        </React.Fragment>
                    }
                </Box>
            </Box>
            <Box mx={{ xs:"0px", md:"80px" }} width="auto" >
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Tabs value={state.id} onChange={handleChange} centered >
                        <Tab label="Peticiones" />
                        <Tab label="Quejas" />
                    </Tabs>
                </Box>
                { state.init ?
                    <React.Fragment>
                        <TabPanel value={state.id} index={0}>
                            { PQRs.map((item) => (
                                item.type === "Peticion" && 
                                <AccordionCard key={item._id} radicado={item._id} info={item} admin={admin==="true"} />
                            ))}
                        </TabPanel>
                        <TabPanel value={state.id} index={1}>
                            { PQRs.map((item) => (
                                item.type === "Queja" && 
                                <AccordionCard key={item._id} radicado={item._id} info={item} admin={admin==="true"} />
                            ))}
                        </TabPanel>
                        <DialogPQ open={state.open} onClose={handleDialog} />
                    </React.Fragment>
                :
                    <Loading />
                }
                
            </Box>
        </Box>
    );
}