/* =========================================================
   FARMHUB - PRODUCT DETAILS
   ========================================================= */


/* =========================================================
   GET PRODUCT ID
   ========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const productId =
    Number(params.get("id"));


/* =========================================================
   FIND PRODUCT
   ========================================================= */

const product =
    farmHubProducts.find(
        item => item.id === productId
    );


const productDetails =
    document.getElementById(
        "productDetails"
    );


const relatedProducts =
    document.getElementById(
        "relatedProducts"
    );


/* =========================================================
   HANDLE INVALID PRODUCT
   ========================================================= */

if (!product) {

    productDetails.innerHTML = `

        <div class="no-products">

            <div class="no-products-icon">

                <i class="fa-solid fa-box-open"></i>

            </div>

            <h2>
                Product Not Found
            </h2>

            <p>
                The product you are looking for could not be found.
            </p>

            <a
                href="products.html"
                class="btn btn-primary"
            >
                Browse Products
            </a>

        </div>

    `;

} else {

    renderProduct();

    renderRelatedProducts();

}


/* =========================================================
   STAR RATING
   ========================================================= */

function createStars(rating) {

    let stars = "";

    const rounded =
        Math.round(rating);


    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        stars += i <= rounded
            ? '<i class="fa-solid fa-star"></i>'
            : '<i class="fa-regular fa-star"></i>';

    }


    return stars;

}


/* =========================================================
   RENDER PRODUCT
   ========================================================= */

function renderProduct() {

    productDetails.innerHTML = `

        <div class="details-image">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

        </div>


        <div class="details-info">

            <span class="details-category">
                ${product.categoryName}
            </span>


            <h1>
                ${product.name}
            </h1>


            <div class="details-rating">

                <span class="stars">
                    ${createStars(product.rating)}
                </span>

                <span>
                    ${product.rating}
                    ·
                    ${product.reviews} reviews
                </span>

            </div>


            <div class="details-price">
                KSh ${product.price.toLocaleString()}
            </div>


            <div class="details-unit">
                ${product.unit}
            </div>


            <p class="details-description">
                ${product.description}
            </p>


            <div class="farm-info">

                <div class="farm-info-icon">

                    <i class="fa-solid fa-tractor"></i>

                </div>

                <div>

                    <strong>
                        ${product.farmer}
                    </strong>

                    <span>
                        ${product.location}
                    </span>

                </div>

            </div>


            <div class="purchase-area">

                <div class="quantity-control">

                    <button
                        type="button"
                        id="decreaseQuantity"
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>

                    <input
                        type="number"
                        id="productQuantity"
                        value="1"
                        min="1"
                        max="${product.stock}"
                    >

                    <button
                        type="button"
                        id="increaseQuantity"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>

                </div>


                <button
                    type="button"
                    class="add-details-cart"
                    id="addDetailsCart"
                >

                    <i class="fa-solid fa-cart-plus"></i>

                    Add to Cart

                </button>

            </div>

        </div>

    `;


    setupQuantity();

    setupAddToCart();

}


/* =========================================================
   QUANTITY
   ========================================================= */

function setupQuantity() {

    const quantity =
        document.getElementById(
            "productQuantity"
        );


    document
        .getElementById("decreaseQuantity")
        .addEventListener(
            "click",
            () => {

                const value =
                    Number(quantity.value);


                if (value > 1) {

                    quantity.value =
                        value - 1;

                }

            }
        );


    document
        .getElementById("increaseQuantity")
        .addEventListener(
            "click",
            () => {

                const value =
                    Number(quantity.value);


                if (value < product.stock) {

                    quantity.value =
                        value + 1;

                }

            }
        );

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function setupAddToCart() {

    document
        .getElementById("addDetailsCart")
        .addEventListener(
            "click",
            () => {

                const quantity =
                    Number(
                        document.getElementById(
                            "productQuantity"
                        ).value
                    );


                let cart =
                    JSON.parse(
                        localStorage.getItem(
                            "farmHubCart"
                        )
                    ) || [];


                const existing =
                    cart.find(
                        item =>
                            item.id === product.id
                    );


                if (existing) {

                    existing.quantity =
                        Math.min(
                            existing.quantity + quantity,
                            product.stock
                        );

                } else {

                    cart.push({

                        id: product.id,

                        quantity: quantity

                    });

                }


                localStorage.setItem(
                    "farmHubCart",
                    JSON.stringify(cart)
                );


                updateCartCount();


                window.location.href =
                    "cart.html";

            }
        );

}


/* =========================================================
   RELATED PRODUCTS
   ========================================================= */

function renderRelatedProducts() {

    const related =
        farmHubProducts
            .filter(item =>
                item.category === product.category &&
                item.id !== product.id
            )
            .slice(0, 4);


    relatedProducts.innerHTML =
        related.map(item => `

            <article class="related-card">

                <a
                    href="product-details.html?id=${item.id}"
                >

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        loading="lazy"
                    >

                    <div class="related-card-content">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            KSh ${item.price.toLocaleString()}
                        </p>

                    </div>

                </a>

            </article>

        `).join("");

}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "farmHubCart"
            )
        ) || [];


    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document
        .querySelectorAll(".cart-count")
        .forEach(element => {

            element.textContent =
                count;

        });

}


updateCartCount();