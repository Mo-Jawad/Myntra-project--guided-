const itemsContainerEl = document.querySelector('.items-container');

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

          <button class="btn-add-bag">Add to Bag</button>
        </div>`;
})

itemsContainerEl.innerHTML = innerHtml;