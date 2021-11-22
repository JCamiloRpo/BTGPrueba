import { createTheme } from '@mui/material';

const theme = createTheme({
    shape: {
        borderRadius: 5
    },
    palette: {
        primary: {
            main: "#0A1E8C",
            darK: "#001E62"
        },
        secondary: {
            main: "#3C0582"
        },
        white: {
            main: "#FFF"
        },
        black: {
            main: "#000"
        }
    }
});

export default theme;