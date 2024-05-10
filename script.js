const stock_products = [
  {
    id: 1,
    name: "Sansung Galaxy M15",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/81BTRVfsuFL._SX679_.jpg",
    mrp: 16999,
    price: 14799,
    ram: "6 GB",
    internal: "128 GB",
  },
  {
    id: 2,
    name: "Sansung Galaxy M34",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/91ItZJh1FDL._SX679_.jpg",
    mrp: 24499,
    price: 14999,
    ram: "6 GB",
    internal: "128 GB",
  },
  {
    id: 3,
    name: "realme narzo 60X",
    brand: "Realme",
    image: "https://m.media-amazon.com/images/I/81WimZLWH1L._SX679_.jpg",
    mrp: 14999,
    price: 18499,
    ram: "4 GB",
    internal: "128 GB",
  },
  {
    id: 4,
    name: "realme narzo 60",
    brand: "Realme",
    image: "https://m.media-amazon.com/images/I/8195A49fZbL._SX679_.jpg",
    mrp: 19999,
    price: 14499,
    ram: "8 GB",
    internal: "128 GB",
  },
  {
    id: 5,
    name: "OnePlus Nord CE4",
    brand: "Oneplus",
    image: "https://m.media-amazon.com/images/I/61nxQ62qglL._SX679_.jpg",
    mrp: 30000,
    price: 26999,
    ram: "8 GB",
    internal: "256 GB",
  },
  {
    id: 6,
    name: "OnePlus 11R",
    brand: "Oneplus",
    image: "https://m.media-amazon.com/images/I/61u9zN1HYCL._SX679_.jpg",
    mrp: 45000,
    price: 32900,
    ram: "8 GB",
    internal: "128 GB",
  },
  {
    id: 7,
    name: "Redmi 13c",
    brand: "Redmi",
    image: "https://m.media-amazon.com/images/I/81H7FJtH4SL._SX679_.jpg",
    mrp: 18499,
    price: 13999,
    ram: "4 GB",
    internal: "128 GB",
  },
  {
    id: 8,
    name: "Redmi 12",
    brand: "Redmi",
    image: "https://m.media-amazon.com/images/I/71UIZHHo5hL._SX679_.jpg",
    mrp: 15999,
    price: 11999,
    ram: "4 GB",
    internal: "128 GB",
  },
];

const productSection = document.getElementById("productsPage");
const btnCart = document.getElementById("btnCart");
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
const cartCount = document.querySelector(".cart-count");
const modalDiv = document.getElementById("myModal");
const tbody = document.getElementById("tbody");

let cartItems = [];

function loadStockProducts() {
  let output = "";
  stock_products.forEach((product) => {
    output += `<div class="col">
    <div class="card h-100">
      <img
        class="card-img-top"
        src="${product.image}"        
        alt=""
      />
      <div class="card-body p-4">
        <div class="text-center">
          <h5>${product.name}</h5>
          <span class="text-muted"><b>Brand</b>: ${product.brand}</span>
          <span class="text-muted d-block"
            ><b>Storage</b>: ${product.ram} / ${product.internal}</span
          >
          <span class="text-muted text-decoration-line-through"
            >Rs ${product.mrp}</span
          >
          <span class="fw-bold text-success">Rs ${product.price}</span>
        </div>
      </div>
      <div class="card-footer p-4 bg-transparent border-top-0">
        <div class="text-center">
          <button class="btn btn-primary btnProduct" data-id="${product.id}">
            <i class="bi bi-cart-fill">Add to Cart</i>
          </button>
        </div>
      </div>
    </div>
  </div>
`;
  });
  productSection.innerHTML = output;
  // Add product Button Code

  const productBtns = document.querySelectorAll(".btnProduct");
  productBtns.forEach((btn) => {
    btn.addEventListener("click", addToCart);
  });
}

loadStockProducts();

btnCart.addEventListener("click", function () {
  myModal.show();
});

function addToCart() {
  this.disabled = true;
  this.innerHTML = `<i class="bi bi-cart-fill"></i>Added to cart`;
  const pid = this.dataset.id;
  const product_details = stock_products.filter(
    (product) => product.id == pid
  )[0];
  const product = {
    ...product_details,
    quantity: 1,
    amount: product_details.price,
  };
  cartItems.push(product);
  cartCount.textContent = cartItems.length;
  updateTotal();
}
modalDiv.addEventListener("shown.bs.modal", () => {
  let output = ``;
  cartItems.forEach((product) => {
    output += `
      <tr>
        <td>
          <img src='${product.image}' class="img-fluid" width="100px" />
        </td>
        <td>${product.name}</td>
        <td>${product.price.toFixed(2)}</td>
        <td><input type='number' style='width:80px' class='form-control txtQty' value='${
          product.quantity
        }' min=1 data-id='${product.id}'> </td>
        <td>${product.amount.toFixed(2)}</td>
        <td><button class='btn btn-danger btn-sm btnDelete' data-id='${
          product.id
        }'><i class="bi bi-trash"></i></td>
      </tr>
    `;
  });
  tbody.innerHTML = output;
  const removeBtns = document.querySelectorAll(".btnDelete");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", removeFromCart);
  });
  const txtQty = document.querySelectorAll(".txtQty");
  txtQty.forEach((txt) => {
    txt.addEventListener("change", updateQty);
  });
});

function removeFromCart() {
  const id = this.dataset.id;
  const tr = this.closest("tr");
  cartItems = cartItems.filter((product) => product.id != id);
  tr.remove();
  updateTotal();
}
function updateQty() {
  const id = this.dataset.id;
  const newQty = this.value;
  const amountTd = this.parentElement.nextElementSibling;
  const productIndex = cartItems.findIndex((product) => product.id == id);
  cartItems[productIndex].quantity = newQty;
  cartItems[productIndex].amount = newQty * cartItems[productIndex].price;
  amountTd.textContent = (newQty * cartItems[productIndex].price).toFixed(2);
  updateTotal();
}
modalDiv.addEventListener("hide.bs.modal", () => {
  cartCount.textContent = cartItems.length;

  // Check products Button
  const productBtns = document.querySelectorAll(".btnProduct");

  productBtns.forEach((btn) => {
    const pid = btn.dataset.id;
    if (!isIdPresent(pid)) {
      btn.disabled = false;
    }
  });
});

function updateTotal() {
  let totalAmount = 0;
  cartItems.forEach((product) => {
    totalAmount += product.amount;
  });
  const totalTd = document.querySelector(".total");
  totalTd.textContent = `Total Rs : ${totalAmount.toFixed(2)}`;
}
const isIdPresent = (id) => {
  for (const product of cartItems) {
    if (product.id == id) {
      return true;
    }
  }
  return false;
};
