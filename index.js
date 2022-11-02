import { menuArray } from "./data.js"

const rootEl = document.getElementById("root")
const cart = []
const totalPriceEl = document.getElementById("total-price")
const cartElContainer = document.getElementById("cart-items-container")

document.addEventListener("click", (event) => {
    event.preventDefault()
    if (event.target.dataset.item) {
        handleAddItem(event.target.dataset.item)
    } else if (event.target.dataset.remove) {
        handleRemoveItem(event.target.dataset.remove)
    } else if (event.target.id == "complete-order") {
        handleCompleteOrder()
    } else if (event.target.id == "pay") {
        handlePayment()
    }
})

function handleCompleteOrder () {
    document.getElementById("modal").classList.toggle("hidden")
}

function handlePayment () {
    document.getElementById("modal").classList.toggle("hidden")
    cart.splice(0)
    render()
    document.querySelector("body").innerHTML += `
    <p id="confirmation">Thank you, ${document.getElementById("name").value}! Your order is on it's way!</p>
    `
}

function handleRemoveItem(itemRemoved) {
    const itemRemovedIndex = cart.findIndex((item) => item.id == itemRemoved)
    cart[itemRemovedIndex].quantity --
    if (cart[itemRemovedIndex].quantity == 0) {
        cart.splice(itemRemovedIndex,1)
    }
    render()
    totalPriceEl.innerText = calculateCartTotal() + "$"
}

function handleAddItem(itemAdded){
    const itemAddedIndex = menuArray.findIndex((item) => item.id == itemAdded)
    const cartItemobject = {
        id: itemAdded,
        name: menuArray[itemAddedIndex].name,
        price: menuArray[itemAddedIndex].price,
        quantity: 1,
    }

    const cartIndex = cart.findIndex((item) => item.id == itemAdded)

    if (cartIndex > -1) {
        cart[cartIndex].quantity ++
    } else {
        cart.push(cartItemobject)
    }
    render()
    totalPriceEl.innerText = calculateCartTotal() + "$"
}

function calculateCartTotal() {
    let total = 0
    cart.forEach((cartItem)=> total += cartItem.price*cartItem.quantity)
    return total
}

function generateCartHTML(){
    let cartHTML = "";
    cart.forEach((cartItem) => {
        cartHTML += `
        <div id="cart-items-container">
            <div class="cart-item">
                <h2 class="item-name-and-qty">${cartItem.name} X ${cartItem.quantity}</h2>
                <button class="remove-from-cart" data-remove="${cartItem.id}">remove</button>
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
            <button class="add-btn" data-item="${item.id}">+</button>
        </div>`
    })
    return menuHTML
}

function render () {
    rootEl.innerHTML = generateMenuHTML()
    if (cart.length > 0) {
        document.getElementById("cart").classList.remove("hidden")
        cartElContainer.innerHTML = (generateCartHTML())
    } else {
        document.getElementById("cart").classList.add("hidden")
    }
}

render()