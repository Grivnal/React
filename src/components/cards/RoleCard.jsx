import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import ModalDelete from "../modal/ModalDelete";
import {useState} from "react";
import useAction from "../../hooks/useAction";
import RoleEditModal from "../modal/RoleEditModal";

const RoleCard = ({role}) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const {deleteRole} = useAction();

    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    }

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    }

    const openUpdateModal = () => {
        setUpdateModalOpen(true);
    }

    const closeUpdateModal = () => {
        setUpdateModalOpen(false);
    }

    return (
        <>
            <Card sx={{maxWidth: 345}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image="https://igotmind.ca/wp-content/uploads/2019/11/rsz_role_defining_2-1.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {role.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="medium" variant="contained" color="secondary" onClick={openUpdateModal}>
                        Edit
                    </Button>
                    <Button onClick={openDeleteModal} size="medium" variant="contained" color="error">
                        Delete
                    </Button>
                </CardActions>
            </Card>
            <ModalDelete open={deleteModalOpen}
                         handleClose={closeDeleteModal}
                         title="Delete role"
                         text="Are you sure you want to delete this role?"
                         action={() => deleteRole(role.id)}/>
            <RoleEditModal
                open={updateModalOpen}
                handleClose={closeUpdateModal}
                role={role}/>
        </>
    );
}

export default RoleCard;