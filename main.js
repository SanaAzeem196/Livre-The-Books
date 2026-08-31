// onclick button functions
function showCategories(type) {
    let fiction = {
        "Literary Fiction": "Character-driven stories exploring life, identity, relationships, and the human condition.",
        "Mystery & Thriller": "Suspenseful stories filled with secrets, investigations, danger, and unexpected twists.",
        "Science Fiction": "Stories exploring technology, space, science, and possible futures.",
        "Fantasy": "Magical worlds filled with quests, mythical creatures, heroes, and extraordinary adventures.",
        "Romance": "Stories centered around love, relationships, emotional connection, and companionship.",
        "Historical Fiction": "Fictional stories set against real historical periods and events.",
        "Horror": "Dark and unsettling stories designed to create fear, suspense, and unease.",
        "Dystopian": "Stories imagining societies where freedom, individuality, or human rights have been severely restricted."
    };

    let nonfiction = {
        "Biography & Memoir": "True stories about people's lives, experiences, achievements, and struggles.",
        "True Crime": "Non-fiction accounts exploring real crimes, investigations, victims, and criminals.",
        "Self-Help": "Practical books focused on personal growth, habits, productivity, and wellbeing.",
        "History": "Books examining important people, events, civilizations, and changes throughout time.",
        "Science & Technology": "Explorations of scientific discoveries, technology, nature, and the world around us.",
        "Business & Finance": "Books about entrepreneurship, leadership, investing, money, and organizations.",
        "Philosophy & Religion": "Works exploring existence, morality, belief, meaning, and fundamental questions of life.",
        "Essays & Anthologies": "Collections of thoughtful essays and writings covering a variety of subjects."
    };

    let categories = type === "fiction" ? fiction : nonfiction;
    let html = "<h3>" + (type === "fiction" ? "Fiction" : "Non-Fiction") + "</h3><div class='category-list'>";

    for (let category in categories) {
        html += "<div><b>" + category + "</b><br>" + categories[category] + "</div>";
    }

    html += "</div>";
    document.getElementById("categoryCard").innerHTML = html;
}


function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("livreCart")) || [];
    let item = cart.find(book => book.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    localStorage.setItem("livreCart", JSON.stringify(cart));

    if (confirm(name + " was added to your cart.\n\nProceed to checkout?")) {
        location.href = "cart.html";
    }
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("livreCart")) || [];
    let box = document.getElementById("cartItems");
    let totalBox = document.getElementById("cartTotal");

    if (!box) return;

    if (!cart.length) {
        box.innerHTML = "<p>Your cart is empty. <a href='books.html'>Browse books</a>.</p>";
        totalBox.innerHTML = "";
        return;
    }

    let total = 0;

    box.innerHTML = cart.map((book, i) => {
        total += book.price * book.quantity;

        return `
            <div class="cart-item">
                <div>
                    <h3>${book.name}</h3>
                    <p>Rs. ${book.price.toLocaleString()} each</p>
                </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${i},-1)">−</button>
                    ${book.quantity}
                    <button onclick="changeQuantity(${i},1)">+</button>
                </div>
                <b>Rs. ${(book.price * book.quantity).toLocaleString()}</b>
                <span class="remove" onclick="removeItem(${i})">Remove</span>
            </div>
        `;
    }).join("");

    totalBox.innerHTML = "Total: Rs. " + total.toLocaleString();
}

function changeQuantity(index, amount) {
    let cart = JSON.parse(localStorage.getItem("livreCart")) || [];

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("livreCart", JSON.stringify(cart));
    displayCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("livreCart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("livreCart", JSON.stringify(cart));
    displayCart();
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem("livreCart")) || [];

    if (!cart.length) {
        alert("Your cart is empty.");
        return;
    }

    let name = prompt("Enter your name:");
    if (!name) return;

    let address = prompt("Enter your address:");
    if (!address) return;

    if (confirm("Confirm your order, " + name + "?")) {
        localStorage.removeItem("livreCart");
        alert("Order Placed! Happy Reading!");
        location.href = "home.html";
    }
}
// alert message
function sendMessage(event) {
    event.preventDefault();
    alert("Thank you! Your message has been received.");
    event.target.reset();
}

displayCart();