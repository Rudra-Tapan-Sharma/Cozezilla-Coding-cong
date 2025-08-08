//default products//
// Create product card and append it to product section
document.addEventListener("DOMContentLoaded", () => {
  const productsSection = document.querySelector(".products");
  const productForm = document.getElementById("productForm");
  const modal = document.getElementById("productModal");
  const openFormBtn = document.getElementById("openFormBtn");
  const closeModal = document.getElementById("closeModal");
  const darkModeToggle = document.getElementById("darkModeToggle");

  // ------------------ Default Products -------------------
  const defaultProducts = [
    {
      name: "Blue Denim Jeans",
      sku: "SKU001",
      basePrice: 1500,
      currentPrice: 1700,
      inventoryCount: 50,
      competitorPrice: 1600,
      image: "images/jeans.jpg"
    },
    {
      name: "Red Hoodie",
      sku: "SKU002",
      basePrice: 1000,
      currentPrice: 1200,
      inventoryCount: 30,
      competitorPrice: 1100,
      image: "images/hoodie.jpg"
    },
    {
      name: "White Sneakers",
      sku: "SKU003",
      basePrice: 2000,
      currentPrice: 2200,
      inventoryCount: 20,
      competitorPrice: 2100,
      image: "images/sneakers.jpg"
    },
    {
      name: "Black T-Shirt",
      sku: "SKU004",
      basePrice: 700,
      currentPrice: 850,
      inventoryCount: 70,
      competitorPrice: 800,
      image: "images/tshirt.jpg"
    },
    {
      name: "Green Jacket",
      sku: "SKU005",
      basePrice: 2500,
      currentPrice: 2700,
      inventoryCount: 10,
      competitorPrice: 2600,
      image: "images/jacket.jpg"
    }
  ];

  function addProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";

    const priceChange = (((product.currentPrice - product.basePrice) / product.basePrice) * 100).toFixed(2);

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>SKU: ${product.sku}</p>
      <p>Base Price: ₹${product.basePrice}</p>
      <p>Current Price: ₹${product.currentPrice}</p>
      <p>Price Change: ${priceChange}%</p>
      <button class="deleteBtn">Delete</button>
    `;

    const deleteBtn = card.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
      card.remove();
    });

    productsSection.appendChild(card);
  }

  function loadDefaultProducts() {
    defaultProducts.forEach(product => addProductCard(product));
  }

  // ------------------ Event Listeners -------------------

  openFormBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const sku = document.getElementById("productSKU").value;
    const basePrice = parseFloat(document.getElementById("basePrice").value);
    const currentPrice = parseFloat(document.getElementById("currentPrice").value);
    const inventoryCount = parseInt(document.getElementById("inventoryCount").value);
    const competitorPrice = parseFloat(document.getElementById("competitorPrice").value);
    const imageInput = document.getElementById("productImage");

    if (imageInput.files.length === 0) {
      alert("Please upload a product image.");
      return;
    }

    const imageURL = URL.createObjectURL(imageInput.files[0]);

    const newProduct = {
      name,
      sku,
      basePrice,
      currentPrice,
      inventoryCount,
      competitorPrice,
      image: imageURL
    };

    addProductCard(newProduct);
    modal.style.display = "none";
    productForm.reset();
  });

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // ------------------ Initialize Page -------------------

  loadDefaultProducts();
});


// Ensure the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadDefaultProducts();
});


// ==== Live Market Chart ====
const ctx = document.getElementById('clothingMarketChart').getContext('2d');
const clothingMarketChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Clothing Market Price (₹)',
      data: [],
      fill: false,
      borderColor: 'blue',
      tension: 0.1
    }]
  },
  options: {
    responsive: true,
    animation: false,
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Price in ₹' } }
    }
  }
});


function getRandomPrice(base = 500) {
  return (base + Math.random() * 50 - 25).toFixed(2);
}

function updateClothingMarketData() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  if (clothingMarketChart.data.labels.length > 15) {
    clothingMarketChart.data.labels.shift();
    clothingMarketChart.data.datasets[0].data.shift();
  }
  clothingMarketChart.data.labels.push(time);
  clothingMarketChart.data.datasets[0].data.push(getRandomPrice());
  clothingMarketChart.update();
}
for (let i = 0; i < 5; i++) updateClothingMarketData();
setInterval(updateClothingMarketData, 5000);

// ==== Modal Logic ====
const modal = document.getElementById('productModal');
const openFormBtn = document.getElementById('openFormBtn');
const closeModal = document.getElementById('closeModal');
const productForm = document.getElementById('productForm');
const productSection = document.querySelector('.products');

openFormBtn.onclick = () => modal.style.display = 'block';
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

let products = [];

productForm.onsubmit = (e) => {
  e.preventDefault();

  const name = document.getElementById('productName').value;
  const sku = document.getElementById('productSKU').value;
  const basePrice = parseFloat(document.getElementById('basePrice').value).toFixed(2);
  let currentPriceInput = document.getElementById('currentPrice').value;
  const imageFile = document.getElementById('productImage').files[0];
  const demandScore = Math.random() * 100;
  const competitorPrice = getRandomPrice(basePrice);

  // Auto price calculation if field is empty
  let currentPrice = currentPriceInput ? parseFloat(currentPriceInput).toFixed(2) : (
    (parseFloat(basePrice) + parseFloat(competitorPrice) + demandScore / 2) / 2
  ).toFixed(2);

  const reader = new FileReader();
  reader.onload = function (event) {
    const imageUrl = event.target.result;

    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${imageUrl}" alt="${name}" />
      <h3>${name}</h3>
      <p>SKU: ${sku}</p>
      <p>Base: ₹${basePrice} → <strong>₹${currentPrice}</strong></p>
      <span class="change ${currentPrice >= basePrice ? 'up' : 'down'}">
        ${((currentPrice - basePrice) / basePrice * 100).toFixed(1)}%
      </span>
      <p>Demand Score: ${demandScore.toFixed(1)}</p>
      <p>Competitor Price: ₹${competitorPrice}</p>
      <div class="button-group">
        <button class="recommend-btn">Get Recommendation</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Delete button
    productCard.querySelector('.delete-btn').onclick = () => {
      productCard.remove();
      products = products.filter(p => p.sku !== sku);
      updateAnalytics();
    };

    // Recommend Button
    productCard.querySelector('.recommend-btn').onclick = () => {
      alert(`Recommended Price for ${name}: ₹${currentPrice}`);
    };

    productSection.appendChild(productCard);

    products.push({ name, sku, basePrice, currentPrice, demandScore, competitorPrice });
    updateAnalytics();
  };

  if (imageFile) reader.readAsDataURL(imageFile);
  modal.style.display = 'none';
  productForm.reset();
};

// Delete pre-existing product cards
document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.onclick = () => btn.closest('.product-card').remove();
});

// ==== Analytics Summary ====
function updateAnalytics() {
  const analyticsDiv = document.getElementById('analyticsSummary');
  const total = products.length;
  const avgPrice = products.reduce((acc, p) => acc + parseFloat(p.currentPrice), 0) / (total || 1);
  const highestDemand = products.sort((a, b) => b.demandScore - a.demandScore)[0];

  analyticsDiv.innerHTML = `
    <h3>Analytics Summary</h3>
    <p><strong>Total Products:</strong> ${total}</p>
    <p><strong>Average Final Price:</strong> ₹${avgPrice.toFixed(2)}</p>
    ${highestDemand ? `<p><strong>Highest Demand Product:</strong> ${highestDemand.name} (${highestDemand.demandScore.toFixed(1)})</p>` : ''}
  `;
}

// ==== A/B Testing Simulation ====
document.getElementById('runABTest').addEventListener('click', () => {
  if (products.length < 2) return alert("Add at least 2 products to simulate A/B test.");

  const variantA = products[0];
  const variantB = products[1];
  const ctrA = Math.random() * 10 + 10;
  const ctrB = Math.random() * 10 + 10;

  alert(`A/B Test Results:\n\nVariant A (${variantA.name}) CTR: ${ctrA.toFixed(2)}%\nVariant B (${variantB.name}) CTR: ${ctrB.toFixed(2)}%\n\nWinner: ${ctrA > ctrB ? variantA.name : variantB.name}`);
});

// ==== API Integration Placeholder ====
function syncPricesToStoreAPI() {
  console.log("Syncing product prices to online store (mock)...", products);
  // Example API call: fetch('/api/update-prices', { method: 'POST', body: JSON.stringify(products) })
}
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Optionally, toggle dark-mode class on other elements too
  document.querySelector("header").classList.toggle("dark-mode");
  document.querySelectorAll(".modal-content").forEach(modal => {
    modal.classList.toggle("dark-mode");
  });
  document.querySelectorAll("button").forEach(btn => {
    btn.classList.toggle("dark-mode");
  });
});
function loadDefaultProducts() {
  defaultProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>SKU: ${product.sku}</p>
      <p>Base: ₹${product.basePrice} → <strong>₹${product.currentPrice}</strong></p>
      <span class="change ${product.currentPrice >= product.basePrice ? 'up' : 'down'}">
        ${((product.currentPrice - product.basePrice) / product.basePrice * 100).toFixed(1)}%
      </span>
      <p>Demand Score: ${(Math.random() * 100).toFixed(1)}</p>
      <p>Competitor Price: ₹${product.competitorPrice}</p>
      <div class="button-group">
        <button class="recommend-btn">Get Recommendation</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Add functionality
    productCard.querySelector('.delete-btn').onclick = () => {
      productCard.remove();
      products = products.filter(p => p.sku !== product.sku);
      updateAnalytics();
    };

    productCard.querySelector('.recommend-btn').onclick = () => {
      alert(`Recommended Price for ${product.name}: ₹${product.currentPrice}`);
    };

    productSection.appendChild(productCard);
    products.push(product);
    updateAnalytics();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadDefaultProducts(); // Load default 5 products
});