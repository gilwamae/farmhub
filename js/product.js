/* =========================================================
   FARMHUB - PRODUCTS / MARKETPLACE
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const productsGrid =
    document.getElementById("productsGrid");

const productSearch =
    document.getElementById("productSearch");

const productCount =
    document.getElementById("productCount");

const sortProducts =
    document.getElementById("sortProducts");

const minPrice =
    document.getElementById("minPrice");

const maxPrice =
    document.getElementById("maxPrice");

const locationFilter =
    document.getElementById("locationFilter");

const ratingFilter =
    document.getElementById("ratingFilter");

const clearFilters =
    document.getElementById("clearFilters");

const resetProducts =
    document.getElementById("resetProducts");

const noProducts =
    document.getElementById("noProducts");


/* =========================================================
   CURRENT FILTER STATE
   ========================================================= */

let currentCategory = "all";


/* =========================================================
   GET CATEGORY FROM URL
   ========================================================= */

const urlParams = new URLSearchParams(
    window.location.search
);

const categoryFromURL =
    urlParams.get("category");


/* =========================================================
   APPLY URL CATEGORY
   ========================================================= */

if (categoryFromURL) {

    const categoryInput = document.querySelector(
        `input[name="category"][value="${categoryFromURL}"]`
    );

    if (categoryInput) {

        categoryInput.checked = true;

        currentCategory = categoryFromURL;

    }

}


/* =========================================================
   GET SELECTED CATEGORY
   ========================================================= */

function getSelectedCategory() {

    const selected =
        document.querySelector(
            'input[name="category"]:checked'
        );

    return selected
        ? selected.value
        : "all";
}


/* =========================================================
   FILTER PRODUCTS
   ========================================================= */

function getFilteredProducts() {

    let products = [...farmHubProducts];


    /* SEARCH */

    const search =
        productSearch.value
            .trim()
            .toLowerCase();


    if (search) {

        products = products.filter(product => {

            return (
                product.name.toLowerCase().includes(search) ||

                product.categoryName
                    .toLowerCase()
                    .includes(search) ||

                product.farmer
                    .toLowerCase()
                    .includes(search) ||

                product.location
                    .toLowerCase()
                    .includes(search)
            );

        });

    }


    /* CATEGORY */

    currentCategory =
        getSelectedCategory();


    if (currentCategory !== "all") {

        products = products.filter(product => {

            return product.category === currentCategory;

        });

    }


    /* MIN PRICE */

    const minimum =
        Number(minPrice.value);


    if (minPrice.value !== "") {

        products = products.filter(product => {

            return product.price >= minimum;

        });

    }


    /* MAX PRICE */

    const maximum =
        Number(maxPrice.value);


    if (maxPrice.value !== "") {

        products = products.filter(product => {

            return product.price <= maximum;

        });

    }


    /* LOCATION */

    const location =
        locationFilter.value;


    if (location !== "all") {

        products = products.filter(product => {

            return product.location === location;

        });

    }


    /* RATING */

    const rating =
        Number(ratingFilter.value);


    if (rating > 0) {

        products = products.filter(product => {

            return product.rating >= rating;

        });

    }


    /* SORT */

    switch (sortProducts.value) {

        case "price-low":

            products.sort(
                (a, b) => a.price - b.price
            );

            break;


        case "price-high":

            products.sort(
                (a, b) => b.price - a.price
            );

            break;


        case "rating":

            products.sort(
                (a, b) => b.rating - a.rating
            );

            break;


        case "name":

            products.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );

            break;

    }


    return products;

}


/* =========================================================
   CREATE STAR RATING
   ========================================================= */

function createStars(rating) {

    let stars = "";

    const rounded =
        Math.round(rating);


    for (let i = 1; i <= 5; i++) {

        if (i <= rounded) {

            stars +=
                '<i class="fa-solid fa-star"></i>';

        } else {

            stars +=
                '<i class="fa-regular fa-star"></i>';

        }

    }


    return stars;

}


/* =========================================================
   RENDER PRODUCTS
   ========================================================= */

