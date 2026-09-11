/* =========================================================
   FARMHUB MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. SELECT NAVIGATION ELEMENTS
   ========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainNavigation =
    document.getElementById("mainNavigation");


/* =========================================================
   2. MOBILE NAVIGATION
   ========================================================= */

if (menuToggle && mainNavigation) {


    /* -----------------------------------------------------
       OPEN / CLOSE MOBILE MENU
       ----------------------------------------------------- */

    menuToggle.addEventListener("click", function () {


        /* Toggle the active class */

        const isOpen =
            mainNavigation.classList.toggle("active");


        /* -------------------------------------------------
           Update accessibility state
           ------------------------------------------------- */

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );


        /* -------------------------------------------------
           Update button description
           ------------------------------------------------- */

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /* =====================================================
       3. CLOSE MENU AFTER CLICKING A LINK
       ===================================================== */

    const navigationLinks =
        mainNavigation.querySelectorAll(".nav-link");


    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {


            /* Close navigation */

            mainNavigation.classList.remove("active");


            /* Reset accessibility state */

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            /* Reset button label */

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    /* =====================================================
       4. CLOSE MENU WITH ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {


            /* Close navigation */

            mainNavigation.classList.remove("active");


            /* Reset accessibility state */

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            /* Reset button label */

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });

}


/* =========================================================
   5. AUTOMATIC FOOTER YEAR
   ========================================================= */

const footerText =
    document.querySelector(".footer-bottom p");


if (footerText) {


    /* Get current year */

    const currentYear =
        new Date().getFullYear();


    /* Update footer */

    footerText.innerHTML =
        `&copy; ${currentYear} FarmHub. All rights reserved.`;

}