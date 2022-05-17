import "mdb-ui-kit";
import "jquery";
import { io } from "socket.io-client";
import $ from "jquery";

var socket = io();

$(".update-profile").on("submit", (e) => {
    e.preventDefault();
    const data = {};
    const serialize = $(".update-profile").serializeArray();
    for (let i = 0; i < serialize.length; i++) {
        const element = serialize[i];
        data[element.name] = element.value;
    }
    socket.emit("update-profile", data);
});

const addUser = (user) => {
    var onlineUser = document.createElement("DIV");
    onlineUser.setAttribute("class", "online-user");

    var image = document.createElement("IMG");
    image.setAttribute("class", "photo rounded-circle");
    image.setAttribute("src", user.avatar);
    onlineUser.appendChild(image);

    var name = document.createElement("DIV");
    onlineUser.appendChild(name);

    var nameText = document.createTextNode(user.name);
    name.appendChild(nameText);
    return onlineUser;
};

socket.on("users", (users) => {
    $(".online-users").html("");
    for (const socketId in users) {
        if (Object.hasOwnProperty.call(users, socketId)) {
            const user = users[socketId];
            $(".online-users").append(addUser(user));
        }
    }
});
