import { menuArray } from "./data.js"

const rootEl = document.getElementById("root")
const cart = []
const totalPriceEl = document.getElementById("total-price")
const cartElContainer = document.getElementById("cart-items-container")

rootEl.addEventListener("click", (event) => {
    if (event.target.dataset.item) {
        handleAddItem(event.target.dataset.item)
    }
})

function handleAddItem(itemAdded){
    const itemAddedIndex = menuArray.findIndex((item) => item.id == itemAdded)
    const cartItemobject = {
        id: itemAdded,
        name: menuArray[itemAddedIndex].name,
        price: menuArray[itemAddedIndex].price,
        quantity: 1,
    }

    let cartArrayBoolean = false
    
    cart.forEach((item) => {
        if (item.name == cartItemobject.name){
            cartArrayBoolean = true
        }
    })
    if (cartArrayBoolean) {
        cart[menuArray.findIndex((item) => item.name == cartItemobject.name)].quantity ++
    } else {
        cart.push(cartItemobject)
    }
}

function generateCartHTML(){
    let cartHTML = "";
    cart.forEach((cartItem) => {
        cartHTML += `
        <div id="cart-items-container">
            <div class="cart-item">
                <h2 class="item-name-and-qty">${cartItem.name} X ${cartItem.quantity}</h2>
                <button class="remove-from-cart" data-id="${cartItem.id}">remove</button>
                <h2 class="item-total">${cartItem.price*cartItem.quantity}$</h2>
            </div>
        </div>
        `
    })
      return cartHTML;         
}

function generateMenuHTML (){
    let menuHTML = ""
    menuArray.forEach((item) => {
        menuHTML += `
        <div class="item-container">
            <p class="emoji">${item.emoji}</p>
            <div class="item-text">
                <h2 class="item-name">${item.name}</h2>
                <p class="item-description">${item.ingredients}</p>
                <h4 class="item-price">${item.price}$</h4>
            </div>
            <button class="add-btn" data-item="${item.id}"><img src="https://cdn-icons-png.flaticon.com/512/32/32339.png"></button>
        </div>`
    })
    return menuHTML
}

function render () {
    rootEl.innerHTML = generateMenuHTML()
    if (cart.length > 0) {
        cartElContainer.innerHTML = (generateCartHTML())
    } else {
        cartElContainer.innerHTML = ""
    }
    
}

render()