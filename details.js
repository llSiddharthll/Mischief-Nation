function generateStarRating(rating) {
    let starsHTML = "";

    for (let i = 1; i <= 5; i++) {
        const star = `<i class="fas fa-star ${i <= rating ? "text-yellow-500" : "text-gray-300"
            }"></i>`;
        starsHTML += star;
    }

    return starsHTML;
}

// Function to get the value of a URL parameter by name
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Get the 'id' parameter from the URL
const productId = getParameterByName("id");

// Now 'productId' contains the value of the 'id' parameter
console.log("Product ID:", productId);

// Use 'productId' to fetch and display product details from your data source
axios
    .get(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => {
        const product = response.data;
        console.log(product);
        const productDetails = document.getElementById("productDetails");
        productDetails.innerHTML = `
                <div class="swiper-container flex justify-center items-center bg-white">
                    <!-- Replace with your product images slider or gallery -->
                    <img src="${product.image}" 
                    alt="Product Images" 
                    class="object-contain w-80 h-80 md:h-[70vh] rounded-lg" />
                </div>

                <!-- Product Details -->
                <div class="max-w-lg mx-auto">
                    <h1 class="text-4xl font-bold mb-6">
                        ${product.title}
                    </h1>
    
                    <!-- Price Tag -->
                    <p class="text-2xl text-red-500 font-semibold mb-4">
                        ₹${product.price} <small class="ml-2 text-gray-500">
                        ${generateStarRating(product.rating.rate)} 
                        (${product.rating.count})</small>
                    </p>
    
                    <!-- Detailed Description -->
                    <p class="prose mb-6">
                        ${product.description}
                    </p>
    
                    <!-- Availability (Stock) -->
                    <p class="text-sm mb-6">
                        Availability: <span class="text-green-500">In Stock</span>
                    </p>
    
                    <!-- Variations (Sizes and Colors) -->
                    <div class="mb-6">
                        <label class="text-sm font-semibold mb-2 block">
                            Size:
                        </label>
                        <select class="border-gray-300 rounded-md shadow-sm p-2">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
    
                    <div class="mb-6">
                        <label class="text-sm font-semibold mb-2 block">
                            Color:
                        </label>
                        <select class="border-gray-300 rounded-md shadow-sm p-2">
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
    
                    <!-- Add to Cart and Buy Now buttons -->
                    <div class="flex space-x-4 mb-6">
                        <button
                            class="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Add to Cart
                        </button>
                        <button
                            class="bg-yellow-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                            Buy Now
                        </button>
                    </div>
    
                    <!-- Social Share Icons -->
                    <div class="flex space-x-4">
                        <a href="#" class="text-blue-600 hover:text-blue-700">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="text-blue-400 hover:text-blue-500">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="text-pink-600 hover:text-pink-700">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="text-red-600 hover:text-red-700">
                            <i class="fab fa-pinterest-p"></i>
                        </a>
                    </div>
                </div>
                `;
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
