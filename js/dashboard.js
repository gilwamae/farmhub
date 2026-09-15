/* ================================================================
   FARMHUB ADMIN DASHBOARD JAVASCRIPT
   dashboard.js
   ================================================================ */


/* ================================================================
   1. GET ELEMENTS
   ================================================================ */

const adminSidebar = document.getElementById("adminSidebar");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const sidebarClose =
    document.getElementById("sidebarClose");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const logoutButton =
    document.getElementById("logoutButton");


/* ================================================================
   2. OPEN SIDEBAR
   ================================================================ */

function openSidebar() {

    if (!adminSidebar) {
        return;
    }

    adminSidebar.classList.add("open");

    if (sidebarOverlay) {
        sidebarOverlay.classList.add("active");
    }

    document.body.style.overflow = "hidden";

}


/* ================================================================
   3. CLOSE SIDEBAR
   ================================================================ */

function closeSidebar() {

    if (!adminSidebar) {
        return;
    }

    adminSidebar.classList.remove("open");

    if (sidebarOverlay) {
        sidebarOverlay.classList.remove("active");
    }

    document.body.style.overflow = "";

}


/* ================================================================
   4. MOBILE MENU
   ================================================================ */

if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        openSidebar
    );

}


/* ================================================================
   5. CLOSE BUTTON
   ================================================================ */

if (sidebarClose) {

    sidebarClose.addEventListener(
        "click",
        closeSidebar
    );

}


/* ================================================================
   6. OVERLAY CLICK
   ================================================================ */

if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );

}


/* ================================================================
   7. CLOSE SIDEBAR WHEN NAVIGATION LINK IS CLICKED
   ================================================================ */

const sidebarLinks =
    document.querySelectorAll(".sidebar-navigation .nav-link");


sidebarLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (window.innerWidth <= 800) {

            closeSidebar();

        }

    });

});


/* ================================================================
   8. CLOSE SIDEBAR WHEN WINDOW BECOMES LARGE
   ================================================================ */

window.addEventListener("resize", function () {

    if (window.innerWidth > 800) {

        closeSidebar();

    }

});


/* ================================================================
   9. LOGOUT
   ================================================================ */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            const confirmLogout =
                window.confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {
                return;
            }


            /*
             * FRONTEND DEMO SESSION
             *
             * When PHP authentication is implemented,
             * this section will be replaced with a secure
             * server-side logout request.
             */

            localStorage.removeItem("farmhubSession");


            window.location.href =
                "../pages/login.html";

        }
    );

}


/* ================================================================
   10. ACTIVE NAVIGATION
   ================================================================ */

const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


sidebarLinks.forEach(function (link) {

    const linkPage =
        link.getAttribute("href")
            ?.split("/")
            .pop()
            .toLowerCase();


    if (linkPage === currentPage) {

        sidebarLinks.forEach(function (item) {

            item.classList.remove("active");

        });


        link.classList.add("active");

    }

});


/* ================================================================
   11. DEMO SALES PERIOD
   ================================================================ */

const salesPeriod =
    document.getElementById("salesPeriod");


if (salesPeriod) {

    salesPeriod.addEventListener(
        "change",
        function () {

            console.log(
                "Selected period:",
                salesPeriod.value
            );

            /*
             * Later this will request real analytics
             * from the PHP/SQL backend.
             */

        }
    );

}