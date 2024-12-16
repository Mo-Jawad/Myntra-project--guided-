let bagItem;
onLoad();


function onLoad() {
  let bagItemStr = localStorage.getItem("bagItems");
  bagItem = bagItemStr ? JSON.parse(bagItemStr) : [];
  displayHomePage();
  displayBagIcon();
}


let addToBag = (itemId) => {
  bagItem.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItem));
  displayBagIcon();
}

function displayBagIcon() {
  const bagItemCountEl = document.querySelector(".bag-item-count");
  if(bagItem.length > 0) {
    bagItemCountEl.style.visibility = "visible";
  bagItemCountEl.innerText = bagItem.length;
  } else {
    bagItemCountEl.style.visibility = "hidden";
  }
};

function displayHomePage() {
const itemsContainerEl = document.querySelector('.items-container');

if (!itemsContainerEl) {
  return;
}

let innerHtml = '';
items.forEach(item => {
    innerHtml += `<div class="item-con">
          <img src="${item.image}" alt="💍" />
          <div class="rating">${item.rating.stars} 🌟 | ${item.rating.count}</div>
          <div class="company-name"> ${item.company} </div>
          <div class="item-name"> ${item.item_name} </div>

          <section class="price">
            <span class="current-price">TK ${item.current_price}</span>
            <span class="orginal-price">TK ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage}% OFF)</span>
          </section>

          <button class="btn-add-bag" onClick="addToBag(${item.id})">Add to Bag</button>
        </div>`;
})

itemsContainerEl.innerHTML = innerHtml;

}