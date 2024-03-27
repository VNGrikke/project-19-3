let users = JSON.parse(localStorage.getItem("accountList"));
let account = JSON.parse(localStorage.getItem("user")) || [];
let admin = JSON.parse(localStorage.getItem("admin"));
let check = false;
let products = JSON.parse(localStorage.getItem("products"))||[];
// [ 
//   {id:1, name:"Mô hình Nezuko", stock: 342, price: 12000000, scr: "./asset/img/KimetsuNoYaiba/nezuko/nezuko.jpg",properties:"mô hình kamado nezuko kimetsu no yaiba"},
//   {id:2, name:"Mô hình Mitsuri", stock: 32, price: 30000000, scr:"./asset/img/KimetsuNoYaiba/mitsuri/MITSURI.webp",properties:"mô hình mitsuri kanroji kimetsu no yaiba"},
//   {id:3, name:"Mô hình Shinobu", stock: 72, price: 23000000, scr:"./asset/img/KimetsuNoYaiba/shinobu/Shinobu.jpg ",properties:"mô hình Kochō Shinobu kimetsu no yaiba"}
// ]
// localStorage.setItem("products",JSON.stringify(products));
console.log(admin);
function change() {
    if (admin.login) {
        document.getElementById("cart").classList.add("hide");
        document.getElementById("user").innerHTML = `
                                                            <div id="user" class="user-logo">admin</div>
                                                            <ul class="tools">
                                                                <li onclick="manager()">quản lí</li>
                                                                <li onclick="logOutAdmin()">đăng xuất</li>
                                                            </ul>`
    }else{
        document.getElementById("cart").classList.remove("hide");
        if (account !== null && typeof account === 'object' && Object.keys(account).length == 0) {
            check = false;
            document.getElementById("user").innerHTML = `<div id="user"> <a href="/session06-project/page/register.html">Đăng kí</a>/<a href="/session06-project/page/login.html">Đăng nhập</a></div>`
                                                            
        }else{
            check = true;
            document.getElementById("user").innerHTML = `
                                                            <div id="user" class="user-logo">${account.firstName} ${account.lastName}</div>
                                                            <ul class="tools">
                                                                <li><a href="">thông tin tài khoản</a></li>
                                                                <li onclick="logOutUser()">đăng xuất</li>
                                                            </ul>
                                                        `
        }
        renderCart() 
    }
}
change();
function logOutUser() {
    account = {}
    localStorage.setItem("user",JSON.stringify(account));
    change();
}
function logOutAdmin() {
    admin.login = false
    localStorage.setItem("admin",JSON.stringify(admin));
    change();
}

function render() {
    let productsRender = "";
    let priceProduct;
    for (let i = 0; i < products.length; i++) { 
    priceProduct = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(products[i].price);
       productsRender +=  `
                        <div class="product" onclick="productDetail(${products[i].id})">
                            <div class="productImg"><img src="${products[i].scr}"></div>
                            <div class="productName">${products[i].name}</div>
                            <div class="price">${priceProduct}</div>
                        </div>
                    `
    }
    document.getElementById("products").innerHTML = productsRender;
    renderCart();    
}
render();

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
    if(!check){
        itemInCart.classList.add("hide");
    }else{
        itemInCart.classList.remove("hide");
    }
    for (let i in users) {
        if (account.id == users[i].id) {
            users[i] = account;
            localStorage.setItem("accountList",JSON.stringify(users));
        }
    }
 }  
    
// function khi click vao tung anh

function productDetail(id) {
    localStorage.setItem("idPoductDetail",id);
    window.location.href="./page/product.html";
}
function cart() {
    window.location.href = "./page/cart.html";
}
function manager(){
    window.location.href = "./page/admin.html";
}
