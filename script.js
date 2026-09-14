/* =========================================================
   CANTINA OLIVEIRA — Cardápio Digital Web
   Dados dos produtos + lógica do sistema de pedidos
   ========================================================= */

const CATEGORIES = [
  { id: "entradas", label: "Entradas" },
  { id: "principais", label: "Prato Principal" },
  { id: "sobremesas", label: "Sobremesas" },
  { id: "bebidas", label: "Bebidas" },
  { id: "vinhos", label: "Carta de Vinhos" },
];

const WAITER_FEE_RATE = 0.10;

/* ---------- PRODUTOS (30 por categoria = 150 no total) ---------- */

const rawProducts = {
  entradas: [
    ["Bruschetta clássica", "Pão italiano tostado, tomate e manjericão", 24],
    ["Bruschetta de tomate seco", "Tomate seco, ricota e azeite trufado", 27],
    ["Carpaccio de carne", "Fatias finas de alcatra, alcaparras e parmesão", 42],
    ["Carpaccio de salmão", "Salmão curado, molho cítrico e endro", 46],
    ["Burrata com tomates", "Burrata cremosa, tomates confitados e manjericão", 39],
    ["Salada Caprese", "Muçarela de búfala, tomate e manjericão fresco", 32],
    ["Antipasto italiano", "Seleção de frios, queijos e azeitonas", 48],
    ["Polenta frita", "Cubos crocantes com molho de ervas", 22],
    ["Pão de alho artesanal", "Pão rústico com manteiga de alho e ervas", 18],
    ["Coxinha de frango", "Massa cremosa recheada com frango desfiado (6 un.)", 26],
    ["Bolinho de bacalhau", "Receita tradicional portuguesa (6 un.)", 34],
    ["Bolinho de aipim com carne seca", "Aipim amassado e carne seca desfiada (6 un.)", 30],
    ["Camarão empanado", "Camarões crocantes com molho tártaro", 44],
    ["Anéis de lula", "Lula empanada com limão siciliano", 38],
    ["Ceviche de peixe branco", "Peixe branco marinado em limão e pimenta", 41],
    ["Tábua de frios", "Queijos, presuntos e geleia artesanal", 52],
    ["Croquete de carne", "Croquetes crocantes com recheio cremoso (6 un.)", 28],
    ["Pastel de queijo", "Massa fina e crocante (5 un.)", 24],
    ["Pastel de carne", "Recheio de carne moída temperada (5 un.)", 25],
    ["Empanada argentina", "Massa amanteigada com recheio de carne (4 un.)", 29],
    ["Vitello tonnato", "Vitela fatiada com molho de atum", 45],
    ["Salpicão de frango", "Frango desfiado, maionese e legumes", 27],
    ["Torresmo crocante", "Porções sequinhas servidas com farofa", 26],
    ["Provolone à milanesa", "Queijo empanado e gratinado com orégano", 30],
    ["Escargot ao alho e ervas", "Escargots gratinados com manteiga de ervas", 49],
    ["Hummus com pão sírio", "Pasta de grão-de-bico e páprica defumada", 23],
    ["Guacamole com nachos", "Abacate fresco e totopos crocantes", 25],
    ["Rolinho primavera", "Legumes crocantes em massa filo (5 un.)", 24],
    ["Tartar de atum", "Atum fresco, gergelim e molho shoyu", 43],
    ["Focaccia com azeite e alecrim", "Pão italiano assado na hora", 20],
  ],
  principais: [
    ["Risoto de camarão", "Arroz cremoso, camarões e toque de limão siciliano", 68],
    ["Risoto de funghi", "Risoto cremoso com mix de cogumelos frescos", 62],
    ["Risoto de limão siciliano", "Risoto leve com raspas e suco de limão siciliano", 58],
    ["Espaguete à carbonara", "Massa artesanal, pancetta, gema e parmesão", 54],
    ["Fettuccine ao molho branco", "Massa fresca com molho branco cremoso", 52],
    ["Lasanha à bolonhesa", "Camadas de massa, molho bolonhesa e queijo gratinado", 56],
    ["Nhoque ao sugo", "Nhoque de batata artesanal ao molho de tomate", 48],
    ["Penne ao pesto", "Massa curta com molho pesto de manjericão", 50],
    ["Talharim ao molho de tomate", "Massa fresca ao molho de tomate e manjericão", 46],
    ["Filé mignon ao molho madeira", "Filé grelhado ao ponto com molho madeira", 78],
    ["Filé à parmegiana", "Filé empanado, molho de tomate e queijo gratinado", 72],
    ["Picanha na chapa", "Picanha grelhada com farofa e vinagrete", 84],
    ["Costela ao vinho tinto", "Costela cozida lentamente ao vinho tinto", 76],
    ["Frango à parmegiana", "Filé de frango empanado e gratinado", 58],
    ["Frango grelhado com legumes", "Peito de frango grelhado e legumes salteados", 52],
    ["Salmão grelhado com aspargos", "Salmão no ponto com aspargos salteados", 74],
    ["Bacalhau à portuguesa", "Lascas de bacalhau, batatas e azeitonas", 89],
    ["Polvo à lagareiro", "Polvo assado com batatas ao azeite", 92],
    ["Camarão na moranga", "Camarões ao creme servidos em moranga", 79],
    ["Moqueca de peixe", "Peixe branco ao leite de coco e dendê", 81],
    ["Feijoada completa", "Feijoada tradicional com acompanhamentos", 64],
    ["Strogonoff de carne", "Strogonoff cremoso servido com arroz e batata palha", 58],
    ["Strogonoff de frango", "Strogonoff de frango com arroz e batata palha", 52],
    ["Osso buco", "Ossobuco cozido lentamente ao molho gremolata", 82],
    ["Cordeiro ao alecrim", "Pernil de cordeiro assado com ervas frescas", 96],
    ["Pizza margherita", "Molho de tomate, muçarela e manjericão fresco", 49],
    ["Pizza calabresa", "Calabresa fatiada, cebola e azeitonas", 52],
    ["Tagliatelle ao ragù", "Massa fresca com ragù de carne lento", 57],
    ["Paella marinera", "Arroz com frutos do mar e açafrão (serve 2)", 118],
    ["Peixe ao molho de maracujá", "Filé de peixe branco com molho de maracujá", 71],
  ],
  sobremesas: [
    ["Tiramisù", "Clássico italiano com café e mascarpone", 28],
    ["Panna cotta de frutas vermelhas", "Creme italiano com calda de frutas vermelhas", 26],
    ["Petit gâteau", "Bolo de chocolate quente com sorvete de creme", 30],
    ["Pudim de leite", "Receita tradicional com calda de caramelo", 22],
    ["Mousse de chocolate", "Mousse aerada de chocolate meio amargo", 20],
    ["Mousse de maracujá", "Mousse leve e cítrica de maracujá", 20],
    ["Cheesecake de frutas vermelhas", "Base amanteigada com calda de frutas vermelhas", 27],
    ["Cheesecake de doce de leite", "Cheesecake cremoso com doce de leite", 27],
    ["Torta de limão", "Torta de limão com merengue maçaricado", 25],
    ["Torta de nozes", "Torta amanteigada com nozes caramelizadas", 26],
    ["Brigadeiro gourmet", "Trio de brigadeiros artesanais", 18],
    ["Brownie com sorvete", "Brownie de chocolate quente com sorvete de creme", 24],
    ["Sorvete artesanal (3 bolas)", "Sabores à escolha do cliente", 19],
    ["Sorbet de frutas", "Sorbet refrescante de frutas da estação", 18],
    ["Crème brûlée", "Creme francês com casquinha de açúcar caramelizado", 26],
    ["Bolo de chocolate quente", "Bolo macio com recheio cremoso de chocolate", 23],
    ["Torta holandesa", "Torta gelada de chocolate crocante", 24],
    ["Romeu e Julieta", "Goiabada com queijo minas", 17],
    ["Cannoli siciliano", "Massa crocante recheada com creme de ricota", 22],
    ["Profiteroles", "Bomba de massa choux com sorvete e calda de chocolate", 25],
    ["Doce de abóbora com coco", "Doce cremoso com toque de coco", 18],
    ["Banana caramelizada com sorvete", "Banana flambada com sorvete de creme", 22],
    ["Salada de frutas", "Frutas frescas da estação", 16],
    ["Churros com doce de leite", "Churros crocantes recheados (6 un.)", 21],
    ["Tarte tatin", "Torta de maçã caramelizada invertida", 26],
    ["Bombom de chocolate belga", "Seleção de bombons artesanais (4 un.)", 20],
    ["Panqueca doce de Nutella", "Panqueca fina recheada com creme de avelã", 23],
    ["Torta de maçã", "Torta amanteigada com maçãs e canela", 24],
    ["Quindim", "Doce tradicional de coco e gemas", 16],
    ["Pavê de chocolate", "Camadas de biscoito e creme de chocolate", 21],
  ],
  bebidas: [
    ["Água mineral com gás", "Garrafa 500ml", 8],
    ["Água mineral sem gás", "Garrafa 500ml", 7],
    ["Refrigerante cola", "Lata 350ml", 9],
    ["Refrigerante guaraná", "Lata 350ml", 9],
    ["Suco de laranja natural", "Copo 400ml, feito na hora", 14],
    ["Suco de maracujá", "Copo 400ml, feito na hora", 14],
    ["Suco de abacaxi com hortelã", "Copo 400ml, feito na hora", 15],
    ["Suco de morango", "Copo 400ml, feito na hora", 15],
    ["Limonada suíça", "Limonada cremosa e gelada", 13],
    ["Chá gelado de pêssego", "Copo 400ml, servido com gelo", 12],
    ["Café expresso", "Grão selecionado, torra média", 8],
    ["Café com leite", "Café expresso com leite vaporizado", 10],
    ["Cappuccino", "Espresso, leite vaporizado e canela", 12],
    ["Chocolate quente", "Chocolate cremoso com raspas", 13],
    ["Água tônica", "Lata 350ml", 9],
    ["Caipirinha", "Cachaça, limão e açúcar", 22],
    ["Caipiroska", "Vodka, limão e açúcar", 24],
    ["Mojito", "Rum, hortelã, limão e água com gás", 26],
    ["Gin tônica", "Gin, água tônica e especiarias", 28],
    ["Aperol spritz", "Aperol, espumante e água com gás", 27],
    ["Negroni", "Gin, campari e vermute tinto", 29],
    ["Cerveja pilsen", "Garrafa 600ml", 18],
    ["Cerveja IPA artesanal", "Garrafa 500ml", 22],
    ["Cerveja weiss", "Garrafa 500ml", 22],
    ["Chopp claro", "Chope 500ml", 15],
    ["Vinho da casa (taça)", "Tinto ou branco, taça 150ml", 19],
    ["Espumante (taça)", "Espumante brut nacional, taça 150ml", 21],
    ["Milkshake de chocolate", "Sorvete cremoso batido com chocolate", 19],
    ["Milkshake de morango", "Sorvete cremoso batido com morango", 19],
    ["Água de coco", "Copo 400ml, gelada", 11],
  ],
  vinhos: [
    ["Cabernet Sauvignon Reserva", "Tinto encorpado, notas de frutas escuras", 98],
    ["Merlot Chileno", "Tinto macio, taninos suaves", 79],
    ["Malbec Argentino", "Tinto frutado, ideal com carnes vermelhas", 89],
    ["Syrah Australiano", "Tinto encorpado com notas de especiarias", 105],
    ["Pinot Noir Chileno", "Tinto leve e elegante", 92],
    ["Sangiovese Italiano", "Tinto seco com acidez marcante", 96],
    ["Tempranillo Espanhol", "Tinto equilibrado, notas amadeiradas", 88],
    ["Corte Bordalês Nacional", "Blend tinto encorpado", 110],
    ["Carménère Chileno", "Tinto intenso com notas defumadas", 84],
    ["Nebbiolo Italiano", "Tinto estruturado, típico do Piemonte", 130],
    ["Chardonnay Reserva", "Branco encorpado com notas amanteigadas", 95],
    ["Sauvignon Blanc Neozelandês", "Branco fresco e cítrico", 99],
    ["Riesling Alemão", "Branco leve e levemente adocicado", 102],
    ["Pinot Grigio Italiano", "Branco leve e refrescante", 84],
    ["Viognier Chileno", "Branco aromático, notas florais", 86],
    ["Gewürztraminer", "Branco perfumado, notas de lichia", 108],
    ["Verdejo Espanhol", "Branco fresco com notas herbáceas", 81],
    ["Torrontés Argentino", "Branco aromático e frutado", 78],
    ["Rosé Provençal", "Rosé seco e elegante", 96],
    ["Rosé Nacional", "Rosé leve e frutado", 68],
    ["Espumante Brut Nacional", "Espumante seco, borbulhas finas", 72],
    ["Prosecco Italiano", "Espumante leve e frutado", 89],
    ["Moscatel Espumante", "Espumante doce e aromático", 65],
    ["Champagne Brut Importado", "Espumante francês tradicional", 320],
    ["Vinho do Porto", "Fortificado, doce e encorpado", 74],
    ["Sauternes", "Branco doce francês, notas de mel", 145],
    ["Vinho Verde Português", "Branco leve e levemente frisante", 76],
    ["Reserva Especial da Casa (tinto)", "Seleção exclusiva do sommelier", 115],
    ["Reserva Especial da Casa (branco)", "Seleção exclusiva do sommelier", 112],
    ["Espumante Rosé Brut", "Espumante rosé seco e delicado", 94],
  ],
};

