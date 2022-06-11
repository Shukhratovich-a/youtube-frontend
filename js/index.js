const userTemplate = document.querySelector("#user-template").content;
const videoTemplate = document.querySelector("#video-template").content;
const usersList = document.querySelector(".navbar-list");
const videosList = document.querySelector(".iframes-list");
const avatarImage = document.querySelector(".avatar-img");
const searchList = document.querySelector("#datalist");
const searchInput = document.querySelector(".search-input");

// const HOST = "http://localhost:6500";
const HOST = "https://epic-application.herokuapp.com";

const TOKEN = window.localStorage.getItem("token");

const normalizeTime = (time) => {
  const data = new Date(time);

  const year = data.getFullYear();
  const month = data.getMonth();
  const day = data.getDate();

  const hour = data.getHours();
  const minute = data.getMinutes();

  return year + "/" + month + "/" + day + " | " + hour + ":" + minute;
};

const getUserInfo = async () => {
  const response = await fetch(HOST + "/users", {
    headers: {
      token: TOKEN,
    },
  });

  let data = await response.json();

  avatarImage.src = HOST + "/" + data.avatar;
};

const reanderUsers = async () => {
  const response = await fetch(HOST + "/users");

  let data = await response.json();

  data.forEach((user) => {
    const template = userTemplate.cloneNode(true);

    template.querySelector(".channel").onclick = (evt) => {
      for (let i = 1; i < usersList.children.length; i++) {
        usersList.children[i].classList.remove("active");
      }
      evt.target.closest("li").classList.add("active");

      renderVideos(user.userId);
    };

    if (user.avatar) template.querySelector("img").src = HOST + "/" + user.avatar;

    template.querySelector("span").textContent = user.username;

    usersList.appendChild(template);
  });
};

const renderVideos = async (userId) => {
  const response = await fetch(HOST + "/videos" + (userId ? "?userId=" + userId : ""));

  let data = await response.json();

  videosList.innerHTML = null;

  data.forEach((video) => {
    const template = videoTemplate.cloneNode(true);

    if (video.user.avatar) template.querySelector("img").src = HOST + "/" + video.user.avatar;

    template.querySelector("video").src = HOST + "/" + video.link;
    template.querySelector(".channel-name").textContent = video.user.username;
    template.querySelector(".iframe-title").textContent = video.title;
    template.querySelector(".uploaded-time").textContent = normalizeTime(video.date);
    template.querySelector(".download").href = HOST + "/videos/download/" + video.link;
    template.querySelector(".iframe-size").textContent =
      Math.round((video.size / 1024 / 1024) * 10) / 10;

    videosList.appendChild(template);
  });
};

searchInput.addEventListener("input", async (evt) => {
  evt.preventDefault();

  const value = evt.target.value.trim();

  const response = await fetch(HOST + "/videos?search=" + value);

  let data = await response.json();

  searchList.innerHTML = null;
  data.forEach((search) => {
    const option = document.createElement("option");
    option.value = search.title;
    searchList.append(option);
  });
});

getUserInfo();
reanderUsers();
renderVideos();
