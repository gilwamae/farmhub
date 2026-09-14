/* =========================================================
   FARMHUB - HOW IT WORKS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CUSTOMER STEP INTERACTION
       ===================================================== */

    const stepCards = document.querySelectorAll(".step-card");


    stepCards.forEach((card) => {

        card.addEventListener("click", () => {

            /*
             * Remove the active state from all cards.
             */

            stepCards.forEach((item) => {
                item.classList.remove("step-active");
            });


            /*
             * Add the active state to the card
             * selected by the user.
             */

            card.classList.add("step-active");

        });

    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
       ===================================================== */

    stepCards.forEach((card) => {

        card.setAttribute("tabindex", "0");

        card.addEventListener("keydown", (event) => {

            /*
             * Allow Enter or Space to activate a step.
             */

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                card.click();

            }

        });

    });

});