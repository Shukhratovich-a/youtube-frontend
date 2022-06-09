const logOutButton = document.querySelector("#logoutBtn");

const token = window.localStorage.getItem("token");

if (!token) {
  window.location.replace("login.html");
}

logOutButton.onclick = (evt) => {
  evt.preventDefault();

  window.localStorage.removeItem('token');
  window.location.replace("login.html");
};
