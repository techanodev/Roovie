import { Box, Button, Stack, TextField } from "@mui/material";
import Avatar from "./Avatar";
import CheckBoxAvatar from "./Avatar/CheckBoxAvatar";

const UpdateProfile = () => {
    return (
        <Stack className="update-profile" spacing={2} component="form">
            <TextField
                className="text-input"
                autoComplete="off"
                placeholder="Your display name"
                fullWidth
                InputProps={{
                    startAdornment: <CheckBoxAvatar name="green" />,
                    endAdornment: <Button className="btn">Update</Button>,
                }}
            />
        </Stack>
    );
};

export default UpdateProfile;
