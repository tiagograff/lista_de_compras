const root = document.documentElement;
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
