const WHATSAPP = "5592994652632";

// Preços sugeridos para venda. Confirme estoque, custo final e frete antes de fechar cada pedido.
const products = [
  { name: "Creatina Max Titanium 300g", category: "Creatina", price: "R$ 59,90" },
  { name: "Creatina Turbo Black Skull 300g", category: "Creatina", price: "R$ 54,90" },
  { name: "Nutri Whey Integralmédica 1,2kg — Baunilha", category: "Proteínas", price: "R$ 99,90" },
  { name: "Nutri Whey Integralmédica 1,2kg — Chocolate", category: "Proteínas", price: "R$ 99,90" },
  { name: "Mega Whey Protein Iridium 900g — Chocolate", category: "Proteínas", price: "R$ 79,90" },
  { name: "Mass Titanium Max Titanium 3kg — Baunilha", category: "Ganho de massa", price: "R$ 119,90" },
  { name: "2Hot Max Titanium 200g", category: "Pré-treino", price: "R$ 79,90" },
  { name: "Hydra Glutamina Iridium 300g", category: "Performance", price: "R$ 74,90" },
  { name: "Cafeína BodyAction — 60 cápsulas", category: "Performance", price: "R$ 49,90" },
  { name: "Poseidon Ômega 3 Iridium — 60 cápsulas", category: "Vitaminas e bem-estar", price: "R$ 79,90" },
  { name: "Vitamina D3 Iridium", category: "Vitaminas e bem-estar", price: "R$ 29,90" },
  { name: "Colágeno Max Titanium Tangerina 120g", category: "Vitaminas e bem-estar", price: "R$ 49,90" },
  { name: "BCAA Integralmédica — 90 cápsulas", category: "Performance", price: "R$ 54,90" },
  { name: "Vitamina C Adaptogen — 60 cápsulas", category: "Vitaminas e bem-estar", price: "R$ 54,90" }
];

const grid = document.querySelector("#products");
const search = document.querySelector("#search");
const filterButtons = [...document.querySelectorAll(".filters button")];
let currentCategory = "Todos";

function render() {
  const q = search.value.trim().toLowerCase();
  const filtered = products.filter(p =>
    (currentCategory === "Todos" || p.category === currentCategory) &&
    p.name.toLowerCase().includes(q)
  );

  grid.innerHTML = filtered.map(p => {
    const msg = `Olá! Tenho interesse em *${p.name}*. Vi o preço sugerido de ${p.price} no catálogo da Nivor. Vocês podem confirmar a disponibilidade e o valor final?`;
    const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    return `<article class="card">
      <span class="tag">${p.category}</span>
      <h3>${p.name}</h3>
      <p>Preço sugerido. Consulte disponibilidade e confirme o valor final antes de fechar o pedido.</p>
      <div class="price">${p.price}</div>
      <div class="ref">preço sugerido</div>
      <a class="order" href="${link}" target="_blank" rel="noopener">Consultar no WhatsApp</a>
    </article>`;
  }).join("") || `<p>Nenhum produto encontrado.</p>`;
}

filterButtons.forEach(btn => btn.addEventListener("click", () => {
  filterButtons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentCategory = btn.dataset.category;
  render();
}));

search.addEventListener("input", render);
render();
