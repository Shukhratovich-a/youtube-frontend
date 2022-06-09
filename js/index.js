const avatarImage = document.querySelector(".avatar-img");

const HOST = "https://epictube-back.herokuapp.com";
// const HOST = "http://localhost:6500";

const TOKEN = window.localStorage.getItem("token");

const getUserInfo = async () => {
  const response = await fetch(HOST + "/users", {
    headers: {
      token: TOKEN,
    },
  });

  let data = await response.json();

  avatarImage.src = HOST + "/" + data.avatar;
};

getUserInfo();
