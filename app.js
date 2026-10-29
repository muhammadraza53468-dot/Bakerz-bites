// Bakerz Bite demo storefront + persistent navbar session
const PRODUCTS = [
  {name:"Chocolate Fudge Cake", price:1850, category:"Cakes", image:"photo-1578985545062-69928b1d9587", description:"Rich chocolate layers with silky fudge."},
  {name:"Vanilla Cupcakes", price:650, category:"Cupcakes", image:"photo-1486427944299-d1955d23e34d", description:"Soft vanilla cupcakes with creamy frosting."},
  {name:"Fresh Artisan Bread", price:420, category:"Bread", image:"photo-1509440159596-0249088772ff", description:"Golden crust and a soft, fluffy centre."},
  {name:"Strawberry Cake", price:2100, category:"Cakes", image:"photo-1565958011703-44f9829ba187", description:"Fresh berry flavour in every bite."},
  {name:"Chocolate Croissant", price:390, category:"Pastries", image:"photo-1555507036-ab1f4038808a", description:"Buttery pastry with a chocolate heart."},
  {name:"Glazed Donuts", price:300, category:"Donuts", image:"photo-1551024506-0bccd828d307", description:"A sweet classic with a shiny glaze."},
  {name:"Macaron Box", price:950, category:"Cookies", image:"photo-1558326567-98ae2405596b", description:"Colourful, delicate bites for sharing."},
  {name:"Cinnamon Rolls", price:480, category:"Pastries", image:"photo-1509365465985-25d11c17e812", description:"Warm cinnamon swirls with sweet icing."},
  {name:"Celebration Cake", price:3200, category:"Cakes", image:"photo-1606890737304-57a1ca8a5b62", description:"A centrepiece for your special day."}
];
const ITEMS_PER_PAGE = 6;
let currentPage = 1;

function updateAuthNavbar() {
  const link = document.getElementById("authNavLink");
  if (!link) return;
  let session = null;
  try { session = JSON.parse(localStorage.getItem("bakerzBiteSession") || "null"); } catch (_) {}
  if (session && session.email) {
    link.textContent = "Logout";
    link.href = "#";
    link.setAttribute("aria-label", "Logout");
    link.onclick = function (event) {
      event.preventDefault();
      localStorage.removeItem("bakerzBiteSession");
      window.location.href = "login.html?loggedout=1";
    };
  } else {
    link.textContent = "Login";
    link.href = "login.html";
    link.removeAttribute("aria-label");
    link.onclick = null;
  }
}

function renderProducts(page = 1) {
  const list = document.getElementById("productList");
  const pagination = document.getElementById("pagination");
  const pageInfo = document.getElementById("pageInfo");
  if (!list || !pagination) return;
  currentPage = page;
  const totalPages = Math.ceil(PRODUCTS.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  list.innerHTML = PRODUCTS.slice(start, start + ITEMS_PER_PAGE).map(product => `
    <div class="col-sm-6 col-lg-4">
      <article class="product-card h-100">
        <img src="https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=800&q=80" alt="${product.name}" loading="lazy">
        <div class="product-content">
          <span class="product-category">${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-bottom"><strong>Rs. ${product.price.toLocaleString("en-PK")}</strong><a class="btn btn-sm btn-bakery" href="contact.html">Order Now</a></div>
        </div>
      </article>
    </div>`).join("");
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === page ? "active" : ""}`;
    const button = document.createElement("button");
    button.className = "page-link";
    button.textContent = i;
    button.setAttribute("aria-label", `Page ${i}`);
    button.addEventListener("click", () => { renderProducts(i); document.getElementById("products").scrollIntoView({behavior:"smooth"}); });
    li.appendChild(button);
    pagination.appendChild(li);
  }
  if (pageInfo) pageInfo.textContent = `Showing ${start + 1}–${Math.min(start + ITEMS_PER_PAGE, PRODUCTS.length)} of ${PRODUCTS.length} treats`;
}
document.addEventListener("DOMContentLoaded", () => { updateAuthNavbar(); renderProducts(1); });