function renderProducts() {

    const products =
        getFilteredProducts();


    productsGrid.innerHTML = "";


    productCount.textContent =
        `${products.length} product${products.length !== 1 ? "s" : ""}`;


    if (products.length === 0) {

        noProducts.hidden = false;

        return;

    }


    noProducts.hidden = true;


    products.forEach(product => {

        const card =
            document.createElement("article");


        card.className =
            "product-card";


        if (product.stock <= 0) {

            card.classList.add("out-of-stock");

        }


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="product-badge">
                    ${product.categoryName}
                </span>

                <button
                    type="button"
                    class="product-wishlist"
                    aria-label="Add ${product.name} to wishlist"
                    data-product-id="${product.id}"
                >
                    <i class="fa-regular fa-heart"></i>
                </button>

            </div>


            <div class="product-content">

                <span class="product-category">
                    ${product.categoryName}
                </span>


                <h2 class="product-name">

                    <a
                        href="product-details.html?id=${product.id}"
                    >
                        ${product.name}
                    </a>

                </h2>


                <p class="product-farmer">

                    <i class="fa-solid fa-location-dot"></i>

                    ${product.farmer}
                    ·
                    ${product.location}

                </p>


                <div class="product-rating">

                    <span class="stars">
                        ${createStars(product.rating)}
                    </span>

                    <span>
                        ${product.rating}
                        (${product.reviews})
                    </span>

                </div>


                <div class="product-bottom">

                    <div class="product-price">

                        KSh ${product.price.toLocaleString()}

                        <span class="product-unit">
                            ${product.unit}
                        </span>

                    </div>


                    <button
                        type="button"
                        class="add-cart-btn"
                        data-product-id="${product.id}"
                        aria-label="Add ${product.name} to cart"
                        ${product.stock <= 0 ? "disabled" : ""}
                    >

                        <i class="fa-solid fa-cart-plus"></i>

                    </button>

                </div>

            </div>

        `;


        productsGrid.appendChild(card);

    });

}


/* =========================================================
   ADD PRODUCT TO CART
   ========================================================= */

function addToCart(productId) {

    const product =
        farmHubProducts.find(
            item => item.id === productId
        );


    if (!product || product.stock <= 0) {

        return;

    }


    let cart =
        JSON.parse(
            localStorage.getItem("farmHubCart")
        ) || [];


    const existingItem =
        cart.find(
            item => item.id === productId
        );


    if (existingItem) {

        if (existingItem.quantity < product.stock) {

            existingItem.quantity++;

        }

    } else {

        cart.push({

            id: product.id,

            quantity: 1

        });

    }


    localStorage.setItem(
        "farmHubCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    showCartMessage(
        `${product.name} added to cart`
    );

}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("farmHubCart")
        ) || [];


    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document
        .querySelectorAll(".cart-count")
        .forEach(element => {

            element.textContent =
                totalQuantity;

        });

}


/* =========================================================
   SMALL CART MESSAGE
   ========================================================= */

function showCartMessage(message) {

    const notification =
        document.createElement("div");


    notification.className =
        "cart-notification";


    notification.textContent =
        message;


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.classList.add(
            "show"
        );

    }, 10);


    setTimeout(() => {

        notification.remove();

    }, 2500);

}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

productSearch.addEventListener(
    "input",
    renderProducts
);


minPrice.addEventListener(
    "input",
    renderProducts
);


maxPrice.addEventListener(
    "input",
    renderProducts
);


locationFilter.addEventListener(
    "change",
    renderProducts
);


ratingFilter.addEventListener(
    "change",
    renderProducts
);


sortProducts.addEventListener(
    "change",
    renderProducts
);


document
    .querySelectorAll('input[name="category"]')
    .forEach(input => {

        input.addEventListener(
            "change",
            renderProducts
        );

    });


/* =========================================================
   ADD TO CART EVENT DELEGATION
   ========================================================= */

productsGrid.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".add-cart-btn"
            );


        if (!button) {

            return;

        }


        const productId =
            Number(
                button.dataset.productId
            );


        addToCart(productId);

    }
);


/* =========================================================
   CLEAR FILTERS
   ========================================================= */

function clearAllFilters() {

    document
        .querySelector(
            'input[name="category"][value="all"]'
        )
        .checked = true;


    productSearch.value = "";

    minPrice.value = "";

    maxPrice.value = "";

    locationFilter.value = "all";

    ratingFilter.value = "0";

    sortProducts.value = "default";


    renderProducts();

}


clearFilters.addEventListener(
    "click",
    clearAllFilters
);


resetProducts.addEventListener(
    "click",
    clearAllFilters
);


/* =========================================================
   INITIALIZE
   ========================================================= */

renderProducts();

updateCartCount();