const intensList = [];
const root = document.documentElement;

//lista
const sectionShoppingList = document.querySelector(".shopping-list");
const sectionComplete = document.querySelector(".complete-purchase");
const buttonComplete = document.querySelector(".complete-purchase button");

if (!sectionShoppingList.innerHTML.trim()) {
  const empyList = document.createElement("p");
  empyList.textContent = "Sua lista de compras está vazia!";
  empyList.style.color = "var(--color-red)";
  empyList.style.display = "flex";
  empyList.style.justifyContent = "center";
  sectionShoppingList.appendChild(empyList);
  sectionComplete.style.display = "none";
} else {
  sectionComplete.style.display = "block";
}

//modal
const addButton = document.getElementById("add-button");
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("close-modal");
const form = document.getElementById("modal-form");

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

  const itemName = document.getElementById("item-name").value;
  if (itemName.trim()) {
    const addItemInList = confirm(
      `Tem certeza que deseja adicionar? ${itemName}`
    );
    addItemInList === true
      ? intensList.push(itemName)
      : console.log("item não adicionado!");
  }

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  form.reset();
});
