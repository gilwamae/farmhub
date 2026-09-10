/* =========================================================
   FARMHUB MAIN JAVASCRIPT
   File: main.js

   Purpose:
   Global frontend interactions.

   Current functionality:
   - Mobile navigation
   - Navigation closing
   - Outside-click detection
   ========================================================= */


/* =========================================================
   1. SELECT NAVIGATION ELEMENTS
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");


/* =========================================================
   2. MOBILE MENU
   ========================================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

}


/* =========================================================
   3. CLOSE MENU WHEN LINK IS CLICKED
   ========================================================= */

const navLinks = document.querySelectorAll(".nav-link");


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navMenu || !menuToggle) {
            return;
        }


        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================================================
   4. CLOSE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener("click", (event) => {

    if (!navMenu || !menuToggle) {
        return;
    }


    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);


    if (
        navMenu.classList.contains("active") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});