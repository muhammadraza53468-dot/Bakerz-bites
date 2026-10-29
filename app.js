
const products = [
  {
    name: "Chocolate Cake",
    price: 1800,
    image: "photo-1578985545062-69928b1d9587",
    description: "Rich chocolate cake for every celebration."
  },
  {
    name: "Vanilla Cupcakes",
    price: 450,
    image: "photo-1486427944299-d1955d23e34d",
    description: "Soft cupcakes with delicious creamy frosting."
  },
  {
    name: "Fresh Croissants",
    price: 300,
    image: "photo-1555507036-ab1f4038808a",
    description: "Flaky, buttery and freshly baked."
  },
  {
    name: "Donuts",
    price: 250,
    image: "photo-1551024506-0bccd828d307",
    description: "Sweet treats with delightful toppings."
  },
  {
    name: "Strawberry Cake",
    price: 1600,
    image: "photo-1565958011703-44f9829ba187",
    description: "A fruity cake for your sweetest moments."
  },
  {
    name: "Fresh Bread",
    price: 180,
    image: "photo-1509440159596-0249088772ff",
    description: "Golden, soft and freshly baked bread."
  },
  {
    name: "Macarons",
    price: 550,
    image: "photo-1569864358642-9d1684040f43",
    description: "Colourful bites with a delicate crunch."
  },
  {
    name: "Cookies",
    price: 200,
    image: "photo-1499636136210-6f4ee915583e",
    description: "Crunchy cookies for your tea time."
  },
  {
    name: "Cheesecake",
    price: 900,
    image: "photo-1533134242443-d4fd215305ad",
    description: "Creamy cheesecake with a buttery crust."
  }
];

const productsPerPage = 3;
let currentPage = 1;

function renderProducts() {
  const productList = document.getElementById("productList");
  const pagination = document.getElementById("pagination");

  // Do nothing on pages without product sections
  if (!productList || !pagination) return;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const visibleProducts = products.slice(start, start + productsPerPage);

  productList.innerHTML = visibleProducts.map(product => `
    <div class="col-sm-6 col-lg-4">
      <div class="card product-card">
        <img
          src="https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=700&q=80"
          class="product-img"
          alt="${product.name}"
          loading="lazy"
        >
        <div class="card-body d-flex flex-column">
          <h5>${product.name}</h5>
          <p>${product.description}</p>
          <div class="mt-auto">
            <p class="product-price mb-3">Rs. ${product.price.toLocaleString("en-PK")}</p>
            <button
              class="btn btn-bakery w-100"
              type="button"
              onclick="showProductMessage('${product.name}')"
            >
              Order Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  let pageButtons = `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <button class="page-link" onclick="changePage(${currentPage - 1})"
        ${currentPage === 1 ? "disabled" : ""}>Previous</button>
    </li>
  `;

  for (let page = 1; page <= totalPages; page++) {
    pageButtons += `
      <li class="page-item ${currentPage === page ? "active" : ""}">
        <button class="page-link" ${currentPage === page ? 'aria-current="page"' : ""}
          onclick="changePage(${page})">${page}</button>
      </li>
    `;
  }

  pageButtons += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <button class="page-link" onclick="changePage(${currentPage + 1})"
        ${currentPage === totalPages ? "disabled" : ""}>Next</button>
    </li>
  `;

  pagination.innerHTML = pageButtons;
}

function changePage(page) {
  const totalPages = Math.ceil(products.length / productsPerPage);

  if (page < 1 || page > totalPages) return;

  currentPage = page;
  renderProducts();

  document.getElementById("products")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function showProductMessage(name) {
  alert(name + " ke order ke liye hamare Contact page par visit karein.");
}

// Contact form: frontend demo only
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const feedback = document.getElementById("contactFeedback");
    feedback.className = "mt-3 alert alert-success";
    feedback.textContent =
      "Thank you! Demo form submit ho gaya. Message asal mein send nahi hua.";

    contactForm.reset();
  });
}

// Login form: frontend demo only, no authentication
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const feedback = document.getElementById("loginFeedback");
    feedback.className = "mt-3 alert alert-info";
    feedback.textContent =
      "Ye demo login form hai. Real login ke liye backend zaroori hai.";
  });
}

renderProducts();
