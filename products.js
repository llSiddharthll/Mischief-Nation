function renderProduct(product) {
  const productGrid = document.getElementById("productGrid");
  
  // Create a link for the product
  const productLink = document.createElement("a");
  productLink.href = `details.html?id=${product.id}`; // Assuming you have a unique identifier for each product, like an 'id'
  productLink.classList.add("transition", "duration-300", "bg-gray-200", "hover:shadow-xl");

  const productCard = document.createElement("div");
  productCard.classList.add(
    "p-4",
    "transition",
    "duration-300",
    "bg-gray-200",
    "rounded-lg"
  );

  // Product Image
  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.alt = product.title;
  productImage.classList.add(
    "bg-white",
    "w-full",
    "h-80",
    "object-contain",
    "mb-4",
    "rounded-lg"
  );
  productCard.appendChild(productImage);

  // Product Details
  const productTitle = document.createElement("h3");
  productTitle.classList.add("text-md", "mb-2", "line-clamp-2");
  productTitle.textContent = product.title;
  productCard.appendChild(productTitle);

  // Star Rating
  const starRatingContainer = document.createElement("div");
  const ratingArrow = document.createElement("small");
  ratingArrow.classList.add("arrow-down")
  ratingArrow.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`
  const ratingCount = document.createElement("small")
  ratingCount.innerHTML = `${product.rating.count}`
  generateStarRating(product.rating.rate, starRatingContainer);
  productCard.appendChild(starRatingContainer);
  starRatingContainer.appendChild(ratingArrow)
  starRatingContainer.appendChild(ratingCount)

  // Price Details
  const priceContainer = document.createElement("div");
  priceContainer.classList.add("flex", "tag");

  const price = document.createElement("div");
  price.classList.add("price", "font-semibold");
  price.innerHTML = `<sup>₹</sup>${product.price.toFixed(2)}`;
  priceContainer.appendChild(price);

  const discount = document.createElement("small");
  discount.innerHTML = `
            <span class="a-size-base a-color-secondary">M.R.P: </span>
            <span class="a-offscreen"><s>₹${(
              product.price +
              product.price * 0.1
            ).toFixed(2)}</s></span>
            <span class="font-semibold">(${(
              product.price -
              (product.price + product.price * 0.1)
            ).toFixed(2)}% off)</span>
          `;
  priceContainer.appendChild(discount);

  productCard.appendChild(priceContainer);

  // Append the product card to the link
  productLink.appendChild(productCard);

  // Add the product link to the product grid
  productGrid.appendChild(productLink);
}

function renderPagination() {
  const paginationContainer = document.getElementById("pagination");

  // Add your pagination buttons dynamically here
  const previousButton = document.createElement("button");
  previousButton.classList.add(
    "bg-gray-800",
    "text-white",
    "px-4",
    "py-2",
    "rounded-full"
  );
  previousButton.textContent = "Previous";
  paginationContainer.appendChild(previousButton);

  const pageText = document.createElement("span");
  pageText.classList.add("mx-4");
  pageText.textContent = "Page 1 of 5";
  paginationContainer.appendChild(pageText);

  const nextButton = document.createElement("button");
  nextButton.classList.add(
    "bg-gray-800",
    "text-white",
    "px-4",
    "py-2",
    "rounded-full"
  );
  nextButton.textContent = "Next";
  paginationContainer.appendChild(nextButton);
}

function generateStarRating(rating, container) {
    container.innerHTML = "";
  
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("i");
      star.classList.add("fas", "fa-star");
  
      if (i <= rating) {
        // Add a filled star
        star.classList.add("text-yellow-500"); // You can customize the filled star color
      } else {
        // Add an unfilled star
        star.classList.add("text-gray-300"); // You can customize the unfilled star color
      }
  
      container.appendChild(star);
    }
  }
  

// Fetch data from the API
axios
  .get("https://fakestoreapi.com/products?limit=20")
  .then((response) => {
    const products = response.data;

    // Render each product
    products.forEach((product) => {
      renderProduct(product);
    });

    // Render pagination
    renderPagination();
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
