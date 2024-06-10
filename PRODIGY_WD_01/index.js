import products from "./product.js";
const productCards = document.querySelector(".product_cards");
const data = products
	.map((item, index) => {
		return `<a href="#" class="product_card">
        <img src="./assets/product_images/f${index + 1}.jpg" alt=${
			item.product_name
		} />
        <div>
            <h1 class="brand_name">${item.product_name}</h1>
            <p class="brand_desc">
                ${item.product_desc}
            </p>
            <div class="price">
                <span class="actual_price">${item.product_price}</span>
            </div>
        </div>
    </a>`;
	})
	.join("");
productCards.innerHTML = data;
document.addEventListener("scroll", () => {
	const navBar = document.getElementsByTagName("nav")[0];
	if (scrollY > 0) {
		navBar.classList.add("scrolled");
	} else {
		navBar.classList.remove("scrolled");
	}
});
