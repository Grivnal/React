import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        primary: {
            light: "#6fbf73",
            main: "#4caf50",
            dark: "#357a38",
        },
        secondary: {
            light: "#33ab9f",
            main: "#009688",
            dark: "#00695f",
        },
        text: {
            main: "#000",
            hover: "#c9c9c9",
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        primary: {
            light: "#464943",
            main: "#181C14",
            dark: "#10130e",
        },
        secondary: {
            light: "#879083",
            main: "#697565",
            dark: "#495146",
        },
        text: {
            main: "#fff",
            hover: "#c9c9c9",
        },
    },
});