import Modal from "@mui/material/Modal";
import {Box, Button, FormControl, FormLabel, TextField, Typography} from "@mui/material";
import useAction from "../../hooks/useAction";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid grey',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

const RoleCreateModal = ({open, handleClose}) => {
    const {createRole} = useAction();

    const createHandler = (event) => {
        event.preventDefault();
        const roleName = event.target["name"].value;
        createRole(roleName);
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style} component="form" onSubmit={createHandler}>
                <Box>
                    <Typography variant="h4" sx={{textAlign: "center", fontWeight: "bold"}}>Create role</Typography>
                </Box>
                <Box sx={{p: 1}}>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="name">
                            Name
                        </FormLabel>
                        <TextField
                            id="name"
                            name="name"
                            fullWidth/>
                    </FormControl>
                </Box>
                <Box sx={{p: 1}}>
                    <Button type="submit" fullWidth variant="contained" color="secondary">Create</Button>
                </Box>
            </Box>
        </Modal>
    )
};

export default RoleCreateModal;