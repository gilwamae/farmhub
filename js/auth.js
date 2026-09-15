/* ============================================================
   FARMHUB AUTHENTICATION JAVASCRIPT
   ============================================================ */


/* ============================================================
   1. PASSWORD VISIBILITY
   ============================================================ */

const passwordToggles =
    document.querySelectorAll(".password-toggle");


passwordToggles.forEach(function (button) {

    button.addEventListener("click", function () {

        const targetId =
            button.getAttribute("data-target");

        const passwordInput =
            document.getElementById(targetId);

        if (!passwordInput) return;


        const icon =
            button.querySelector("i");


        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            icon.classList.remove(
                "fa-eye"
            );

            icon.classList.add(
                "fa-eye-slash"
            );

            button.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";

            icon.classList.remove(
                "fa-eye-slash"
            );

            icon.classList.add(
                "fa-eye"
            );

            button.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

});


/* ============================================================
   2. ERROR HELPER
   ============================================================ */

function showError(inputId, errorId, message) {

    const input =
        document.getElementById(inputId);

    const error =
        document.getElementById(errorId);


    if (input) {

        input.style.borderColor =
            message ? "#c0392b" : "";

    }


    if (error) {

        error.textContent =
            message || "";

    }

}


/* ============================================================
   3. LOGIN FORM
   ============================================================ */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            let valid = true;


            /* Email validation */

            if (!email) {

                showError(
                    "loginEmail",
                    "loginEmailError",
                    "Please enter your email address."
                );

                valid = false;

            } else if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ) {

                showError(
                    "loginEmail",
                    "loginEmailError",
                    "Please enter a valid email address."
                );

                valid = false;

            } else {

                showError(
                    "loginEmail",
                    "loginEmailError",
                    ""
                );

            }


            /* Password validation */

            if (!password) {

                showError(
                    "loginPassword",
                    "loginPasswordError",
                    "Please enter your password."
                );

                valid = false;

            } else {

                showError(
                    "loginPassword",
                    "loginPasswordError",
                    ""
                );

            }


            if (!valid) return;


            /*
             * ----------------------------------------------------
             * FRONTEND DEMO LOGIN
             * ----------------------------------------------------
             *
             * Later this section will send the credentials
             * to PHP:
             *
             * POST /backend/auth/login.php
             *
             * PHP will authenticate the user using SQL.
             *
             * ----------------------------------------------------
             */


            const storedUser =
                JSON.parse(
                    localStorage.getItem(
                        "farmhubUser"
                    )
                );


            if (storedUser) {

                redirectToDashboard(
                    storedUser.role
                );

            } else {

                /*
                 * No real backend exists yet.
                 * Send the user to role selection.
                 */

                window.location.href =
                    "role-selection.html";

            }

        }
    );

}


/* ============================================================
   4. REGISTRATION
   ============================================================ */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("fullName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim();

            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("registerPassword")
                    .value;

            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;

            const terms =
                document.getElementById("terms").checked;


            let valid = true;


            /* Name */

            if (name.length < 2) {

                showError(
                    "fullName",
                    "fullNameError",
                    "Please enter your full name."
                );

                valid = false;

            } else {

                showError(
                    "fullName",
                    "fullNameError",
                    ""
                );

            }


            /* Email */

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ) {

                showError(
                    "registerEmail",
                    "registerEmailError",
                    "Please enter a valid email."
                );

                valid = false;

            } else {

                showError(
                    "registerEmail",
                    "registerEmailError",
                    ""
                );

            }


            /* Phone */

            if (phone.length < 9) {

                showError(
                    "phone",
                    "phoneError",
                    "Please enter a valid phone number."
                );

                valid = false;

            } else {

                showError(
                    "phone",
                    "phoneError",
                    ""
                );

            }


            /* Password */

            if (password.length < 8) {

                showError(
                    "registerPassword",
                    "registerPasswordError",
                    "Password must contain at least 8 characters."
                );

                valid = false;

            } else {

                showError(
                    "registerPassword",
                    "registerPasswordError",
                    ""
                );

            }


            /* Confirm password */

            if (password !== confirmPassword) {

                showError(
                    "confirmPassword",
                    "confirmPasswordError",
                    "Passwords do not match."
                );

                valid = false;

            } else {

                showError(
                    "confirmPassword",
                    "confirmPasswordError",
                    ""
                );

            }


            /* Terms */

            if (!terms) {

                alert(
                    "Please agree to the Terms & Conditions."
                );

                valid = false;

            }


            if (!valid) return;


            /*
             * Save temporary frontend account.
             *
             * This is ONLY for UI development.
             *
             * Passwords must NEVER be stored this way
             * in the production system.
             */

            const user = {

                name: name,

                email: email,

                phone: phone,

                role: null

            };


            localStorage.setItem(
                "farmhubUser",
                JSON.stringify(user)
            );


            window.location.href =
                "role-selection.html";

        }
    );

}


/* ============================================================
   5. ROLE SELECTION
   ============================================================ */

const roleCards =
    document.querySelectorAll(".role-card");


roleCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const selectedRole =
            card.getAttribute("data-role");


        const storedUser =
            JSON.parse(
                localStorage.getItem(
                    "farmhubUser"
                )
            );


        const user =
            storedUser || {};


        user.role =
            selectedRole;


        localStorage.setItem(
            "farmhubUser",
            JSON.stringify(user)
        );


        redirectToDashboard(
            selectedRole
        );

    });

});


/* ============================================================
   6. DASHBOARD REDIRECTION
   ============================================================ */

function redirectToDashboard(role) {

    switch (role) {

        case "user":

            window.location.href =
                "../user/dashboard.html";

            break;


        case "farmer":

            window.location.href =
                "../farmer/dashboard.html";

            break;


        case "vet":

            window.location.href =
                "../vet/dashboard.html";

            break;


        case "admin":

            window.location.href =
                "../admin/dashboard.html";

            break;


        default:

            window.location.href =
                "role-selection.html";

    }

}