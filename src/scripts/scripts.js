import "mdb-ui-kit";
import "jquery";
import { io } from "socket.io-client";
import $ from "jquery";
import Swiper from "swiper";
import Toastify from "toastify-js";

var socket = io();
const moviesSlides = new Swiper(".swiper", {
    slidesPerView: 1.5,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 2.5,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 3.5,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 4.5,
        },
    },
});

const showToast = (text) => {
    Toastify({
        text,
        duration: 3000,
        stopOnFocus: true,
        close: true,
        className: "roovie-toast",
    }).showToast();
};

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

const addMovie = (movieData) => {
    const movie = document.createElement("DIV");
    movie.classList.add("movie");
    movie.classList.add("swiper-slide");
    // movie.innerText = movieData.name;
    const img = document.createElement("img");
    const name = document.createElement("div");
    img.src = movieData.photo;
    name.innerText = movieData.name;
    movie.appendChild(img);
    movie.appendChild(name);
    return movie;
};

const addMovieRequest = (data) => {
    socket.emit("add-movie", data, (msg) => {
        showToast(msg);
    });
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

socket.on("movies", (movies) => {
    $(".movies").html("");
    movies.forEach((movie) => {
        $(".movies").append(addMovie(movie));
    });
    moviesSlides.update();
});

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

$(".movie-form").on("submit", (e) => {
    e.preventDefault();
    const data = {};
    const serialize = $(".movie-form").serializeArray();
    for (let i = 0; i < serialize.length; i++) {
        const element = serialize[i];
        data[element.name] = element.value;
    }
    $(".movie-form").trigger("reset");
    addMovieRequest(data);
});
