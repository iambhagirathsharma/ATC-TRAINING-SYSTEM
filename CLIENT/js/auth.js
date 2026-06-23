const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const selectedRole =
        document.getElementById("role").value;

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);
            return;

        }

        if (data.user.role !== selectedRole) {

            alert(
                "Selected role does not match account role."
            );

            return;

        }

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        if (data.user.role === "admin") {

            window.location.href =
                "admin/dashboard.html";

        }
        else {

            window.location.href =
                "trainee/dashboard.html";

        }

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to connect to server."
        );

    }

});