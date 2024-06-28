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
                        <img id="fav-img" src="fav.png" alt="">
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
const image = document.getElementById("fav-img");
image.addEventListener("click", event => {
  event.target.style.backgroundColor = "red";
});

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
