const buttonClick = () => {
    // setTimeout(() => {
    //     callBack();
    // }, 5000);

    // setInterval(() => {
    //     callBack();
    // }, 2000);
    // console.log(`berhasil diclick`);

    // getProducts(document.getElementById("keyword").value, function (data) {
    //     clearProducts();
    //     displayProducts(data);
    // }, function () {
    //     getProductError();
    // });

    // getProducts(document.getElementById("keyword").value, function (data) {
    //     clearTableProducts();
    //     displayTableProducts(data);
    // }, function () {
    //     getProductError();
    // });
    // console.log(`succes click button`)

    const promise1 = getProductsPromise(document.getElementById("keyword").value);
    const promise2 = getProductsPromise(document.getElementById("keyword2").value);
    const promise3 = getProductsPromise(document.getElementById("keyword3").value);
    Promise.all([promise1, promise2, promise3])
        .then((values) => {
            return values.map(value => value.data.products);
        })
        .then((values) => {
            clearProducts();
            values.forEach((product) => {
                product.forEach((product) => {
                    displayProduct(product);
                })
            });
        })
        .catch((error) => {
            alert(error.message)
        })
        .finally(() => console.log(`selesai eksekusi promise all`))
}
// promise
//     .then((value) => {
//         return value.data.products // gunakan return untuk chaining method then
//     })
//     .then((products) => {       
//         clearProducts();
//         products.forEach((product) => {
//             displayProduct(product);
//         })
//     })
//     .catch((error) => alert(error.message))
//     .finally(() => console.log(`selesai eksekusi promise`)) // gapake parameter

const callBack = () => console.log(`Hello world`);

const getProductUrl = (keyword) => {
    return `https://www.blibli.com/backend/search/products?searchTerm=${keyword}`;
}

const getProducts = (keyword, callbackSucces, callbackError) => {
    const ajax = new XMLHttpRequest();

    ajax.onload = () => {
        if (ajax.status === 200) {
            const data = JSON.parse(ajax.responseText)
            callbackSucces(data)
        } else {
            callbackError();
        }
    }
    const url = getProductUrl(keyword);
    ajax.open("GET", url);
    ajax.send();
    // tidak bisa secara synchronous
    // const res = JSON.parse(ajax.responseText);
    // console.log(res);
}

const getProductsPromise = (keyword) => {
    const promise = new Promise((resolve, reject) => {
        //code async
        const ajax = new XMLHttpRequest();
        ajax.onload = () => {
            if (ajax.status === 200) {
                const data = JSON.parse(ajax.responseText)
                resolve(data)
            } else {
                reject(Error(`Gagal mengambil data product`));
            }
        }
        const url = getProductUrl(keyword);
        ajax.open("GET", url);
        ajax.send();
    });
    return promise;
}

const getProductError = () => { console.log(`error get  product`); alert(`error get product`) };

const clearProducts = () => {
    productli = document.getElementById("products");
    productli.textContent = "";
}

const displayProducts = (data) => {
    data.data.products.forEach(product => displayProduct(product));
}

const displayProduct = (product) => {
    const productli = document.createElement("li");
    productli.textContent = product.name;

    const productul = document.getElementById("products");
    productul.appendChild(productli);
}

function clearTableProducts() {
    const productUl = document.getElementById("table-products");
    productUl.textContent = "";
}

function displayTableProducts(data) {
    const table = document.createElement("table");
    table.setAttribute("border", 1);

    let index = 0;
    data.data.products.forEach(product => {
        table.insertRow(index).insertCell(0).innerText = product.name;
        index++;
    });

    const tableProduct = document.getElementById("table-products");
    tableProduct.appendChild(table);
}

