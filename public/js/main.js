const itemsList = JSON.parse(localStorage.getItem("shoppingList")) || [];
const sectionShoppingList = document.querySelector(".shopping-list");
const sectionComplete = document.querySelector(".complete-purchase");
const buttonComplete = document.querySelector(".complete-purchase__button");
let index = 0;
const modal = document.getElementById("modal");
const form = document.getElementById("modal-form");
const addButton = document.getElementById("add-button");
const closeModalButton = document.getElementById("close-modal");

function saveToLocalStorage() {
  localStorage.setItem("shoppingList", JSON.stringify(itemsList));
}
const existingSubtitle = document.querySelector(".shopping-list-title");

function renderShoppingList() {
  // Limpa o conteúdo atual da seção de lista
  sectionShoppingList.innerHTML = "";

  if (itemsList.length === 0) {
    // Lista vazia: exibir mensagem
    const emptyListMessage = document.createElement("p");
    emptyListMessage.textContent = "Sua lista de compras está vazia!";
    emptyListMessage.style.color = "var(--color-red)";
    emptyListMessage.style.display = "flex";
    emptyListMessage.style.justifyContent = "center";
    sectionShoppingList.appendChild(emptyListMessage);
    sectionComplete.style.display = "none";
  } else {
    // Lista não vazia: exibir subtítulo e itens
    sectionComplete.style.display = "block";

    // Verificar e adicionar subtítulo
    const subtitle = document.createElement("h2");
    subtitle.textContent = "Lista de Compras:";
    subtitle.classList.add("shopping-list-title");
    subtitle.style.fontSize = "var(--font-subtitle)";
    subtitle.style.fontWeight = "normal";
    subtitle.style.padding = "0 0 50px 50px";
    sectionShoppingList.appendChild(subtitle);

    // Renderizar itens
    itemsList.forEach((item, index) => {
      const listItem = document.createElement("div");
      listItem.classList.add("shopping-item");

      const itemName = document.createElement("label");
      itemName.textContent = item;
      itemName.htmlFor = `item item-${index + 1}`;

      const itemCheck = document.createElement("input");
      itemCheck.type = "checkbox";
      itemCheck.id = `item item-${index + 1}`;
      itemCheck.name = `item item-${index + 1}`;

      const deleteImage = document.createElement("img");
      deleteImage.src = "./public/img/remove.svg";
      deleteImage.alt = "Remover item";
      deleteImage.style.width = "25px";

      const deleteButton = document.createElement("button");
      deleteButton.style.background = "none";
      deleteButton.style.border = "none";
      deleteButton.appendChild(deleteImage);
      deleteButton.addEventListener("click", () => {
        itemsList.splice(index, 1);
        saveToLocalStorage();
        renderShoppingList();
      });

      listItem.appendChild(itemCheck);
      listItem.appendChild(itemName);
      listItem.appendChild(deleteButton);

      listItem.style.paddingLeft = "50px";
      listItem.style.display = "flex";
      listItem.style.justifyContent = "flex-start";
      listItem.style.alignItems = "center";
      listItem.style.gap = "10px";

      sectionShoppingList.appendChild(listItem);
    });
  }
}

addButton.addEventListener("click", () => {
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
});

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const itemName = document.getElementById("item-name").value.trim();
  if (itemName) {
    const addItemInList = confirm(
      `Tem certeza que deseja adicionar? ${itemName}`
    );
    if (addItemInList) {
      itemsList.push(itemName);
      saveToLocalStorage();
      renderShoppingList();
    }
  }

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  form.reset();
});

buttonComplete.addEventListener("click", () => {
  const confirmPurchase = confirm("Deseja finalizar a compra?");
  if (confirmPurchase) {
    itemsList.splice(0, itemsList.length);
    saveToLocalStorage();
    renderShoppingList();
  }
});

renderShoppingList();
