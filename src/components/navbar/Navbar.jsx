import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LanguageIcon from '@mui/icons-material/Language';
import {
    IconButton,
    Button,
    Avatar,
    Box,
    Menu,
    MenuItem,
    Typography,
    AppBar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { defaultAvatarUrl } from "../../settings/urls";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import { useTheme } from "@mui/material";
import {useTranslation} from "react-i18next";
import i18next from "i18next";

const Navbar = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();
    const { isAuth, user } = useSelector((state) => state.auth);
    const {theme} = useSelector((state) => state.theme);
    const { logout, setTheme } = useAction();
    const muiTheme = useTheme();
    const {t} = useTranslation();

    const navLinkStyle = {
        color: muiTheme.palette.text.main,
        fontFamily: "Georgia",
        fontSize: "1.2em"
    }

    const logoutHandler = () => {
        logout();
    };

    const settings = [
        {
            name: "profile",
            action: () => {
                navigate("/profile");
            },
        },
        { name: "logout", action: logoutHandler },
    ];

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // localization
    const changeLanguageHandler = () => {
        const lng = i18next.language === "en" ? "uk" : "en";
        i18next.changeLanguage(lng);
    }

    return (
        <AppBar color="primary" position="static" sx={{ height: "60px", padding: "0px 20px" }}>
            <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
                <Box
                    sx={{
                        flexGrow: 5,
                        display: "flex",
                        justifyContent: "space-evenly"
                    }}
                >
                    <Link style={navLinkStyle} to="/">
                        { t('mainPage') }
                    </Link>
                    <Link style={navLinkStyle} to="/about">
                        { t('aboutPage') }
                    </Link>
                    {isAuth && user.role === "admin" ? (
                        <Link style={navLinkStyle} to="/admin">
                            { t('adminPanelPage') }
                        </Link>
                    ) : (
                        <Link style={navLinkStyle} to="/">
                            Page
                        </Link>
                    )}
                    <Link style={navLinkStyle} to="/">
                        Page 4
                    </Link>
                </Box>

                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "right",
                    }}
                >
                    {theme === "dark" ? (
                        <IconButton onClick={() => setTheme("light")} sx={{ color: muiTheme.palette.text.main }}>
                            <LightModeIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => setTheme("dark")} sx={{ color: muiTheme.palette.text.main }}>
                            <DarkModeIcon/>
                        </IconButton>
                    )}
                    <IconButton onClick={changeLanguageHandler} sx={{ color: muiTheme.palette.text.main }}>
                        <LanguageIcon/>
                    </IconButton>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    {!isAuth ? (
                        <Box sx={{ textAlign: "end" }}>
                            <Link to="login">
                                <Button
                                    color="secondary"
                                    sx={{ margin: "0px 5px 0px 0px", color: muiTheme.palette.text.main }}
                                    variant="contained"
                                >
                                    {t("login")}
                                </Button>
                            </Link>
                            <Link to="register">
                                <Button
                                    sx={{ margin: "0px 10px 0px 5px", color: muiTheme.palette.text.main }}
                                    color="secondary"
                                    variant="contained"
                                >
                                    {t("register")}
                                </Button>
                            </Link>
                        </Box>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={
                                            user.image
                                                ? user.image
                                                : defaultAvatarUrl
                                        }
                                    />
                                </IconButton>
                            </Box>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting.name}
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            if (setting.action) {
                                                setting.action();
                                            }
                                        }}
                                    >
                                        <Typography
                                            sx={{ textAlign: "center" }}
                                        >
                                            {t(setting.name)}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    )}
                </Box>
            </Box>
        </AppBar>
    );
};

export default Navbar;