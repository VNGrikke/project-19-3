let users = JSON.parse(localStorage.getItem("accountList"));
let account = JSON.parse(localStorage.getItem("user")) || [];
let check = false;
let images = JSON.parse(localStorage.getItem("images"))||[];
// localStorage.setItem("images",JSON.stringify(images));
function change() {
    if (account !== null && typeof account === 'object' && Object.keys(account).length == 0) {
        check = false;
        document.getElementById("user").innerHTML = `<div id="user"> <a href="/session06-project/page/register.html">Đăng kí</a>/<a href="/session06-project/page/login.html">Đăng nhập</a></div>`
                                                        
    }else{
        check = true;
        document.getElementById("user").innerHTML = `
                                                        <div id="user" class="user-logo">${account.firstName} ${account.lastName}</div>
                                                        <ul class="tools">
                                                            <li><a href="">thông tin tài khoản</a></li>
                                                            <li onclick="logOut()">đăng xuất</li>
                                                        </ul>
                                                    `
    }
    renderCart() 
}
change();
function logOut() {
    account = {}
    localStorage.setItem("user",JSON.stringify(account));
    ;
    change();
}
function render() {
    let products = "";
    for (let i = 0; i < images.length; i++) {
       products +=  `
                    <a href="/session06-project/page/product.html">
                        <div class="product">
                            <div class="productImg"><img src="${images[i].scr}"></div>
                            <div class="productName">${images[i].name}</div>
                            <div class="price">${images[i].price}.000VNĐ</div>
                            <button  onclick = "buy(event,${images[i].id})">Mua</button>
                        </div>
                    </a>
                    `
    }
    document.getElementById("products").innerHTML = products;
    renderCart();    
}
render();

function buy(e,id) {
    e.preventDefault();
    if (!check) {
        alert("chua dang nhap");
        return;
    }
    let product;
    for (let i = 0; i < images.length; i++) {
        if (id == images[i].id) {
            product = images[i];
        }
    }
    let check1 = false;
    for (let i = 0; i < account.cart.length; i++) {
        if(product.id == account.cart[i].id){
            check1 = true;
            account.cart[i].quantity++;
            break;
        }
    }
    if (!check1) {
        product.quantity = 1;
        account.cart.push(product);
    }
    renderCart();
    localStorage.setItem("user",JSON.stringify(account));

    }
function renderCart() {
    let total = 0; 
    for (let i in account.cart) {
            total += account.cart[i].quantity; 
    }
    let itemInCart = document.getElementById("itemInCart");
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
    


