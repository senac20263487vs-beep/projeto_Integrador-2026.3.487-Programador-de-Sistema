
// Base de dados inicial conforme as imagens do protótipo
let products = [
  { id: 1, name: 'Arroz', validity: '2028', price: 22.50, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Feijão', validity: '2028', price: 8.90, img: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=300&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Macarrão instantâneo', validity: '2026', price: 2.50, img: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Milho para pipoca', validity: '2027', price: 4.80, img: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=300&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Biscoito recheado', validity: '2026', price: 3.20, img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Pepsi', validity: '2029', price: 6.00, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=80' },
  { id: 7, name: 'peça de picanha', validity: '2029', price: 69.90, img: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=300&auto=format&fit=crop&q=80' }
];

let cart = [];

// Função para renderizar os produtos nos cards
function renderProducts(filterText = '') {
  const filtered = products.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()) || p.validity.includes(filterText));

  const generateCardsHTML = (isPDV = false) => filtered.map(p => `
    <div class="product-card" ${isPDV ? `onclick="addToCart(${p.id})"` : ''} style="${isPDV ? 'cursor: pointer;' : ''}">
      <div class="pill-title">${p.name}</div>
      <div class="product-image-container">
        <img src="${p.img}" alt="${p.name}">
      </div>
      <div class="pill-validity">Válido até: ${p.validity}</div>
    </div>
  `).join('');

  document.getElementById('grid-dashboard').innerHTML = generateCardsHTML();
  document.getElementById('grid-produtos').innerHTML = generateCardsHTML();
  document.getElementById('grid-validade').innerHTML = generateCardsHTML();
  document.getElementById('grid-pdv').innerHTML = generateCardsHTML(true);

  document.getElementById('total-count').innerText = products.length;
}

// Alternar entre as abas do sistema
function switchTab(tabId, element) {
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

  const selectedView = document.getElementById(`${tabId}-view`);
  if (selectedView) {
    selectedView.classList.add('active');
  }

  if (element) {
    element.classList.add('active');
  }

  const titleMap = {
    'dashboard': 'Dashboard',
    'produtos': 'Produtos',
    'insumos': 'Insumos',
    'demanda': 'Demanda',
    'validade': 'Validade de produtos',
    'alertas': 'Alertas de estoque',
    'caixa': 'Caixa e PDV'
  };
  
  document.getElementById('page-title').innerText = titleMap[tabId] || 'São João Alimentos';
}

// Filtro de pesquisa
function filterProducts() {
  const query = document.getElementById('searchInput').value;
  renderProducts(query);
}

// Funções do Carrinho / PDV
function addToCart(productId) {
  const prod = products.find(p => p.id === productId);
  if (prod) {
    cart.push(prod);
    updateCartUI();
  }
}

function updateCartUI() {
  const cartList = document.getElementById('cart-list');
  if (cart.length === 0) {
    cartList.innerHTML = '<p style="color: #999; margin-top: 20px;">Clique nos produtos para adicionar ao carrinho.</p>';
    document.getElementById('cart-total').innerText = 'R$ 0,00';
    return;
  }

  let total = 0;
  cartList.innerHTML = cart.map((item, index) => {
    total += item.price;
    return `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>R$ ${item.price.toFixed(2)} <i class="fa-solid fa-trash" style="color: red; cursor: pointer; margin-left: 8px;" onclick="removeFromCart(${index})"></i></span>
      </div>
    `;
  }).join('');

  document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function checkout() {
  if (cart.length === 0) {
    alert('O carrinho está vazio!');
    return;
  }
  alert('Venda finalizada com sucesso!');
  cart = [];
  updateCartUI();
}

// Gestão de Modal
function openModal() {
  document.getElementById('productModal').classList.add('active');
}

function closeModal() {
  document.getElementById('productModal').classList.remove('active');
}

function addProduct() {
  const name = document.getElementById('p-name').value;
  const validity = document.getElementById('p-validity').value;
  const img = document.getElementById('p-img').value || 'https://via.placeholder.com/150';
  const price = parseFloat(document.getElementById('p-price').value) || 0;

  if (!name || !validity) {
    alert('Preencha o nome e a validade!');
    return;
  }

  products.push({
    id: Date.now(),
    name,
    validity,
    price,
    img
  });

  renderProducts();
  closeModal();

  // Limpar campos
  document.getElementById('p-name').value = '';
  document.getElementById('p-validity').value = '';
  document.getElementById('p-img').value = '';
  document.getElementById('p-price').value = '';
}

// Inicializar a página
renderProducts();