const products = [];
let __id = 1;
for (const cat of Object.keys(rawProducts)) {
  for (const [name, desc, price] of rawProducts[cat]) {
    products.push({ id: __id++, name, desc, price, category: cat });
  }
}

/* ---------- Estado do pedido ---------- */

const cart = new Map(); // productId -> quantity
let waiterFeeEnabled = true;
let activeCategory = "todas";
let searchTerm = "";

/* ---------- Utilidades ---------- */

function brl(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getProduct(id) {
  return products.find((p) => p.id === id);
}

function categoryLabel(id) {
  const c = CATEGORIES.find((c) => c.id === id);
  return c ? c.label : id;
}

/* ---------- Renderização do cardápio ---------- */

const menuGrid = document.getElementById("menu-grid");
const categoryNav = document.getElementById("category-nav");
const searchInput = document.getElementById("search-input");
const resultsCount = document.getElementById("results-count");

function buildCategoryNav() {
  const allBtn = document.createElement("button");
  allBtn.className = "cat-pill is-active";
  allBtn.textContent = "Todas";
  allBtn.dataset.category = "todas";
  categoryNav.appendChild(allBtn);

  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "cat-pill";
    btn.textContent = cat.label;
    btn.dataset.category = cat.id;
    categoryNav.appendChild(btn);
  });

  categoryNav.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-pill");
    if (!btn) return;
    activeCategory = btn.dataset.category;
    [...categoryNav.children].forEach((c) => c.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderMenu();
  });
}

