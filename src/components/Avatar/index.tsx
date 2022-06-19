import Image from "next/image";
import Green from "../../resources/avatars/green.jpg";
import Orange from "../../resources/avatars/orange.jpg";
import pink from "../../resources/avatars/pink.jpg";
import Purple from "../../resources/avatars/purple.jpg";
import Yellow from "../../resources/avatars/yellow.jpg";

export type AvatarProps = {
    name: "green" | "orange" | "pink" | "purple" | "yellow";
};

const Avatar = ({ name }: AvatarProps) => {
    let avatarSrc;
    if (name === "green") {
        avatarSrc = Green;
    } else if (name === "orange") {
        avatarSrc = Orange;
    } else if (name === "pink") {
        avatarSrc = pink;
    } else if (name === "purple") {
        avatarSrc = Purple;
    } else if (name === "yellow") {
        avatarSrc = Yellow;
    } else {
        avatarSrc = Green;
    }

    return <Image src={avatarSrc} layout="fill" alt="Avatar" />;
};

export default Avatar;
