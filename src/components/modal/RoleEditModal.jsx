import Modal from "@mui/material/Modal";
import {Box, Button, FormControl, FormLabel, TextField, Typography} from "@mui/material";
import useAction from "../../hooks/useAction";
import {useFormik} from "formik";

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

const RoleEditModal = ({open, handleClose, role}) => {
    const {updateRole} = useAction();

    const updateSubmitHandler = (values) => {
        updateRole(values);
        handleClose();
    }

    const formik = useFormik({
        initialValues: {...role},
        onSubmit: updateSubmitHandler
    });

    return (
        <Modal
            open={open}
            onClose={() => {
                formik.setValues({...role});
                handleClose();
            }}>
            <Box sx={style} component="form" onSubmit={formik.handleSubmit}>
                <Box>
                    <Typography variant="h4" sx={{textAlign: "center", fontWeight: "bold"}}>Edit role</Typography>
                </Box>
                <Box sx={{p: 1}}>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="name">
                            Name
                        </FormLabel>
                        <TextField
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            fullWidth/>
                    </FormControl>
                </Box>
                <Box sx={{p: 1}}>
                    <Button type="submit" fullWidth variant="contained" color="secondary">Save</Button>
                </Box>
            </Box>
        </Modal>
    )
};

export default RoleEditModal;