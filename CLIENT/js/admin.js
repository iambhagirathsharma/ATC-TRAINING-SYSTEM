// Check Login

const token =
localStorage.getItem("token");

if (!token)
{
    window.location.href =
    "../login.html";
}

// Get User Data

const user =
JSON.parse(
localStorage.getItem("user")
);

if(user)
{
    document.getElementById(
        "welcomeText"
    ).innerText =
    `Welcome ${user.name}`;
}

// Logout

document.getElementById(
    "logoutBtn"
).addEventListener(
    "click",
    () =>
    {
        localStorage.clear();

        window.location.href =
        "../login.html";
    }
);