/* =========================================================
   FARMHUB PUBLIC PAGES JAVASCRIPT
   =========================================================

   Handles:

   1. Mobile navigation
   2. Farmer search/filter
   3. Veterinarian search/filter
   4. Contact form demonstration
   5. Small page interactions

   IMPORTANT:

   The search/filter data is currently frontend demo data.

   Later, PHP + SQL can provide the real farmers,
   veterinarians and services.

   ========================================================= */


/* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNavigation = document.getElementById("mainNavigation");


if (menuToggle && mainNavigation) {

    menuToggle.addEventListener("click", function () {

        const isOpen =
            mainNavigation.classList.toggle("mobile-open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    /*
       Close the menu after clicking a navigation link.
    */

    const navigationLinks =
        mainNavigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mainNavigation.classList.remove("mobile-open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   2. FARMER DIRECTORY FILTER
   ========================================================= */

const farmerSearch =
    document.getElementById("farmerSearch");

const farmerLocation =
    document.getElementById("farmerLocation");

const farmType =
    document.getElementById("farmType");

const farmersGrid =
    document.getElementById("farmersGrid");

const farmerNoResults =
    document.getElementById("farmerNoResults");


if (
    farmerSearch &&
    farmerLocation &&
    farmType &&
    farmersGrid
) {

    const farmerCards =
        farmersGrid.querySelectorAll(".farmer-card");


    function filterFarmers() {

        const searchValue =
            farmerSearch.value
                .toLowerCase()
                .trim();

        const locationValue =
            farmerLocation.value;

        const typeValue =
            farmType.value;

        let visibleCount = 0;


        farmerCards.forEach(function (card) {

            const name =
                card.dataset.name
                    .toLowerCase();

            const location =
                card.dataset.location;

            const type =
                card.dataset.type;


            const matchesSearch =
                name.includes(searchValue);

            const matchesLocation =
                locationValue === "all" ||
                location === locationValue;

            const matchesType =
                typeValue === "all" ||
                type === typeValue;


            if (
                matchesSearch &&
                matchesLocation &&
                matchesType
            ) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        /*
           Display the no-results message when
           no farmer matches the selected filters.
        */

        if (farmerNoResults) {

            farmerNoResults.hidden =
                visibleCount !== 0;

        }

    }


    farmerSearch.addEventListener(
        "input",
        filterFarmers
    );


    farmerLocation.addEventListener(
        "change",
        filterFarmers
    );


    farmType.addEventListener(
        "change",
        filterFarmers
    );

}


/* =========================================================
   3. VETERINARIAN DIRECTORY FILTER
   ========================================================= */

const veterinarianSearch =
    document.getElementById("veterinarianSearch");

const veterinarianLocation =
    document.getElementById("veterinarianLocation");

const veterinarianSpecialization =
    document.getElementById("veterinarianSpecialization");

const veterinariansGrid =
    document.getElementById("veterinariansGrid");

const veterinarianNoResults =
    document.getElementById("veterinarianNoResults");


if (
    veterinarianSearch &&
    veterinarianLocation &&
    veterinarianSpecialization &&
    veterinariansGrid
) {

    const veterinarianCards =
        veterinariansGrid.querySelectorAll(
            ".veterinarian-card"
        );


    function filterVeterinarians() {

        const searchValue =
            veterinarianSearch.value
                .toLowerCase()
                .trim();

        const locationValue =
            veterinarianLocation.value;

        const specializationValue =
            veterinarianSpecialization.value;

        let visibleCount = 0;


        veterinarianCards.forEach(function (card) {

            const name =
                card.dataset.name
                    .toLowerCase();

            const location =
                card.dataset.location;

            const specialization =
                card.dataset.specialization;


            const matchesSearch =
                name.includes(searchValue);

            const matchesLocation =
                locationValue === "all" ||
                location === locationValue;

            const matchesSpecialization =
                specializationValue === "all" ||
                specialization === specializationValue;


            if (
                matchesSearch &&
                matchesLocation &&
                matchesSpecialization
            ) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (veterinarianNoResults) {

            veterinarianNoResults.hidden =
                visibleCount !== 0;

        }

    }


    veterinarianSearch.addEventListener(
        "input",
        filterVeterinarians
    );


    veterinarianLocation.addEventListener(
        "change",
        filterVeterinarians
    );


    veterinarianSpecialization.addEventListener(
        "change",
        filterVeterinarians
    );

}


/* =========================================================
   4. CONTACT FORM
   ========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            /*
               Stop the browser from actually submitting.

               This is temporary because the PHP backend
               has not been connected yet.
            */

            event.preventDefault();


            if (formMessage) {

                formMessage.textContent =
                    "Thank you. Your message has been received. Our team will get back to you.";

                formMessage.classList.add("show");

            }


            contactForm.reset();

        }
    );

}


/* =========================================================
   5. CURRENT YEAR
   ========================================================= */

const currentYearElements =
    document.querySelectorAll(".current-year");


currentYearElements.forEach(function (element) {

    element.textContent =
        new Date().getFullYear();

});