function filteredProducts() {
  return products.filter((p) => {
    const matchesCategory = activeCategory === "todas" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function renderMenu() {
  const list = filteredProducts();
  menuGrid.innerHTML = "";

  resultsCount.textContent = `${list.length} ${list.length === 1 ? "item" : "itens"}`;

  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Nenhum prato encontrado. Tente outro termo de busca ou categoria.";
    menuGrid.appendChild(empty);
    return;
  }

  // Group by category so the section headers make sense when "Todas" is active
  const groups = {};
  list.forEach((p) => {
    (groups[p.category] = groups[p.category] || []).push(p);
  });

  const order = activeCategory === "todas" ? CATEGORIES.map((c) => c.id) : [activeCategory];

  order.forEach((catId) => {
    const items = groups[catId];
    if (!items || items.length === 0) return;

    const section = document.createElement("section");
    section.className = "menu-section";

    const heading = document.createElement("h3");
    heading.className = "menu-section-title";
    heading.textContent = categoryLabel(catId);
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "product-grid";

    items.forEach((p) => grid.appendChild(renderProductCard(p)));
    section.appendChild(grid);
    menuGrid.appendChild(section);
  });
}

function renderProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  card.innerHTML = `
    <div class="product-card-top">
      <h4 class="product-name">${product.name}</h4>
      <span class="product-price">${brl(product.price)}</span>
    </div>
    <p class="product-desc">${product.desc}</p>
    <button class="btn-add" data-id="${product.id}">Adicionar ao pedido</button>
  `;

  card.querySelector(".btn-add").addEventListener("click", () => {
    addToCart(product.id);
  });

  return card;
}

/* ---------- Carrinho / "Meu Pedido" ---------- */

const orderList = document.getElementById("order-list");
const orderEmpty = document.getElementById("order-empty");
const subtotalEl = document.getElementById("subtotal-value");
const waiterFeeEl = document.getElementById("waiter-fee-value");
const totalEl = document.getElementById("total-value");
const waiterFeeToggle = document.getElementById("waiter-fee-toggle");
const finalizeBtn = document.getElementById("finalize-btn");
const cartCountBadge = document.getElementById("cart-count-badge");

function addToCart(id) {
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
  pulseCartBadge();
}

function changeQuantity(id, delta) {
  const current = cart.get(id) || 0;
  const next = current + delta;
  if (next <= 0) {
    cart.delete(id);
  } else {
    cart.set(id, next);
  }
  renderCart();
}

function removeFromCart(id) {
  cart.delete(id);
  renderCart();
}

function cartTotals() {
  let subtotal = 0;
  cart.forEach((qty, id) => {
    const p = getProduct(id);
    if (p) subtotal += p.price * qty;
  });
  const fee = waiterFeeEnabled ? subtotal * WAITER_FEE_RATE : 0;
  return { subtotal, fee, total: subtotal + fee };
}

function renderCart() {
  orderList.innerHTML = "";
  const items = [...cart.entries()];

  orderEmpty.style.display = items.length === 0 ? "block" : "none";
  finalizeBtn.disabled = items.length === 0;

  let itemCount = 0;

  items.forEach(([id, qty]) => {
    const product = getProduct(id);
    if (!product) return;
    itemCount += qty;

    const row = document.createElement("li");
    row.className = "order-item";
    row.innerHTML = `
      <div class="order-item-info">
        <span class="order-item-name">${product.name}</span>
        <span class="order-item-unit">${brl(product.price)} / un.</span>
      </div>
      <div class="order-item-controls">
        <button class="qty-btn" data-action="decrease" aria-label="Diminuir quantidade">−</button>
        <span class="qty-value">${qty}</span>
        <button class="qty-btn" data-action="increase" aria-label="Aumentar quantidade">+</button>
      </div>
      <div class="order-item-total">${brl(product.price * qty)}</div>
      <button class="remove-btn" data-action="remove" aria-label="Remover produto">✕</button>
    `;

    row.querySelector('[data-action="increase"]').addEventListener("click", () => changeQuantity(id, 1));
    row.querySelector('[data-action="decrease"]').addEventListener("click", () => changeQuantity(id, -1));
    row.querySelector('[data-action="remove"]').addEventListener("click", () => removeFromCart(id));

    orderList.appendChild(row);
  });

  const { subtotal, fee, total } = cartTotals();
  subtotalEl.textContent = brl(subtotal);
  waiterFeeEl.textContent = brl(fee);
  totalEl.textContent = brl(total);

  cartCountBadge.textContent = itemCount;
  cartCountBadge.style.display = itemCount > 0 ? "inline-flex" : "none";
}

function pulseCartBadge() {
  cartCountBadge.classList.remove("pulse");
  void cartCountBadge.offsetWidth; // restart animation
  cartCountBadge.classList.add("pulse");
}

waiterFeeToggle.addEventListener("change", () => {
  waiterFeeEnabled = waiterFeeToggle.checked;
  renderCart();
});

/* ---------- Busca ---------- */

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderMenu();
});

