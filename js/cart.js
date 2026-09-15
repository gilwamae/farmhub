/* =========================================================
   FARMHUB - SHOPPING CART
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const cartItems =
    document.getElementById("cartItems");

const cartLayout =
    document.getElementById("cartLayout");

const emptyCart =
    document.getElementById("emptyCart");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const cartDelivery =
    document.getElementById("cartDelivery");

const cartTotal =
    document.getElementById("cartTotal");


/* =========================================================
   DELIVERY
   ========================================================= */

const DELIVERY_FEE = 200;


/* =========================================================
   GET CART
   ========================================================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem(
            "farmHubCart"
        )
    ) || [];

}


/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart(cart) {

    localStorage.setItem(
        "farmHubCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {

    const cart =
        getCart();


    if (cart.length === 0) {

        cartLayout.hidden = true;

        emptyCart.hidden = false;

        return;

    }


    cartLayout.hidden = false;

    emptyCart.hidden = true;


    cartItems.innerHTML = "";


    let subtotal = 0;


    cart.forEach(item => {

        const product =
            farmHubProducts.find(
                product =>
                    product.id === item.id
            );


        if (!product) {

            return;

        }


        const itemTotal =
            product.price *
            item.quantity;


        subtotal += itemTotal;


        const element =
            document.createElement("article");


        element.className =
            "cart-item";


        element.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="cart-item-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.farmer}
                    ·
                    ${product.unit}
                </p>

                <span class="cart-item-price">
                    KSh ${product.price.toLocaleString()}
                </span>

            </div>


            <div class="cart-item-actions">


                <div class="cart-quantity">

                    <button
                        type="button"
                        data-action="decrease"
                        data-id="${product.id}"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        data-action="increase"
                        data-id="${product.id}"
                    >
                        +
                    </button>

                </div>


                <strong class="cart-item-total">
                    KSh ${itemTotal.toLocaleString()}
                </strong>


                <button
                    type="button"
                    class="remove-cart-item"
                    data-action="remove"
                    data-id="${product.id}"
                    aria-label="Remove ${product.name}"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;


        cartItems.appendChild(
            element
        );

    });


    const delivery =
        subtotal > 0
            ? DELIVERY_FEE
            : 0;


    const total =
        subtotal + delivery;


    cartSubtotal.textContent =
        `KSh ${subtotal.toLocaleString()}`;


    cartDelivery.textContent =
        `KSh ${delivery.toLocaleString()}`;


    cartTotal.textContent =
        `KSh ${total.toLocaleString()}`;


    updateCartCount();

}


/* =========================================================
   CART ACTIONS
   ========================================================= */

cartItems.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-action]"
            );


        if (!button) {

            return;

        }


        const id =
            Number(
                button.dataset.id
            );


        const action =
            button.dataset.action;


        let cart =
            getCart();


        const item =
            cart.find(
                product =>
                    product.id === id
            );


        if (!item) {

            return;

        }


        const product =
            farmHubProducts.find(
                product =>
                    product.id === id
            );


        if (action === "increase") {

            if (
                product &&
                item.quantity < product.stock
            ) {

                item.quantity++;

            }

        }


        if (action === "decrease") {

            item.quantity--;

            if (item.quantity <= 0) {

                cart =
                    cart.filter(
                        product =>
                            product.id !== id
                    );

            }

        }


        if (action === "remove") {

            cart =
                cart.filter(
                    product =>
                        product.id !== id
                );

        }


        saveCart(cart);

        renderCart();

    }
);


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const cart =
        getCart();


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


/* =========================================================
   INITIALIZE
   ========================================================= */

renderCart();