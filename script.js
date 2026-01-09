const products = [
    { name: "Пончик з шоколадом", price: 20, image: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/211/728/941/410/916/6/100041107279b0.jpg" },
    { name: "Пончик з ваніллю", price: 20, image: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/380/659/434/122/319/43/100046978499b1.png" },
    { name: "Пончик з полуницею", price: 30, image: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/-15/286/944/411/228/184/100046791634b0.png" },
];

const productsContainer = document.querySelector('.products');
products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'card';
    productCard.innerHTML = `
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Ціна: ${product.price} грн</p>
                    </div>
                `;
    productsContainer.appendChild(productCard);
});

// Отримуємо дані про товари з JSON файлу
async function getProducts() {
    let response = await fetch("store_db.json");
    let products = await response.json();
    return products;
};

// Генеруємо HTML-код для карточки товару
function getCardHTML(product) {
    // Створюємо JSON-строку з даними про товар і зберігаємо її в data-атрибуті
    let productData = JSON.stringify(product)

    return `
        <div class="my-card" style="">
            <img src="img/${product.image}">
            <h5 class="text-my-card">${product.title}</h5>
            <p class="description-card">
            ${product.description}
           </p>
            <p class="price-card">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-currency-hryvnia"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a2.64 2.64 0 0 1 2.562 -2h3.376a2.64 2.64 0 0 1 2.562 2a2.57 2.57 0 0 1 -1.344 2.922l-5.876 2.938a3.338 3.338 0 0 0 -1.78 3.64a3.11 3.11 0 0 0 3.05 2.5h2.888a2.64 2.64 0 0 0 2.562 -2" /><path d="M6 10h12" /><path d="M6 14h12" /></svg>
            ${product.price}
           </p>
            <button type="button" class="cart-btn" data-product='${productData}'>
            <svg class="bell" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
            Купити</button>
        </div>
    `;
}

// Відображаємо товари на сторінці
getProducts().then(function (products) {
    let productsList = document.querySelector('.products-list')
    if (productsList) {
        products.forEach(function (product) {
            productsList.innerHTML += getCardHTML(product)
        })
    }
    
    // Отримуємо всі кнопки "Купити" на сторінці
    let buyButtons = document.querySelectorAll('.products-list .cart-btn');
    // Навішуємо обробник подій на кожну кнопку "Купити"
    if (buyButtons) {
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart);
        });
    }
});

// Функція для додавання товару до кошика
function addToCart(event) {
    // Отримуємо дані про товар з data-атрибута кнопки
    let productData = event.currentTarget.getAttribute('data-product');
    let product = JSON.parse(productData);
    console.log("Товар додано до кошика:", product);
    // Тут можна додати логіку для збереження товару в кошику (наприклад, у localStorage)
}

// Тема сайту (світла/темна)
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
});

// Перевіряємо збережену тему при завантаженні сторінки
window.addEventListener('load', function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Зберігаємо вибір теми при зміні
themeToggleBtn.addEventListener('click', function () {
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }  
});

// cart.js content
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
    cart_list.innerHTML = ''
    for (let key in cart.items) { // проходимося по всіх ключах об'єкта cart.items
        cart_list.innerHTML += get_item(cart.items[key])
    }
    cart_total.innerHTML = cart.calculateTotal()
}

showCartList()

orderBtn.addEventListener("click", function (event) {
    orderBtn.style.display = "none"
    orderSection.style.display = "block"   
    anime({
        targets: '.order',
        opacity: 1, // Кінцева прозорість (1 - повністю видимий)
        duration: 1000, // Тривалість анімації в мілісекундах
        easing: 'easeInOutQuad'
    })
})

//Розширений функціонал кошика можна додати тут
let cart = {
    items: {},
    addItem: function (product) {
        if (this.items[product.title]) {
            this.items[product.title].quantity += 1;
        } else {
            this.items[product.title] = {
                title: product.title,
                price: product.price,
                quantity: 1
            };
        }
        showCartList();
    },
    calculateTotal: function () {
        let total = 0;
        for (let key in this.items) {
            total += this.items[key].price * this.items[key].quantity;
        }
        return total;
    }
}

//Додавлення товарів до кошика при кліку на кнопку "Купити"
document.addEventListener('DOMContentLoaded', function () {
    let buyButtons = document.querySelectorAll('.cart-btn');
    buyButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            let productData = event.currentTarget.getAttribute('data-product');
            let product = JSON.parse(productData);
            cart.addItem(product);
        });
    });
});

//Перехід до сторінки кошика
const cartLink = document.getElementById('cartLink');   
cartLink.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = 'cart.html';
}); 

//Перехід до головної сторінки
const homeLink = document.getElementById('homeLink');  
homeLink.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = 'index.html';
});

