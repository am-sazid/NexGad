// js/main.js

console.log("Website loaded successfully!");

// product Section
let products = JSON.parse(localStorage.getItem("products")) || [
  {
    id: 1,
    name: "T-Shirt",
    price: 350,
    image: "assets/img/tshirt.jpg"
  },
  {
    id: 2,
    name: "Cap",
    price: 150,
    image: "assets/img/cap.jpg"
  },
  {
    id: 3,
    name: "Shoes",
    price: 1200,
    image: "assets/img/shoes.jpg"
  }
];

// Show products
const productList = document.getElementById("product-list");
products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product-card";
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>৳${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = products.find(p => p.id === productId);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
}

// Cart Section
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-items");
const totalDiv = document.getElementById("cart-total");

if (cartItems.length === 0) {
  cartContainer.innerHTML = "<p>Your cart is empty.</p>";
} else {
  let total = 0;
  cartItems.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>৳${item.price}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });
  totalDiv.innerHTML = `Total: ৳${total}`;
}

function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  location.reload();
}

// Checkout Section
document.getElementById("checkout-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const order = {
    name,
    phone,
    address,
    items: cart,
    orderTime: new Date().toLocaleString()
  };

  // Save order to localStorage
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Clear cart
  localStorage.removeItem("cart");

  document.getElementById("checkout-form").reset();
  document.getElementById("message").innerText = "✅ Order placed successfully!";
});

// login Section
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const adminUsername = "admin";
  const adminPassword = "1234";

  if (username === adminUsername && password === adminPassword) {
    // Save login status
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("login-msg").innerText = "❌ Invalid credentials!";
  }
});

// Dashboard Section
// Check admin login
if (localStorage.getItem("adminLoggedIn") !== "true") {
  alert("Please login first.");
  window.location.href = "login.html";
}

// Load orders
const orders = JSON.parse(localStorage.getItem("orders")) || [];
const container = document.getElementById("orders-container");

if (orders.length === 0) {
  container.innerHTML = "<p>No orders found.</p>";
} else {
  orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.padding = "1rem";
    div.style.marginBottom = "1rem";
    div.innerHTML = `
      <h3>Order ${index + 1}</h3>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Time:</strong> ${order.orderTime}</p>
      <p><strong>Items:</strong></p>
      <ul>
        ${order.items.map(item => `<li>${item.name} - ৳${item.price}</li>`).join('')}
      </ul>
    `;
    container.appendChild(div);
  });
}

// Logout function
function logout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "login.html";
}

// manage products Section
// Check admin login
if (localStorage.getItem("adminLoggedIn") !== "true") {
  alert("Please login first.");
  window.location.href = "login.html";
}

const form = document.getElementById("product-form");
const nameInput = document.getElementById("product-name");
const priceInput = document.getElementById("product-price");
const imageInput = document.getElementById("product-image");
const list = document.getElementById("product-list");

// let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
  list.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>৳${product.price}</p>
      <button onclick="deleteProduct(${index})">Delete</button>
    `;
    list.appendChild(div);
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const newProduct = {
    name: nameInput.value,
    price: parseFloat(priceInput.value),
    image: imageInput.value
  };

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  form.reset();
  renderProducts();
});

// Load products initially
renderProducts();

// Logout
function logout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "login.html";
}
// firebase setup
const productRef = db.ref("products");

productRef.on("value", (snapshot) => {
  const data = snapshot.val();
  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = "";

  for (let id in data) {
    const product = data[id];
    // Render card (same as before)
  }
});
