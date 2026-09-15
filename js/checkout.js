/* =========================================================
   FARMHUB - CHECKOUT
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );

const checkoutItems =
    document.getElementById(
        "checkoutItems"
    );

const checkoutSubtotal =
    document.getElementById(
        "checkoutSubtotal"
    );

const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );

const orderSuccess =
    document.getElementById(
        "orderSuccess"
    );


/* =========================================================
   DELIVERY FEE
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
   RENDER CHECKOUT ITEMS
   ========================================================= */

function renderCheckout() {

    const cart =
        getCart();


    if (cart.length === 0) {

        window.location.href =
            "products.html";

        return;

    }


    let subtotal = 0;


    checkoutItems.innerHTML = "";


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


        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="checkout-item-info">

                    <strong>
                        ${product.name}
                    </strong>

                    <span>
                        Qty: ${item.quantity}
                    </span>

                </div>

                <span class="checkout-item-price">
                    KSh ${itemTotal.toLocaleString()}
                </span>

            </div>

        `;

    });


    checkoutSubtotal.textContent =
        `KSh ${subtotal.toLocaleString()}`;


    checkoutTotal.textContent =
        `KSh ${(subtotal + DELIVERY_FEE).toLocaleString()}`;

}


/* =========================================================
   ERROR HELPER
   ========================================================= */

function showError(
    fieldId,
    errorId,
    message
) {

    const field =
        document.getElementById(
            fieldId
        );

    const error =
        document.getElementById(
            errorId
        );


    field
        .closest(".form-field")
        ?.classList.add("invalid");


    if (error) {

        error.textContent =
            message;

    }

}


/* =========================================================
   CLEAR ERRORS
   ========================================================= */

function clearErrors() {

    document
        .querySelectorAll(
            ".form-field.invalid"
        )
        .forEach(field => {

            field.classList.remove(
                "invalid"
            );

        });


    document
        .querySelectorAll(
            ".field-error"
        )
        .forEach(error => {

            error.textContent = "";

        });

}


/* =========================================================
   VALIDATE CHECKOUT
   ========================================================= */

function validateCheckout() {

    clearErrors();


    let valid = true;


    const fullName =
        document.getElementById(
            "fullName"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const county =
        document.getElementById(
            "county"
        ).value;


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    const terms =
        document.getElementById(
            "terms"
        ).checked;


    /* NAME */

    if (fullName.length < 3) {

        showError(
            "fullName",
            "fullNameError",
            "Please enter your full name."
        );

        valid = false;

    }


    /* PHONE */

    const phonePattern =
        /^(?:\+254|0)[17]\d{8}$/;


    if (!phonePattern.test(phone)) {

        showError(
            "phone",
            "phoneError",
            "Enter a valid Kenyan phone number."
        );

        valid = false;

    }


    /* EMAIL */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        showError(
            "email",
            "emailError",
            "Enter a valid email address."
        );

        valid = false;

    }


    /* COUNTY */

    if (!county) {

        showError(
            "county",
            "countyError",
            "Please select your county."
        );

        valid = false;

    }


    /* ADDRESS */

    if (address.length < 8) {

        showError(
            "address",
            "addressError",
            "Please provide a complete delivery address."
        );

        valid = false;

    }


    /* TERMS */

    if (!terms) {

        document.getElementById(
            "termsError"
        ).textContent =
            "Please accept the terms to continue.";

        valid = false;

    }


    return valid;

}


/* =========================================================
   SUBMIT ORDER
   ========================================================= */

checkoutForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!validateCheckout()) {

            return;

        }


        /*
         * FRONTEND DEMO ONLY
         *
         * Later this information will be sent to:
         *
         * PHP API → MySQL
         *
         * The backend will create the actual order,
         * calculate the final amount and initiate payment.
         */


        const order = {

            id:
                "FH-" +
                Date.now(),

            customer: {

                name:
                    document.getElementById(
                        "fullName"
                    ).value.trim(),

                phone:
                    document.getElementById(
                        "phone"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "email"
                    ).value.trim(),

                county:
                    document.getElementById(
                        "county"
                    ).value,

                address:
                    document.getElementById(
                        "address"
                    ).value.trim()

            },

            paymentMethod:
                document.querySelector(
                    'input[name="paymentMethod"]:checked'
                ).value,

            items:
                getCart(),

            createdAt:
                new Date().toISOString(),

            status:
                "Pending"

        };


        /*
         * Save temporary order.
         */

        localStorage.setItem(
            "farmHubLastOrder",
            JSON.stringify(order)
        );


        /*
         * Clear cart after successful
         * frontend submission.
         */

        localStorage.removeItem(
            "farmHubCart"
        );


        checkoutForm.hidden = true;

        orderSuccess.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

renderCheckout();