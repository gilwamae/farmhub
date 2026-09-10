/* =========================================================
   FARMHUB PRODUCTS JAVASCRIPT
   File: products.js

   Purpose:
   - Product search
   - Category filtering
   - Product sorting

   IMPORTANT:
   This currently works with static HTML product data.

   FUTURE BACKEND:
   PHP + MySQL will eventually provide:
   - Product names
   - Prices
   - Categories
   - Images
   - Inventory
   - Farmer information
   - Veterinary clearance
   - Product availability
   ========================================================= */


/* =========================================================
   1. SELECT ELEMENTS
   ========================================================= */

const productSearch =
    document.getElementById("productSearch");

const sortProducts =
    document.getElementById("sortProducts");

const categoryFilters =
    document.querySelectorAll(".category-filter");

const productsGrid =
    document.getElementById("productsGrid");

const productCount =
    document.getElementById("productCount");

const noProducts =
    document.getElementById("noProducts");


/* =========================================================
   2. PRODUCT DATA
   ========================================================= */

/*
    CURRENT:

    Products are represented by the HTML elements.

    FUTURE SQL:

    These products will eventually come from MySQL.

    Example PHP:

    $query = "
        SELECT
            p.product_id,
            p.name,
            p.price,
            p.category_id,
            p.image,
            p.stock_quantity,
            p.clearance_status,
            f.farm_name
        FROM products p
        JOIN farms f
            ON p.farm_id = f.farm_id
        WHERE p.status = 'active'
    ";

    PHP would then send the data to the frontend.
*/


let currentCategory = "all";


/* =========================================================
   3. GET PRODUCT CARDS
   ========================================================= */

function getProductCards() {

    return Array.from(
        productsGrid.querySelectorAll(
            ".shop-product-card"
        )
    );

}


/* =========================================================
   4. FILTER PRODUCTS
   ========================================================= */

function filterProducts() {

    const searchTerm =
        productSearch.value
            .trim()
            .toLowerCase();


    const products =
        getProductCards();


    let visibleProducts = [];


    products.forEach((product) => {

        const category =
            product.dataset.category;

        const name =
            product.dataset.name
                .toLowerCase();


        const matchesCategory =
            currentCategory === "all" ||
            category === currentCategory;


        const matchesSearch =
            name.includes(searchTerm);


        const shouldShow =
            matchesCategory &&
            matchesSearch;


        product.classList.toggle(
            "hidden",
            !shouldShow
        );


        if (shouldShow) {

            visibleProducts.push(product);

        }

    });


    updateProductCount(
        visibleProducts.length
    );


    noProducts.hidden =
        visibleProducts.length !== 0;

}


/* =========================================================
   5. UPDATE PRODUCT COUNT
   ========================================================= */

function updateProductCount(count) {

    productCount.textContent =
        `${count} product${count === 1 ? "" : "s"} available`;

}


/* =========================================================
   6. CATEGORY FILTERS
   ========================================================= */

categoryFilters.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            categoryFilters.forEach(
                (filter) => {

                    filter.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add("active");


            currentCategory =
                button.dataset.category;


            filterProducts();

        }
    );

});


/* =========================================================
   7. SEARCH
   ========================================================= */

if (productSearch) {

    productSearch.addEventListener(
        "input",
        filterProducts
    );

}


/* =========================================================
   8. SORT PRODUCTS
   ========================================================= */

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        () => {

            const products =
                getProductCards();


            const sortValue =
                sortProducts.value;


            products.sort(
                (a, b) => {

                    const priceA =
                        Number(
                            a.dataset.price
                        );

                    const priceB =
                        Number(
                            b.dataset.price
                        );


                    const nameA =
                        a.dataset.name;


                    const nameB =
                        b.dataset.name;


                    if (
                        sortValue ===
                        "price-low"
                    ) {

                        return priceA - priceB;

                    }


                    if (
                        sortValue ===
                        "price-high"
                    ) {

                        return priceB - priceA;

                    }


                    if (
                        sortValue ===
                        "name"
                    ) {

                        return nameA.localeCompare(
                            nameB
                        );

                    }


                    return 0;

                }
            );


            products.forEach(
                (product) => {

                    productsGrid.appendChild(
                        product
                    );

                }
            );


            filterProducts();

        }
    );

}


/* =========================================================
   9. INITIALIZE PRODUCTS
   ========================================================= */

filterProducts();