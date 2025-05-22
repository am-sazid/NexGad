const form = document.getElementById('productForm');
const productList = document.getElementById('productList');

// Submit handler
form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form.name.value;
  const price = form.price.value;
  const image = form.image.value;

  const newRef = database.ref('products').push();
  newRef.set({ name, price, image });

  form.reset();
});

// Load & display products
database.ref('products').on('value', snapshot => {
  productList.innerHTML = '';
  snapshot.forEach(child => {
    const data = child.val();
    const key = child.key;

    const div = document.createElement('div');
    div.innerHTML = `
      <h4>${data.name}</h4>
      <img src="${data.image}" />
      <p>Price: ৳${data.price}</p>
      <button onclick="deleteProduct('${key}')">🗑️ Delete</button>
    `;
    productList.appendChild(div);
  });
});

function deleteProduct(id) {
  database.ref('products/' + id).remove();
}
