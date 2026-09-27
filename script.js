// ===============================
// CONFIGURAÇÃO DA NIVOR
// ===============================
// Troque pelo número do WhatsApp da loja.
// Formato: 55 + DDD + número, sem espaços, sem + e sem parênteses.
const WHATSAPP = "5592999999999";

const products = [
  { id: 1, name: "Whey Protein 900g", category: "Whey", price: 129.90, badge: "DESTAQUE" },
  { id: 2, name: "Creatina 300g", category: "Creatina", price: 89.90, badge: "POPULAR" },
  { id: 3, name: "Pré-treino 300g", category: "Pré-treino", price: 99.90, badge: "" },
  { id: 4, name: "Whey Isolado 900g", category: "Whey", price: 169.90, badge: "" },
  { id: 5, name: "Creatina 150g", category: "Creatina", price: 54.90, badge: "" },
  { id: 6, name: "Multivitamínico", category: "Vitaminas", price: 49.90, badge: "NOVO" },
  { id: 7, name: "Whey Concentrado 1kg", category: "Whey", price: 139.90, badge: "" },
  { id: 8, name: "Pré-treino 150g", category: "Pré-treino", price: 69.90, badge: "" }
];

let activeCategory = "Todos";
let cart = JSON.parse(localStorage.getItem("nivorCart") || "[]");

const money = value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function renderProducts() {
  const search = document.getElementById("search").value.toLowerCase().trim();
  const filtered = products.filter(p =>
    (activeCategory === "Todos" || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search))
  );

  document.getElementById("products").innerHTML = filtered.length
    ? filtered.map(p => `
      <article class="product">
        <div class="product-img">
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
          <div class="pack"><strong>NIVOR</strong><span>${p.category}</span></div>
        </div>
        <div class="product-body">
          <span class="product-category">${p.category}</span>
          <h3>${p.name}</h3>
          <div class="product-bottom">
            <span class="price">${money(p.price)}</span>
            <button class="add" onclick="addToCart(${p.id})" aria-label="Adicionar ${p.name}">+</button>
          </div>
        </div>
      </article>
    `).join("")
    : `<p class="empty">Nenhum produto encontrado.</p>`;
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
  openCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart();
}

function saveCart() {
  localStorage.setItem("nivorCart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  let total = 0;
  let count = 0;

  if (!cart.length) {
    container.innerHTML = `<div class="empty">Seu carrinho está vazio.<br>Escolha um produto para começar.</div>`;
  } else {
    container.innerHTML = cart.map(item => {
      const p = products.find(x => x.id === item.id);
      const subtotal = p.price * item.qty;
      total += subtotal;
      count += item.qty;
      return `
        <div class="cart-item">
          <div>
            <strong>${p.name}</strong>
            <small>${money(p.price)} cada</small>
            <div class="qty">
              <button onclick="changeQty(${p.id}, -1)">−</button>
              <span>${item.qty}</span>
              <button onclick="changeQty(${p.id}, 1)">+</button>
              <button class="remove" onclick="removeItem(${p.id})">Remover</button>
            </div>
          </div>
          <strong>${money(subtotal)}</strong>
        </div>`;
    }).join("");
  }

  document.getElementById("cartTotal").textContent = money(total);
  document.getElementById("cartCount").textContent = count;
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

function openCart() {
  document.getElementById("cart").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeCart() {
  document.getElementById("cart").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

function checkout() {
  if (!cart.length) {
    alert("Adicione pelo menos um produto ao carrinho.");
    return;
  }

  let total = 0;
  const lines = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    total += p.price * item.qty;
    return `• ${item.qty}x ${p.name} — ${money(p.price * item.qty)}`;
  });

  const message = `Olá, Nivor! Quero fazer este pedido:%0A%0A${lines.join("%0A")}%0A%0A*Total: ${money(total)}*%0A%0AComo posso finalizar o pagamento e combinar a entrega?`;
  window.open(`https://wa.me/${WHATSAPP}?text=${message}`, "_blank");
}

document.getElementById("search").addEventListener("input", renderProducts);
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderProducts();
  });
});

document.getElementById("openCart").onclick = openCart;
document.getElementById("closeCart").onclick = closeCart;
document.getElementById("overlay").onclick = closeCart;
document.getElementById("checkout").onclick = checkout;
document.getElementById("clearCart").onclick = () => { cart = []; saveCart(); };

document.getElementById("whatsappContact").href = `https://wa.me/${WHATSAPP}?text=Olá,%20Nivor!%20Quero%20tirar%20uma%20dúvida.`;
document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