/* ---------- Finalização do pedido ---------- */

const modal = document.getElementById("checkout-modal");
const modalClose = document.getElementById("modal-close");
const checkoutForm = document.getElementById("checkout-form");
const customerNameInput = document.getElementById("customer-name");
const tableNumberInput = document.getElementById("table-number");

const summaryModal = document.getElementById("summary-modal");
const summaryClose = document.getElementById("summary-close");
const summaryContent = document.getElementById("summary-content");
const newOrderBtn = document.getElementById("new-order-btn");

finalizeBtn.addEventListener("click", () => {
  if (cart.size === 0) return;
  modal.showModal();
});

modalClose.addEventListener("click", () => modal.close());

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = customerNameInput.value.trim();
  const table = tableNumberInput.value.trim();
  if (!name || !table) return;

  modal.close();
  showOrderSummary(name, table);
});

function showOrderSummary(name, table) {
  const { subtotal, fee, total } = cartTotals();
  const orderNumber = Math.floor(1000 + Math.random() * 9000);

  let rows = "";
  cart.forEach((qty, id) => {
    const p = getProduct(id);
    if (!p) return;
    rows += `
      <tr>
        <td>${p.name}</td>
        <td class="num">${qty}</td>
        <td class="num">${brl(p.price * qty)}</td>
      </tr>
    `;
  });

  summaryContent.innerHTML = `
    <p class="summary-order-number">Pedido nº ${orderNumber}</p>
    <div class="summary-meta">
      <div><span>Cliente</span><strong>${name}</strong></div>
      <div><span>Mesa</span><strong>${table}</strong></div>
    </div>
    <table class="summary-table">
      <thead>
        <tr><th>Item</th><th class="num">Qtd.</th><th class="num">Total</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="summary-totals">
      <div><span>Subtotal</span><span>${brl(subtotal)}</span></div>
      <div><span>Garçom (10%)${waiterFeeEnabled ? "" : " — não incluído"}</span><span>${brl(fee)}</span></div>
      <div class="summary-total-final"><span>Total</span><span>${brl(total)}</span></div>
    </div>
  `;

  summaryModal.showModal();
}

summaryClose.addEventListener("click", () => summaryModal.close());

newOrderBtn.addEventListener("click", () => {
  cart.clear();
  checkoutForm.reset();
  renderCart();
  summaryModal.close();
});

/* ---------- Inicialização ---------- */

buildCategoryNav();
renderMenu();
renderCart();
