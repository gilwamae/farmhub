/* =========================================================
   FARMHUB PRODUCT DETAILS
   File: product-details.js

   Current responsibilities:
   - Increase quantity
   - Decrease quantity
   - Validate quantity
   - Add product to local cart

   IMPORTANT:
   This is temporary frontend functionality.

   FUTURE BACKEND:
   PHP + MySQL will eventually handle:
   - Product validation
   - Stock validation
   - User authentication
   - Cart persistence
   - Order creation
   - Veterinary clearance verification
   ========================================================= */


/* =========================================================
   1. PRODUCT INFORMATION
   ========================================================= */

/*
    CURRENT:

    Product information is manually defined.

    FUTURE:

    PHP will provide this information from MySQL.

    Example database query:

    SELECT
        product_id,
        farmer_id,
        category_id,
        name,
        description,
        price,
        stock_quantity,
        image,
        clearance_status
    FROM products
    WHERE product_id = ?;
*/

const product = {

    id: 1,

    name: "Fresh Whole Milk",

    price: 120,

    maxQuantity: 24,

    category: "milk"

};


/* =========================================================
   2. SELECT ELEMENTS
   ========================================================= */

const quantityInput =
    document.getElementById(
        "productQuantity"
    );

const decreaseButton =
    document.getElementById(
        "decreaseQuantity"
    );

const increaseButton =
    document.getElementById(
        "increaseQuantity"
    );

const addToCartButton =
    document.getElementById(
        "addToCart"
    );


/* =========================================================
   3. UPDATE QUANTITY
   ========================================================= */

function updateQuantity(newQuantity) {

    const quantity =
        Math.min(
            Math.max(newQuantity, 1),
            product.maxQuantity
        );


    quantityInput.value =
        quantity;

}


/* =========================================================
   4. DECREASE QUANTITY
   ========================================================= */

if (decreaseButton) {

    decreaseButton.addEventListener(
        "click",
        () => {

            const currentQuantity =
                Number(
                    quantityInput.value
                );


            updateQuantity(
                currentQuantity - 1
            );

        }
    );

}


/* =========================================================
   5. INCREASE QUANTITY
   ========================================================= */

if (increaseButton) {

    increaseButton.addEventListener(
        "click",
        () => {

            const currentQuantity =
                Number(
                    quantityInput.value
                );


            updateQuantity(
                currentQuantity + 1
            );

        }
    );

}


/* =========================================================
   6. MANUAL QUANTITY INPUT
   ========================================================= */

if (quantityInput) {

    quantityInput.addEventListener(
        "change",
        () => {

            const quantity =
                Number(
                    quantityInput.value
                );


            updateQuantity(quantity);

        }
    );

}


/* =========================================================
   7. ADD PRODUCT TO CART
   ========================================================= */

if (addToCartButton) {

    addToCartButton.addEventListener(
        "click",
        () => {

            const quantity =
                Number(
                    quantityInput.value
                );


            if (
                quantity < 1 ||
                quantity > product.maxQuantity
            ) {

                alert(
                    "Please select a valid quantity."
                );

                return;

            }


            /*
                =================================================
                TEMPORARY CART
                =================================================

                localStorage is being used while we are
                building the frontend.

                Later this will become:

                User
                    ↓
                PHP
                    ↓
                MySQL
                    ↓
                cart_items
            */


            const cart =
                JSON.parse(
                    localStorage.getItem(
                        "farmhubCart"
                    )
                ) || [];


            /* Check whether product already exists */

            const existingProduct =
                cart.find(
                    (item) =>
                        item.productId ===
                        product.id
                );


            if (existingProduct) {

                existingProduct.quantity +=
                    quantity;

            } else {

                cart.push({

    productId: product.id,

    name: product.name,

    price: product.price,

    quantity: quantity,

    image: "../assets/images/product-milk.jpeg",

    category: product.category

});
            }


            /*
                Save temporary cart.

                FUTURE:

                This data will eventually be
                stored in the database after
                the user is authenticated.
            */

            localStorage.setItem(
                "farmhubCart",
                JSON.stringify(cart)
            );


            updateCartCount();


            /*
                Give the user feedback.
            */

            addToCartButton.textContent =
                "Added to Cart ✓";


            setTimeout(
                () => {

                    addToCartButton.textContent =
                        "Add to Cart";

                },
                1800
            );

        }
    );

}


/* =========================================================
   8. UPDATE CART COUNT
   ========================================================= */

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "farmhubCart"
            )
        ) || [];


    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartCounters =
        document.querySelectorAll(
            ".cart-count"
        );


    cartCounters.forEach(
        (counter) => {

            counter.textContent =
                totalItems;

        }
    );

}


/* =========================================================
   9. INITIALIZE
   ========================================================= */

updateCartCount();