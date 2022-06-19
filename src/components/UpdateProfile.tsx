import { Box, Button, Stack, TextField } from "@mui/material";
import Avatar from "./Avatar";
import CheckBoxAvatar from "./Avatar/CheckBoxAvatar";

const UpdateProfile = () => {
    return (
        <Stack className="update-profile" spacing={2} component="form">
            <Stack spacing={2}>
                <TextField placeholder="Your display name" fullWidth />
                <Button variant="contained">Update</Button>
            </Stack>
            <Stack direction="row" spacing={2}>
                <CheckBoxAvatar name="green" />
                <CheckBoxAvatar name="orange" />
                <CheckBoxAvatar name="pink" />
                <CheckBoxAvatar name="purple" />
                <CheckBoxAvatar name="yellow" />
            </Stack>
        </Stack>
    );
};

export default UpdateProfile;
