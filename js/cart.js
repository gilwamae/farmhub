/* =========================================================
   FARMHUB SHOPPING CART
   File: cart.js

   Current:
   - Reads products from localStorage
   - Displays cart items
   - Changes quantities
   - Removes products
   - Calculates totals
   - Updates cart counter

   Future:
   PHP + MySQL will handle the permanent cart.

   Possible database structure:

   cart_items
   --------------------------------
   cart_item_id
   user_id
   product_id
   quantity
   created_at
   updated_at
   --------------------------------
   ========================================================= */


/* =========================================================
   1. CART STORAGE
   ========================================================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem("farmhubCart")
    ) || [];

}


function saveCart(cart) {

    localStorage.setItem(
        "farmhubCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   2. PAGE ELEMENTS
   ========================================================= */

const cartItemsContainer =
    document.getElementById(
        "cartItems"
    );

const emptyCart =
    document.getElementById(
        "emptyCart"
    );

const cartSubtotal =
    document.getElementById(
        "cartSubtotal"
    );

const deliveryFee =
    document.getElementById(
        "deliveryFee"
    );

const cartTotal =
    document.getElementById(
        "cartTotal"
    );

const cartItemCount =
    document.getElementById(
        "cartItemCount"
    );

const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );


/* =========================================================
   3. FORMAT CURRENCY
   ========================================================= */

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-KE",
        {
            style: "currency",
            currency: "KES",
            maximumFractionDigits: 0
        }
    ).format(amount);

}


/* =========================================================
   4. UPDATE HEADER CART COUNT
   ========================================================= */

function updateCartCount() {

    const cart = getCart();


    const totalItems =
        cart.reduce(
            (total, item) => {

                return total +
                    Number(item.quantity);

            },
            0
        );


    const counters =
        document.querySelectorAll(
            ".cart-count"
        );


    counters.forEach(
        (counter) => {

            counter.textContent =
                totalItems;

        }
    );

}


/* =========================================================
   5. DISPLAY CART
   ========================================================= */

function renderCart() {

    const cart = getCart();


    /*
        If the cart is empty,
        show the empty state.
    */

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = "";

        emptyCart.hidden = false;

        cartItemCount.textContent =
            "0 items";

        cartSubtotal.textContent =
            "KSh 0";

        deliveryFee.textContent =
            "KSh 0";

        cartTotal.textContent =
            "KSh 0";


        checkoutButton.classList.add(
            "disabled"
        );

        updateCartCount();

        return;

    }


    /* Hide empty cart */

    emptyCart.hidden = true;


    checkoutButton.classList.remove(
        "disabled"
    );


    /* =====================================================
       GENERATE CART HTML
       ===================================================== */

    cartItemsContainer.innerHTML =
        cart.map(
            (item) => {

                const itemTotal =
                    Number(item.price) *
                    Number(item.quantity);


                return `

                    <article
                        class="cart-item"
                        data-product-id="${item.productId}"
                    >

                        <!-- Product image -->

                        <div class="cart-item-image">

                            <img
    src="${item.image}"
    alt="${item.name}"
>

                        </div>


                        <!-- Product information -->

                        <div class="cart-item-information">

                            <span class="cart-item-category">
                                Farm Product
                            </span>

                            <h3 class="cart-item-name">
                                ${item.name}
                            </h3>

                            <span class="cart-item-price">
                                ${formatCurrency(item.price)}
                                per unit
                            </span>

                            <button
                                type="button"
                                class="remove-cart-item"
                                data-product-id="${item.productId}"
                            >
                                Remove
                            </button>

                        </div>


                        <!-- Quantity and total -->

                        <div class="cart-item-actions">

                            <div class="cart-quantity">

                                <button
                                    type="button"
                                    class="decrease-cart-quantity"
                                    data-product-id="${item.productId}"
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>

                                <span>
                                    ${item.quantity}
                                </span>

                                <button
                                    type="button"
                                    class="increase-cart-quantity"
                                    data-product-id="${item.productId}"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>

                            </div>


                            <strong class="cart-item-total">

                                ${formatCurrency(itemTotal)}

                            </strong>

                        </div>

                    </article>

                `;

            }
        )
        .join("");


    /* Update item count */

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity),
            0
        );


    cartItemCount.textContent =
        totalItems === 1
            ? "1 item"
            : `${totalItems} items`;


    calculateTotals();

    updateCartCount();

}


/* =========================================================
   6. CALCULATE TOTALS
   ========================================================= */

function calculateTotals() {

    const cart = getCart();


    const subtotal =
        cart.reduce(
            (total, item) => {

                return total +
                    (
                        Number(item.price) *
                        Number(item.quantity)
                    );

            },
            0
        );


    /*
        CURRENT:

        Delivery is temporarily set to zero.

        FUTURE PHP:

        Delivery can be calculated based on:

        - Customer location
        - Farmer location
        - Delivery distance
        - Product type
        - Order weight
        - Farm delivery zone

        Example:

        $deliveryFee =
            calculateDeliveryFee(
                $userLocation,
                $farmLocation
            );
    */

    const delivery = 0;


    const total =
        subtotal + delivery;


    cartSubtotal.textContent =
        formatCurrency(subtotal);

    deliveryFee.textContent =
        delivery === 0
            ? "Calculated at checkout"
            : formatCurrency(delivery);

    cartTotal.textContent =
        formatCurrency(total);

}


/* =========================================================
   7. CHANGE QUANTITY
   ========================================================= */

function changeQuantity(
    productId,
    change
) {

    const cart = getCart();


    const product =
        cart.find(
            (item) =>
                Number(item.productId) ===
                Number(productId)
        );


    if (!product) {
        return;
    }


    product.quantity =
        Number(product.quantity) +
        Number(change);


    /*
        Don't allow quantity below 1.
    */

    if (product.quantity < 1) {

        product.quantity = 1;

    }


    /*
        FUTURE BACKEND:

        Before increasing quantity,
        PHP should verify the current
        product stock in MySQL.

        Example:

        SELECT stock_quantity
        FROM products
        WHERE product_id = ?;
    */


    saveCart(cart);

    renderCart();

}


/* =========================================================
   8. REMOVE PRODUCT
   ========================================================= */

function removeProduct(productId) {

    let cart = getCart();


    cart =
        cart.filter(
            (item) =>
                Number(item.productId) !==
                Number(productId)
        );


    /*
        CURRENT:

        Remove from localStorage.

        FUTURE:

        DELETE FROM cart_items
        WHERE user_id = ?
        AND product_id = ?;
    */


    saveCart(cart);

    renderCart();

}


/* =========================================================
   9. CART BUTTON EVENTS
   ========================================================= */

if (cartItemsContainer) {

    cartItemsContainer.addEventListener(
        "click",
        (event) => {


            /* Increase */

            const increaseButton =
                event.target.closest(
                    ".increase-cart-quantity"
                );


            if (increaseButton) {

                changeQuantity(
                    increaseButton.dataset.productId,
                    1
                );

                return;

            }


            /* Decrease */

            const decreaseButton =
                event.target.closest(
                    ".decrease-cart-quantity"
                );


            if (decreaseButton) {

                changeQuantity(
                    decreaseButton.dataset.productId,
                    -1
                );

                return;

            }


            /* Remove */

            const removeButton =
                event.target.closest(
                    ".remove-cart-item"
                );


            if (removeButton) {

                removeProduct(
                    removeButton.dataset.productId
                );

            }

        }
    );

}


/* =========================================================
   10. INITIALIZE CART
   ========================================================= */

renderCart();