const logOutButton = document.querySelector("#logoutBtn");
const videoFrom = document.querySelector("#videoForm");
const videoTitleInput = document.querySelector("#videoInput");
const videoUploadInput = document.querySelector("#uploadInput");
const videoTemplate = document.querySelector("#video-template").content;
const videosList = document.querySelector("#videosList");

// const HOST = "http://localhost:6500";
const HOST = "https://epic-application.herokuapp.com";
const TOKEN = window.localStorage.getItem("token");

if (!TOKEN) {
  window.location.replace("login.html");
}

logOutButton.onclick = (evt) => {
  evt.preventDefault();

  window.localStorage.removeItem("token");
  window.location.replace("login.html");
};

const normalizeTime = (time) => {
  const data = new Date(time);

  const year = data.getFullYear();
  const month = data.getMonth();
  const day = data.getDate();

  const hour = data.getHours();
  const minute = data.getMinutes();

  return year + "/" + month + "/" + day + " | " + hour + ":" + minute;
};

videoFrom.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const title = videoTitleInput.value.trim();
  const file = videoUploadInput.files[0];

  const formData = new FormData();
  formData.append("title", title);
  formData.append("file", file);

  let response = await fetch(HOST + "/admin/videos", {
    method: "POST",
    headers: {
      token: TOKEN,
    },
    body: formData,
  });

  let data = await response.json();

  if (data) {
    renderAdminVideo();
    videoTitleInput.value = null;
    videoUploadInput.value = null;
  }
});

const renderAdminVideo = async () => {
  let response = await fetch(HOST + "/admin/videos", {
    headers: {
      token: TOKEN,
    },
  });

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

renderAdminVideo();
