const registerForm = document.querySelector("#registerForm");
const registerUsernameInput = document.querySelector("#usernameInput");
const registerPasswordInput = document.querySelector("#passwordInput");
const registerUpladInput = document.querySelector("#uploadInput");
const showPasswordButton = document.querySelector("#showButton");

const HOST = "https://epictube-back.herokuapp.com";
// const HOST = "http://localhost:6500";
const TOKEN = window.localStorage.getItem("token");

if (TOKEN) {
  window.location.replace("admin.html");
}

showPasswordButton.onclick = () => {
  if (registerPasswordInput.type == "password") registerPasswordInput.type = "text";
  else registerPasswordInput.type = "password";
};

registerForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  let username = registerUsernameInput.value.trim();
  let password = registerPasswordInput.value.trim();
  let file = registerUpladInput.files[0];

  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("file", file);

  let response = await fetch(HOST + "/register", {
    method: "POST",
    body: formData,
  });

  let data = await response.json();

  if (data?.token) {
    window.localStorage.setItem("token", data?.token);
    window.location.replace("admin.html");
  }
  console.log(data);
});
