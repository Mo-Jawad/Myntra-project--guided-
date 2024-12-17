const CONVENIENCE_FEES = 99;
let bagItemObjects;
onLoad();

function onLoad() {
    loadBagItemObjects();
    displayBagItem();
    displayBagSummary();
}

function loadBagItemObjects() {
    console.log(bagItem);
    bagItemObjects = bagItem.map(itemId => {
      for (let i = 0; i < items.length; i++) {
        if (itemId == items[i].id) {
          return items[i];
        }
      }
    });
    console.log(bagItemObjects);
  }

function displayBagItem() {
    const ContainerEl = document.querySelector(".bag-items-container");
    let innerHtml = '';

    bagItemObjects.forEach(bagItem => {
        innerHtml += generateItemHTML(bagItem);
    });
    ContainerEl.innerHTML = innerHtml;
}

function generateItemHTML(item) {
    return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.image}" />
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">
                ${item.item_name}
              </div>
              <div class="price-container">
                <span class="current-price">Tk ${item.current_price}</span>
                <span class="original-price">Tk ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onClick="removeFromBag(${item.id})">X</div>
          </div>`;
}

function removeFromBag(itemId) {
    bagItem = bagItem.filter(bagItemId => bagItemId != itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItem));
    loadBagItemObjects();
    displayBagIcon();
    displayBagItem();
    displayBagSummary();
  }

function displayBagSummary() {
    let bigSummeryEl = document.querySelector(".bag-summary");
    let totalItem = bagItemObjects.length;
    let totalTK = 0;
    let totalDiscount = 0;

    bagItemObjects.forEach(bagItem => {
        totalTK += bagItem.original_price;
        totalDiscount += bagItem.original_price - bagItem.current_price;
      });
    
    let finalPayment = totalTK - totalDiscount + CONVENIENCE_FEES;

    bigSummeryEl.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items)</div>
            <div class="price-item">
              <span class="price-item-tag">Total TK</span>
              <span class="price-item-value">TK ${totalTK}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on TK</span>
              <span class="price-item-value priceDetail-base-discount"
                >TK ${totalDiscount}</span
              >
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">TK 99</span>
            </div>
            <hr />
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">TK ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`
}