import { menuArray } from "./data.js"

const rootEl = document.getElementById("root")

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
}

render()