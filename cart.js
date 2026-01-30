document.addEventListener('DOMContentLoaded', function () {
let cart_list = document.querySelector('.cart-items-list')
    let cart_total = document.querySelector('.cart-total')
    let orderBtn = document.querySelector("#orderBtn")
    let orderSection = document.querySelector(".order")

    function get_item(item) {
        return `<div class = "cart-item">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-quantity">Кількість: ${item.quantity}</div>
                    <div class="cart-item-price" data-price="${item.price}">${item.price * item.quantity} грн</div>
                </div>`
    }

    function showCartList() {
        if (cart_list && typeof cart !== 'undefined' && cart.items) {
            cart_list.innerHTML = ''
            for (let key in cart.items) {
                cart_list.innerHTML += get_item(cart.items[key])
            }
            if (cart_total) {
                cart_total.innerHTML = cart.calculateTotal()
            }
        }
    }

    showCartList()

    if (orderBtn && orderSection) {
    orderBtn.addEventListener("click", function (event) {
        orderBtn.style.display = "none"
        orderSection.style.display = "block"
        if (typeof anime !== 'undefined') {
            anime({
                targets: '.order',
                opacity: 1,
                duration: 1000,
                easing: 'easeInOutQuad'
            })
        }
    })
}
})

document.addEventListener('DOMContentLoaded', function () {
    const deliveryMethod = document.getElementById('deliveryMethod');
    const postalFields = document.getElementById('postalDeliveryFields');
    const emailField = document.getElementById('emailDeliveryField');
    const cityInput = document.getElementById('city');
    const postOfficeInput = document.getElementById('postOfficeAddress');
    const deliveryEmailInput = document.getElementById('deliveryEmail');

    if (!deliveryMethod || !postalFields || !emailField) {
        return;
    }

    function updateDeliveryFields() {
        const selectedMethod = deliveryMethod.value;

        postalFields.style.display = 'none';
        emailField.style.display = 'none';

        if (cityInput) cityInput.removeAttribute('required');
        if (postOfficeInput) postOfficeInput.removeAttribute('required');
        if (deliveryEmailInput) deliveryEmailInput.removeAttribute('required');
        if (selectedMethod === 'nova-poshta' || selectedMethod === 'ukrposhta') {
            postalFields.style.display = 'block';
            if (cityInput) cityInput.setAttribute('required', 'required');
            if (postOfficeInput) postOfficeInput.setAttribute('required', 'required');
        } else if (selectedMethod === 'email') {
            emailField.style.display = 'block';
            if (deliveryEmailInput) deliveryEmailInput.setAttribute('required', 'required');
        }
    }

    deliveryMethod.addEventListener('change', updateDeliveryFields);

    updateDeliveryFields();
});

