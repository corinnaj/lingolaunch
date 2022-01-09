import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "@mui/material";
import {supabase} from "./supabaseClient";
const pages = [
    { 'title': 'Picture Game', 'link': '/picture-game'},
    { 'title': 'Translate', 'link': '/translate'},
    { 'title': 'Check Vocab', 'link': '/vocab'},
    { 'title': 'Shopping List', 'link': '/shopping'}
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const appName = 'LingoLaunch'

const appBarStyles = {
    minHeight: '70px'
}

const MainNavbar = ({userInfo, updateUserInfo}) => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function logout(event){
        supabase.auth.signOut()
        updateUserInfo({status: "Guest"})
    }

    return (
        <AppBar position="static" elevation={8} style={appBarStyles}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    {/*MOBILE*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        {appName}
                    </Typography>
                    {userInfo.status !== 'Completed' ? '' :
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map(function(page, index){
                                    return(
                                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                                            <Link underline={"none"} color={"black"} href={page.link}>{page.title}</Link>
                                        </MenuItem>
                                    );
                                })}
                            </Menu>
                        </Box>
                    }
                    {/*EXTENDED*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        {appName}
                    </Typography>
                    {userInfo.status !== 'Completed' ? '' :
                        <>
                            <Box sx={{flexGrow: 1, marginLeft: 3, display: {xs: 'none', md: 'flex'}}}>
                                {pages.map(function(page, index){
                                    return(
                                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                                            <Link underline={"none"} color={"white"} href={page.link}>{page.title}</Link>
                                        </MenuItem>
                                    );
                                })}
                            </Box>

                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <Avatar>{userInfo.username.charAt(0).toUpperCase()}</Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" onClick={() => logout()}>Logout</Typography>
                                </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default MainNavbar;
