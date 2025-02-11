import Grid from "@mui/material/Grid2";
import RoleCard from "../../../components/cards/RoleCard";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import useAction from "../../../hooks/useAction";
import AddIcon from '@mui/icons-material/Add';
import {Fab} from "@mui/material";
import RoleCreateModal from "../../../components/modal/RoleCreateModal";

const RolesListPage = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const {roles, isLoaded} = useSelector((state) => state.role);
    const {loadRoles} = useAction();

    const openCreateModal = () => {
        setCreateModalOpen(true);
    }

    const closeCreateModal = () => {
        setCreateModalOpen(false);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadRoles();
        }
    }, []);

    return (
        <>
            <Grid container spacing={3} sx={{p: 2 }}>
                {
                    roles.map(role => (
                            <Grid key={role.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <RoleCard role={role}/>
                        </Grid>
                    ))
                }
                <Grid size={3} sx={{display: "flex", alignItems: "end"}}>
                    <Fab color="secondary" aria-label="add" onClick={openCreateModal}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
            <RoleCreateModal open={createModalOpen} handleClose={closeCreateModal}/>
        </>
    )
}

export default RolesListPage;