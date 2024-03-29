let items = [];
let total = 0;
// Adicione esta função para carregar os itens do localStorage
function loadItemsFromStorage() {
  const storedItems = localStorage.getItem("shoppingList");
  if (storedItems) {
    items = JSON.parse(storedItems);
    renderItems();
    calculateTotal();
  }
}

// Chame a função loadItemsFromStorage() no início do seu código para carregar os itens salvos
loadItemsFromStorage();
function addItem() {
  const itemInput = document.getElementById("item-input");
  const quantityInput = document.getElementById("quantity-input");
  const priceInput = document.getElementById("price-input");
  if (
    itemInput.value === "" ||
    quantityInput.value === "" ||
    priceInput.value === ""
  ) {
    alert("Por favor, preencha todos os campos");
    return;
  }
  const item = {
    name: itemInput.value,
    quantity: Number.parseInt(quantityInput.value),
    price: Number.parseFloat(priceInput.value),
  };

  items.push(item);
  renderItems();
  calculateTotal();

  itemInput.value = "";
  quantityInput.value = "";
  priceInput.value = "";
}

function renderItems() {
  const itemsList = document.getElementById("items");
  itemsList.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - Qtd: ${
      item.quantity
    } - Preço: ${item.price.toFixed(
      2
    )} <button class="btn btn-danger  btn-sm" onclick="removeItem(${index})">X</button>`;
    itemsList.appendChild(li);
  });
}

function removeItem(index) {
  items.splice(index, 1);
  renderItems();
  calculateTotal();
}

function calculateTotal() {
  total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  document.getElementById("total").textContent = total.toFixed(2);
}

function saveToList() {
  localStorage.setItem("shoppingList", JSON.stringify(items));
  alert("Lista de compras salva com sucesso!");
}
