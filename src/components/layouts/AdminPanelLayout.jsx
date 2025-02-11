import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Grid from  "@mui/material/Grid2";
import {Outlet} from "react-router-dom";
import AdminPanelMenu from "../menu/AdminPanelMenu";

const AdminPanelLayout = () => {
    return (
        <>
            <Navbar/>
            <Grid container spacing={2} sx={{minHeight: "100vh", my: "10px"}}>
                <Grid size={2}>
                    <AdminPanelMenu/>
                </Grid>
                <Grid size={8}>
                    <Outlet/>
                </Grid>
                <Grid size={2}></Grid>
            </Grid>
            <Footer/>
        </>
    )
}

export default AdminPanelLayout;