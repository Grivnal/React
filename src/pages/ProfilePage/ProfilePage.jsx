import React from "react";
import {
    Box,
    Avatar,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Stack,
    Divider, useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import {defaultAvatarUrl} from "../../settings/urls";
import {useSelector} from "react-redux";

const ProfilePage = () => {
    const { user } = useSelector(state => state.auth);

    const theme = useTheme();

    const ProfileCard = styled(Card)(() => ({
        maxWidth: 400,
        margin: "auto",
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[3],
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    }));

    return (
        <ProfileCard>
            <CardContent>
                <Stack direction="column" alignItems="center" spacing={2}>
                    <Avatar
                        src={user.image ? user.image : defaultAvatarUrl}
                        alt={`${user.firstName} ${user.lastName}'s avatar`}
                        sx={{ width: 100, height: 100 }}
                    />
                    <Typography variant="h5" component="div" fontWeight="bold">
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.email}
                    </Typography>
                    <Divider sx={{ width: "100%", marginY: 2 }} />
                </Stack>
            </CardContent>
            <CardActions>
                <Box width="100%" display="flex" justifyContent="center">
                    <Button variant="contained" color="primary" sx={{ mx: 1 }}>
                        Follow
                    </Button>
                    <Button variant="outlined" color="primary" sx={{ mx: 1 }}>
                        Message
                    </Button>
                </Box>
            </CardActions>
        </ProfileCard>
    );
};

export default ProfilePage;