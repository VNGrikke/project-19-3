let account = JSON.parse(localStorage.getItem("user"));
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
    renderCart();
}
function renderCart() {
    let total = 0; 
    for (let i in account.cart) {
            total += account.cart[i].quantity; 
    }
    let itemInCart = document.getElementById("itemInCart");
    itemInCart.innerText = total;
    if(account.cart.length == 0){
        itemInCart.classList.add("hide");
    }else{
        itemInCart.classList.remove("hide");
    }
} 
change();
function logOut() {
    account = {}
    window.location.href = "../index.html";
    localStorage.setItem("user",JSON.stringify(account));
    change();
}