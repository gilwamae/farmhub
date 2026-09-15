/* ============================================================
   FARMHUB DASHBOARD JAVASCRIPT
   ============================================================ */


/* ============================================================
   1. LOAD USER INFORMATION
   ============================================================ */

const storedUser =
    JSON.parse(
        localStorage.getItem(
            "farmhubUser"
        )
    );


const dashboardUserName =
    document.getElementById(
        "dashboardUserName"
    );


if (
    dashboardUserName &&
    storedUser &&
    storedUser.name
) {

    dashboardUserName.textContent =
        storedUser.name;

}


/* ============================================================
   2. LOGOUT
   ============================================================ */

const logoutButton =
    document.querySelector(
        ".logout-button"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            /*
             * Remove the frontend demo session.
             *
             * Later PHP should destroy the
             * authenticated server session.
             */

            localStorage.removeItem(
                "farmhubUser"
            );


            window.location.href =
                "../pages/login.html";

        }
    );

}