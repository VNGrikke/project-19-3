let account = JSON.parse(localStorage.getItem("user"));
let users = JSON.parse(localStorage.getItem("accountList"));
let admin = JSON.parse(localStorage.getItem("admin"));
let check = false;
let products = JSON.parse(localStorage.getItem("products"))||[];
// thay đổi phần tên đăng nhập
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

// in số lượng của giỏ hàng
function renderCart() {
    let itemInCart = document.getElementById("itemInCart");
    if (admin.login) {
        itemInCart.classList.add("hide");
    }
    let total = 0; 
    for (let i in account.cart) {
            total += account.cart[i].quantity; 
    }
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
// lấy id sản phẩm vê
let product;
let idProduct = JSON.parse(localStorage.getItem("idPoductDetail"));
for (let i in products) {
    if (idProduct == products[i].id) {
        product = products[i];
        break;
    }
}
// đưa thông tin sản phẩm ra màn hình
let priceProduct = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
document.getElementById("nameProduct").innerText = product.name;
document.getElementById("priceProduct").innerText = priceProduct;
document.getElementById("imgPd").innerHTML = `<img src=".${product.scr}" alt="">`;
document.getElementById("stockProduct").innerText = product.stock; 
//giam so luong san pham
function subtract() {
    let quantity = parseInt(document.getElementById("quanlity").value);
    quantity--;
    if (quantity<1) {
        quantity = 1;
    }
    document.getElementById("quanlity").value = quantity;

}
// tăng số lượng sản phẩm
function augment() {
    let quantity = parseInt(document.getElementById("quanlity").value);
    quantity++;
    if (quantity > product.stock) {
        quantity = product.stock;
    }
    document.getElementById("quanlity").value = quantity;
}
// thêm vào giỏ hàng
function addToCart() {
    let y = document.getElementById("notification");
    let x = parseInt(document.getElementById("quanlity").value);
    if (!check) {
        alert("chua dang nhap");
        return;
    }
    if (!account.status) {
        alert("tai khoan cua ban da bi khoa");
        return;
    }
    let check1 = false;
    for (let i = 0; i < account.cart.length; i++) {
        if(product.id == account.cart[i].id){
            if (account.cart[i].quantity >= product.stock) {
                return;
            }
            check1 = true;
            account.cart[i].quantity += x;
            y.className = "show";
            setTimeout(function(){ y.className = y.className.replace("show", ""); }, 3000);
            break;
        }
    }
    if (!check1) {
        product.quantity = 1;
        delete product.stock;
        y.className = "show";
        setTimeout(function(){ y.className = y.className.replace("show", ""); }, 3000);
        account.cart.push(product);
    }
    for (let i in users) {
        if (account.id == users[i].id) {
            users[i] = account;            
        }
    }
    renderCart();
    localStorage.setItem("user",JSON.stringify(account));
    localStorage.setItem("accountList",JSON.stringify(users));

}

function manager(){
    window.location.href = "../page/admin.html";
}


function cart() {
    window.location.href = "./cart.html";
}