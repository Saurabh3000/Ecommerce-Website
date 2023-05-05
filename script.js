let shopping_icon = document.querySelector("#shopping_icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

shopping_icon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

if(document.readyState == "loding") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {

    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for(var i=0;    i<removeCartButtons.length;     i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
    }

    //Quantity Changes Code
    var quantityInputs = document.getElementsByClassName("cart_quantity");
    for(var i=0;    i < quantityInputs.length;     i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add Item in Cart Code
    var addCart = document.getElementsByClassName("add-cart");
    for(var i = 0;  i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    //Buy Button Work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked(){
    alert("Your Order is Placed");
    var cartContent = document.getElementsByClassName("cart_content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal(); 
}

// Remove Item From Cart Code
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//Quantity Changes with price
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

// Add To Cart
function addCartClicked(event){
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName("product_name")[0].innerText;
    var price = shopProduct.getElementsByClassName("product_price")[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product_img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart_box");
    var cartItems = document.getElementsByClassName("cart_content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart_product_title");
    for(var i =0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("You have Already add this item into cart");
            return;
        }
        
    }

var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart_img">
                        <div class="detail_box">
                            <div class="cart_product_title">${title}</div>
                            <div class="cart_price">${price}</div>
                            <input type="number" value="1" class="cart_quantity">
                        </div>

                        <!--Remove Cart-->
                        <i class='bx bxs-trash-alt cart-remove'></i>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart_quantity")[0].addEventListener("change", quantityChanged);
}


// Update Total Price Code
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart_content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart_box");
    var total = 0;
    for(var i = 0;  i < cartBoxes.length;   i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart_price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart_quantity")[0];
        var price = parseFloat(priceElement.innerHTML.replace("Rs", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
        document.getElementsByClassName("total-price")[0].innerText = "Rs" + total;
    
}