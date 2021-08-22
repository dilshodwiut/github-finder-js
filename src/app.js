import GitHub from "./components/github";
import UI from "./components/ui";

const github = new GitHub();
const ui = new UI();

const searchUser = document.getElementById("searchUser");

let searchTerm = "";

searchUser.addEventListener("keyup", (e) => {
  const userInput = e.target.value;

  searchTerm = userInput;

  const timer = setTimeout(() => {
    // string method .search() returns the first occurrence's index position
    if (isValid(userInput)) {
      showUserInfo(userInput);
    } else {
      ui.clearProfile();
    }
    clearTimeout(timer);
  }, 700);
});

function isValid(input) {
  return input == searchTerm && input.search(/^[a-z0-9]+[a-z0-9\-]+$/i) != -1;
}

function showUserInfo(name) {
  github
    .getUser(name)
    .then((data) => {
      if (data.profile.message === "Not Found") {
        ui.showAlert("User not found", "alert alert-danger");
      } else {
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    })
    .catch((error) => {
      ui.showAlert(
        "Network Error, please try again later",
        "alert alert-danger"
      );
      throw new Error("Network Error", error);
    });
}
