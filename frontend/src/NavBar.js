import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useContext } from "react";
import { ColorModeContext } from './ColorModeContext';

export const NavBar = () => {

    const colorMode = useContext(ColorModeContext);

    return (
        <AppBar position="sticky">
            <Toolbar>
              <Avatar
                alt="Oyster or not"
                src={process.env.PUBLIC_URL + '/logo192.png'}
                variant="rounded"
                sx={{mr:2}}
              />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Oyster Or Not
                </Typography>
                <DarkModeIcon onClick={colorMode.toggleColorMode}/>
            </Toolbar>
        </AppBar>
    )
}