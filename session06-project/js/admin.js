let account = JSON.parse(localStorage.getItem("user"));
let users = JSON.parse(localStorage.getItem("accountList"));
let check = false;
let products = JSON.parse(localStorage.getItem("products"))||[];

function home() {
    window.location.href = "../index.html"
}
// danh sách khách hàng
customer();
function customer() {
    document.getElementById("customer").classList.add("choose");
    document.getElementById("productPortfolio").classList.remove("choose");
    document.getElementById("productManagement").classList.remove("choose");
    document.getElementById("bill").classList.remove("choose");
    renderCustomer();
}
 function renderCustomer() {
    let lock = `<span class="material-symbols-outlined">lock_open</span>`
    let customerList = "";
    //<span class="material-symbols-outlined">lock_open</span>
    for (let i in users) {
        if(users[i].status){
            lock = `<span onclick="lock(${users[i].id})" class="material-symbols-outlined">lock_open</span>`
        }else{
            lock = `<span onclick="lockOpen(${users[i].id})" class="material-symbols-outlined">lock</span>`
        }
        customerList += `
                        <tr>
                            <td>${parseInt(i)+1}</td>
                            <td>${users[i].firstName} ${users[i].lastName} </td>
                            <td>${users[i].emailAddress}</td>
                            <td>${users[i].numberPhone}</td>
                            <td>${lock}</td>
                        </tr>
                        `
    }
    document.getElementById("tbodyCustomer").innerHTML = customerList;
 }

 function lock(id) {
    for (let i in users) {
        if (id == users[i].id) {
            users[i].status = false;
            localStorage.setItem("accountList",JSON.stringify(users));
        }
    }
    renderCustomer();
 }
 function lockOpen(id) {
    for (let i in users) {
        if (id == users[i].id) {
            users[i].status = true;
            localStorage.setItem("accountList",JSON.stringify(users));
        }
    }
    renderCustomer();
 }
 function findCustomer() {
    let inputName = document.getElementById("inputName").value;
    let find = false;
    let findList = []
    for (let i in users) {
        
    }
 }








function productPortfolio() {
    document.getElementById("customer").classList.remove("choose");
    document.getElementById("productPortfolio").classList.add("choose");
    document.getElementById("productManagement").classList.remove("choose");
    document.getElementById("bill").classList.remove("choose");
}
function productManagement() {
    document.getElementById("customer").classList.remove("choose");
    document.getElementById("productPortfolio").classList.remove("choose");
    document.getElementById("productManagement").classList.add("choose");
    document.getElementById("bill").classList.remove("choose");
}
function bill() {
    document.getElementById("customer").classList.remove("choose");
    document.getElementById("productPortfolio").classList.remove("choose");
    document.getElementById("productManagement").classList.remove("choose");
    document.getElementById("bill").classList.add("choose");
}