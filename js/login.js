const registerForm = document.querySelector("#loginForm");
const registerUsernameInput = document.querySelector("#usernameInput");
const registerPasswordInput = document.querySelector("#passwordInput");
const showPasswordButton = document.querySelector("#showButton");

const HOST = "https://epictube-back.herokuapp.com";

showPasswordButton.onclick = () => {
  if (registerPasswordInput.type == "password") registerPasswordInput.type = "text";
  else registerPasswordInput.type = "password";
};

registerForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  let username = registerUsernameInput.value.trim();
  let password = registerPasswordInput.value.trim();

  let response = await fetch(HOST + "/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  let data = await response.json();

  if (data?.token) {
    window.localStorage.setItem("token", data?.token);
    window.location.replace("admin.html");
  }
  console.log(data);
});
