const WHATSAPP = "5592994652632";
const products = [("Whey 100% Max Titanium 900g", "Proteínas", "R$ 147,99"), ("Whey 3W Max Titanium 900g", "Proteínas", "R$ 179,99"), ("Whey Femini Max Titanium 900g", "Proteínas", "R$ 112,99"), ("Nutri Whey Integralmedica 900g", "Proteínas", "R$ 75,49"), ("Whey 3W Tasty Whey 900g", "Proteínas", "R$ 212,99"), ("Creatina Max Titanium 300g", "Creatina", "R$ 64,99"), ("Creatina Integralmedica 300g", "Creatina", "R$ 69,99"), ("Creatina Adaptogen 300g", "Creatina", "R$ 99,99"), ("Glutamina Black Skull 150g", "Performance", "R$ 34,99"), ("Pré-treino Black Skull B.O.P.E. 150g", "Performance", "R$ 42,99"), ("Pré-treino Dila Pump 318g", "Performance", "R$ 108,99"), ("Cafeína 60 cápsulas", "Performance", "R$ 29,90"), ("Beta-alanina 200g", "Performance", "R$ 59,90"), ("Citrulina 200g", "Performance", "R$ 69,90"), ("BCAA", "Performance", "R$ 49,90"), ("Hipercalórico 3kg", "Ganho de massa", "R$ 129,90"), ("Maltodextrina 1kg", "Ganho de massa", "R$ 34,90"), ("Palatinose 500g", "Ganho de massa", "R$ 54,90"), ("L-Carnitina", "Saúde", "R$ 59,90"), ("Termogênico 60 cápsulas", "Saúde", "R$ 79,90"), ("Multivitamínico", "Vitaminas", "R$ 49,90"), ("Ômega 3", "Saúde", "R$ 39,90"), ("Vitamina D3", "Vitaminas", "R$ 29,90"), ("Magnésio", "Vitaminas", "R$ 39,90"), ("Colágeno Hidrolisado", "Saúde", "R$ 49,90")].map(([name, category, price]) => ({name, category, price}));

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
    const msg = `Olá! Tenho interesse em *${p.name}*. O preço de referência no catálogo é ${p.price}. Gostaria de consultar disponibilidade e valor final.`;
    const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    return `<article class="card">
      <span class="tag">${p.category}</span>
      <h3>${p.name}</h3>
      <p>Preço de referência. Consulte disponibilidade e valor final antes de fechar o pedido.</p>
      <div class="price">${p.price}</div>
      <div class="ref">preço de referência</div>
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
