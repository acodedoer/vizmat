import { AppBar, Box, Button, Card, IconButton, Paper,styled, Toolbar, Typography} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import styled from "@emotion/styled"

const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#ffffff",
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });

const SiteTitle = ({title="vismat"}) => {
    return(
        <ThemeProvider theme={theme}>
        <Box sx={{ width:"100%"}}>
            <AppBar position="static" enableColorOnDark color="primary">
            <Toolbar>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Vismat
                </Typography>
            </Toolbar>
            </AppBar>
        </Box>
        </ThemeProvider>
    )
}

// // position: absolute;
// // top:32px;
// // overflow: visible;
// // padding:16px 32px 16px 32px;

// const Header = styled('h1')`
//     width:100vw;
//     margin: 0;
//     border-bottom: 5px solid black;
//     text-align:center;
// `

export default SiteTitle