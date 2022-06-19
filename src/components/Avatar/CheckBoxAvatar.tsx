import { Box, Button } from "@mui/material";
import Avatar, { AvatarProps } from ".";

const CheckBoxAvatar = ({ name }: AvatarProps) => {
    return (
        <Button className="avatar checkbox">
            <Avatar name={name} />
        </Button>
    );
};

export default CheckBoxAvatar;
