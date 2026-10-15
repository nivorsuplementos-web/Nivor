const WHATSAPP = "5592994652632";

// Preços sugeridos para venda. Confirme estoque, custo final e frete antes de fechar cada pedido.
const products = [
  { name: "Creatina Max Titanium 300g", category: "Creatina", price: "R$ 59,90", image: "creatina-max" },
  { name: "Creatina Turbo Black Skull 300g", category: "Creatina", price: "R$ 54,90", image: "creatina-blackskull" },
  { name: "Nutri Whey Integralmédica 1,2kg — Baunilha", category: "Proteínas", price: "R$ 99,90", image: "nutri-whey-baunilha" },
  { name: "Nutri Whey Integralmédica 1,2kg — Chocolate", category: "Proteínas", price: "R$ 99,90", image: "nutri-whey-chocolate" },
  { name: "Mega Whey Protein Iridium 900g — Chocolate", category: "Proteínas", price: "R$ 79,90", image: "mega-whey" },
  { name: "Mass Titanium Max Titanium 3kg — Baunilha", category: "Ganho de massa", price: "R$ 119,90", image: "mass-titanium" },
  { name: "2Hot Max Titanium 200g", category: "Pré-treino", price: "R$ 79,90", image: "2hot" },
  { name: "Hydra Glutamina Iridium 300g", category: "Performance", price: "R$ 74,90", image: "glutamina" },
  { name: "Cafeína BodyAction — 60 cápsulas", category: "Performance", price: "R$ 49,90", image: "cafeina" },
  { name: "Poseidon Ômega 3 Iridium — 60 cápsulas", category: "Vitaminas e bem-estar", price: "R$ 79,90", image: "omega3" },
  { name: "Vitamina D3 Iridium", category: "Vitaminas e bem-estar", price: "R$ 29,90", image: "vitamina-d3" },
  { name: "Colágeno Max Titanium Tangerina 120g", category: "Vitaminas e bem-estar", price: "R$ 49,90", image: "colageno" },
  { name: "BCAA Integralmédica — 90 cápsulas", category: "Performance", price: "R$ 54,90", image: "bcaa" },
  { name: "Vitamina C Adaptogen — 60 cápsulas", category: "Vitaminas e bem-estar", price: "R$ 54,90", image: "vitamina-c" }
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
      <div class="product-image-wrap"><img class="product-image" src="images/${p.image}.svg" alt="Ilustração ilustrativa de ${p.name}" loading="lazy"><span>Imagem ilustrativa</span></div>
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
