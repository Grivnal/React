import React, { useEffect } from "react";
import {
    Avatar,
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import {defaultAvatarUrl} from "../../../settings/urls";
import {useSelector} from "react-redux";
import useAction from "../../../hooks/useAction";
import ModalDelete from "../../../components/modal/ModalDelete";

const UsersListPage = () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [userId, setUserId] = React.useState(0);
    const { users, isLoaded } = useSelector(state => state.user);
    const {loadUsers, deleteUser} = useAction();

    useEffect(() => {
        if(!isLoaded){
            loadUsers();
        }
    }, []);

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Avatar</TableCell>
                            <TableCell align="center">First name</TableCell>
                            <TableCell align="center">Last name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Password</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                >
                                    {user.id}
                                </TableCell>
                                <TableCell align="center">
                                    <Avatar sx={{margin: "auto"}} alt="Remy Sharp" src={user.image ? user.image : defaultAvatarUrl} />
                                </TableCell>
                                <TableCell align="center">
                                    {user.firstName}
                                </TableCell>
                                <TableCell align="center">
                                    {user.lastName}
                                </TableCell>
                                <TableCell align="center">
                                    {user.email}
                                </TableCell>
                                <TableCell align="center">
                                    {user.role}
                                </TableCell>
                                <TableCell align="center">
                                    {user.password}
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={`user/${user.id}`}>
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                    <IconButton onClick={() => {
                                        setUserId(user.id)
                                        setModalOpen(true)
                                    }}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box>
                <Link to="user">
                    <Button variant="contained">Create</Button>
                </Link>
            </Box>
            <Box>
                <ModalDelete
                    title="User delete"
                    text="Are you sure?"
                    open={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    action={() => {deleteUser(userId)}}/>
            </Box>
        </Box>
    );
};

export default UsersListPage;