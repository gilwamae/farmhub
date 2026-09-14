/* =========================================================
   FARMHUB PRODUCT CATEGORIES
   FILTERING + SEARCH + SORTING
   ========================================================= */


/* =========================================================
   1. GET PAGE ELEMENTS
   ========================================================= */

const categoryGrid = document.getElementById("categoryGrid");

const categoryCards = Array.from(
    document.querySelectorAll(".category-card")
);

const categorySearch =
    document.getElementById("categorySearch");

const categoryType =
    document.getElementById("categoryType");

const categorySort =
    document.getElementById("categorySort");

const clearFilters =
    document.getElementById("clearFilters");

const resetResults =
    document.getElementById("resetResults");

const categoryCount =
    document.getElementById("categoryCount");

const noResults =
    document.getElementById("noResults");


/* =========================================================
   2. UPDATE CATEGORY COUNT
   ========================================================= */

function updateCategoryCount(count) {

    if (count === 1) {

        categoryCount.textContent =
            "Showing 1 category";

    } else {

        categoryCount.textContent =
            `Showing ${count} categories`;

    }

}


/* =========================================================
   3. FILTER CATEGORIES
   ========================================================= */

function filterCategories() {

    /* -----------------------------------------------------
       Get the current search value.

       trim() removes unnecessary spaces.
       toLowerCase() makes searching case-insensitive.
       ----------------------------------------------------- */

    const searchValue =
        categorySearch.value
            .trim()
            .toLowerCase();


    /* -----------------------------------------------------
       Get selected category type.
       ----------------------------------------------------- */

    const selectedType =
        categoryType.value;


    let visibleCount = 0;


    /* -----------------------------------------------------
       Check every category card.
       ----------------------------------------------------- */

    categoryCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const type =
            card.dataset.type;


        /* -------------------------------------------------
           Search condition
           ------------------------------------------------- */

        const matchesSearch =
            name.includes(searchValue);


        /* -------------------------------------------------
           Category type condition
           ------------------------------------------------- */

        const matchesType =
            selectedType === "all" ||
            type === selectedType;


        /* -------------------------------------------------
           Final visibility condition
           ------------------------------------------------- */

        const shouldShow =
            matchesSearch && matchesType;


        if (shouldShow) {

            card.classList.remove("is-hidden");

            visibleCount++;

        } else {

            card.classList.add("is-hidden");

        }

    });


    /* -----------------------------------------------------
       Update number of visible categories.
       ----------------------------------------------------- */

    updateCategoryCount(visibleCount);


    /* -----------------------------------------------------
       Show or hide the no-results message.
       ----------------------------------------------------- */

    if (visibleCount === 0) {

        noResults.hidden = false;

        categoryGrid.style.display = "none";

    } else {

        noResults.hidden = true;

        categoryGrid.style.display = "grid";

    }

}


/* =========================================================
   4. SORT CATEGORIES
   ========================================================= */

function sortCategories() {

    const sortValue =
        categorySort.value;


    /* -----------------------------------------------------
       Create a new array so we don't destroy the original
       categoryCards array.
       ----------------------------------------------------- */

    const sortedCards = [...categoryCards];


    /* -----------------------------------------------------
       SORT A - Z
       ----------------------------------------------------- */

    if (sortValue === "az") {

        sortedCards.sort((a, b) => {

            const nameA =
                a.dataset.name.toLowerCase();

            const nameB =
                b.dataset.name.toLowerCase();

            return nameA.localeCompare(nameB);

        });

    }


    /* -----------------------------------------------------
       SORT Z - A
       ----------------------------------------------------- */

    if (sortValue === "za") {

        sortedCards.sort((a, b) => {

            const nameA =
                a.dataset.name.toLowerCase();

            const nameB =
                b.dataset.name.toLowerCase();

            return nameB.localeCompare(nameA);

        });

    }


    /* -----------------------------------------------------
       MOST PRODUCTS
       ----------------------------------------------------- */

    if (sortValue === "products-high") {

        sortedCards.sort((a, b) => {

            return (
                Number(b.dataset.products) -
                Number(a.dataset.products)
            );

        });

    }


    /* -----------------------------------------------------
       FEWEST PRODUCTS
       ----------------------------------------------------- */

    if (sortValue === "products-low") {

        sortedCards.sort((a, b) => {

            return (
                Number(a.dataset.products) -
                Number(b.dataset.products)
            );

        });

    }


    /* -----------------------------------------------------
       Put the sorted cards back into the grid.
       ----------------------------------------------------- */

    sortedCards.forEach(card => {

        categoryGrid.appendChild(card);

    });


    /* -----------------------------------------------------
       Apply filters again after sorting.
       ----------------------------------------------------- */

    filterCategories();

}


/* =========================================================
   5. CLEAR ALL FILTERS
   ========================================================= */

function clearAllFilters() {

    categorySearch.value = "";

    categoryType.value = "all";

    categorySort.value = "default";


    /* -----------------------------------------------------
       Put cards back into their original order.
       ----------------------------------------------------- */

    categoryCards.forEach(card => {

        categoryGrid.appendChild(card);

    });


    filterCategories();

}


/* =========================================================
   6. SEARCH EVENT
   ========================================================= */

categorySearch.addEventListener(
    "input",
    filterCategories
);


/* =========================================================
   7. CATEGORY TYPE EVENT
   ========================================================= */

categoryType.addEventListener(
    "change",
    filterCategories
);


/* =========================================================
   8. SORT EVENT
   ========================================================= */

categorySort.addEventListener(
    "change",
    sortCategories
);


/* =========================================================
   9. CLEAR FILTER BUTTON
   ========================================================= */

clearFilters.addEventListener(
    "click",
    clearAllFilters
);


/* =========================================================
   10. NO RESULTS RESET BUTTON
   ========================================================= */

resetResults.addEventListener(
    "click",
    clearAllFilters
);


/* =========================================================
   11. INITIAL PAGE STATE
   ========================================================= */

filterCategories();