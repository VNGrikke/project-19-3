let account = JSON.parse(localStorage.getItem("user"));
let users = JSON.parse(localStorage.getItem("accountList"));
let check = false;
let products = JSON.parse(localStorage.getItem("products"))||[];
    // localStorage.setItem("products",JSON.stringify(products));
// thay đổi phần tên đăng nhập
    function change() {
    if (account !== null && typeof account === 'object' && Object.keys(account).length == 0) {
        check = false;
        document.getElementById("user").innerHTML = `<div id="user"> <a href="/session06-project/page/register.html">Đăng kí</a>/<a href="/session06-project/page/login.html">Đăng nhập</a></div>`
        itemInCart.classList.add("hide");
        
    }else{
        check = true;
        document.getElementById("user").innerHTML = `
                                                        <div id="user" class="user-logo">${account.firstName} ${account.lastName}</div>
                                                        <ul class="tools">
                                                            <li><a href="">thông tin tài khoản</a></li>
                                                            <li onclick="logOut()">đăng xuất</li>
                                                        </ul>
                                        `
    renderCart();                                                
    } 
    
}
// in số lượng của giỏ hàng
function renderCart() {
    let total = 0; 
    for (let i in account.cart) {
            total += account.cart[i].quantity; 
    }
    let itemInCart = document.getElementById("itemInCart");
    if (total >=99) {
        total = "99+";
    }
    itemInCart.innerText = total;
    if(account.cart.length == 0){
        itemInCart.classList.add("hide");
    }else{
        itemInCart.classList.remove("hide");
    }
} 
change();
//đăng xuất
function logOut() {
    account = {}
    window.location.href = "../index.html";
    localStorage.setItem("user",JSON.stringify(account));
    change();
}
function render() {
    let itemCart ='';
    let prices;
    for (let i = 0; i < account.cart.length; i++) {
        prices = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(account.cart[i].price*account.cart[i].quantity);
        itemCart += `
                    <tr>
                        <td>${account.cart[i].name}</td>
                        <td><img src=".${account.cart[i].scr}" alt=""></td>
                        <td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(account.cart[i].price)}</td>
                        <td class="stock">
                            <button onclick="reduce(${account.cart[i].id})">-</button>
                            <div id = "quanlity${account.cart[i].id}">${account.cart[i].quantity}</div>
                            <button onclick="increase(${account.cart[i].id})">+</button>
                        </td>
                        <td>${prices}</td>
                        <td><span class="material-symbols-outlined">delete</span></td>
                    </tr>
                    `;

    }
    document.getElementById("body").innerHTML = itemCart;
}
render();
function reduce(id) {
    let x = parseInt(document.getElementById(`quanlity${id}`).innerText);
    x--;
    console.log(id);

    if(x <= 1)x=1;
   
    for (let i = 0; i < account.cart.length; i++) {
        if (id = account.cart[i].id) {
            account.cart[i].quantity = x;
            localStorage.setItem("user",JSON.stringify(account));
            localStorage.setItem("accountList",JSON.stringify(users));
            render();
            break;
        }        
    }
}
function increase(id) {
    let x = parseInt(document.getElementById(`quanlity${id}`).innerText);
    x++;
    console.log(id);
    for (let i = 0; i < account.cart.length; i++) {
        if (id = account.cart[i].id) {
            account.cart[i].quantity = x;
            localStorage.setItem("user",JSON.stringify(account));
            localStorage.setItem("accountList",JSON.stringify(users));
            render();
            break;
        }        
    }
}