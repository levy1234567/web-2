let pformat = new Intl.NumberFormat('de-DE', { minimumSignificantDigits : 2 }); 

function capitalization(string) { 
    return string.charAt(0).toUpperCase() + string.slice(1); 
}

const truncatePrice = (price, k) => { 
    const factor = Math.pow(10, Math.abs(price).toString().length - k); 
    return Math.floor(price / factor) * factor; 
}

function genprod(product) {
    if(product.image){
        product.image = "data:image/png;base64," + product.image; 
    }
    if(product.old_price){
        product.old_price = pformat.format(product.old_price); 
    }
    if((!('old_price' in product)) && (product.discount !== 0)){
        product.old_price = pformat.format(truncatePrice(Math.floor((product.price)/(1-(product.discount)/(100))),2));
    }
    if(product.tag){
        product.tag = capitalization(product.tag); 
    }
    product.short_desc = capitalization(product.short_desc); 
    product.name = capitalization(product.name); 
    product.unit_price = capitalization(product.unit_price); 
    product.price = pformat.format(product.price); 

    const markup = `   
    <div class="card product-container"> 
        <div id="${product.name}">
            <div class="card-img-content" id="product-utility">
                <button class="product-cart">Add to Cart</button>
                <div class="like-share-compare">
                    <div>
                        <img src="share.png" alt="">
                        <a href=""><span class="material-symbols-outlined"></span>Share</a>
                    </div>
                    <div>
                        <img src="compare.png" alt=""> 
                        <a href=""><span class="material-symbols-outlined"></span>Compare</a>
                    </div>
                    <div>
                        <div id="icon-heart">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 0 522 512">
                            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 
                            27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 
                            36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 
                            115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                        </div>
                        <a href=""><span class="material-symbols-outlined"></span>Like</a>
                    </div>
                </div> 
            </div>

            <div class="product-container-2">
                <img class="card-img" src="${product.image}" alt="${product.name}">
                <div class="card-img-overlay">
                    <p class="rounded-circle pt-2 pb-2 product-discount">${product.discount ? `-${product.discount}%` : ""}</p>
                </div>
                <div class="card-img-overlay">
                    <p class="rounded-circle pt-2 pb-2 product-tag" id="${product.tag}">${product.tag ? `${product.tag}` : ""}</p>
                </div>

                <div class="product-info">
                    <h4 class="card-title product-name ml-3">${product.name}</h4>
                    <p class="card-text product-desc text-muted ml-3">${product.short_desc}</p>
                    <div class="row">
                        <h6 class="col card-text product-price ml-3">${product.unit_price} ${product.price}</h6>
                        <p class="col card-text product-old_price text-muted"><del>${product.old_price ? `${product.unit_price} ${product.old_price}` : ""}</del></p>
                    </div>
                </div>
            </div>
            <br></br>
        </div>
    </div>    
`;
if(product.discount ===" "){
    product.discount.remove();
}
if(product.tag ===" "){
    product.discount.remove();
}
    return markup;
}

let fetched = false;
let resp = null;
async function loadprod() {
    if (fetched == true){
        var sth = JSON.parse(sessionStorage.getItem("products"));
        return sth;
    }
    resp = await fetch("https://dummyapi-0uzr.onrender.com/products"); 
    let prod = await resp.json(); 

    prod = prod.product_list;
    console.log(prod);

    const container = document.getElementById("final");
      

    
    prod.forEach((product) => { 
        const disprodhtml = genprod(product);  
        container.insertAdjacentHTML("beforeend",disprodhtml);
        var b = JSON.stringify(prod);
        sessionStorage.setItem("product_list",b);
    });
}

loadprod();

const b = document.getElementsByClassName("icon-heart");
for (let i=0;i < b.length;i++) {
    b[i].addEventListener("click", event => {
        event.target.style.fill = "red";
    });
}


let show_more_btn = document.querySelector("#sec-button");
let current_product = 4;
show_more_btn.onclick = () => {
    let boxes = [...document.querySelectorAll('.product-container')];
    for (var i = current_product; i < current_product + 4; i++){
        boxes[i].target.style.display = 'inline-block';
    }
    current_product += 4;
    
    if(current_product >= boxes.length){
        show_more_btn.style.display = 'none';
    }
}
