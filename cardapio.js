
let data_key = 0;
const shopMain = document.querySelector('.vitrine');
let myCart = [];
let myCartHTML = [];
let obj;
let view_control = '';
let filter_control = false;
let ordination_control = '';
let infosCart = {
    
    calc_Tot: (arr_obj) => {
        let tot = 0;
        arr_obj.forEach( item => {
            tot += item.prc_total;
        });
        document.querySelector('#cart-infos-subtotal-value').innerHTML = `R$${tot.toFixed(2)}`;        
    }
}

document.querySelector('#back-to-home img').addEventListener('click', ()=> {
       
    if(document.querySelector('header nav').classList.contains('on')){
        document.querySelector('header nav').classList.remove('on');
    }else {
        document.querySelector('header nav').classList.add('on');
    }    
});
function itemComponent(itemJson, type){

    let newItemContainer = document.querySelector('.item-vitrine').cloneNode(true);
    if(type == 'pizza'){
        newItemContainer.querySelector('.item-container').classList.add('pizzas');
    } else {
        newItemContainer.querySelector('.item-container').classList.add('others');
    }
    newItemContainer.querySelector('img').src = itemJson.img;
    newItemContainer.querySelector('.price-vitrine').innerHTML = `R$${(itemJson.price).toFixed(2)}`;
    newItemContainer.querySelector('.item-vitrine-name').innerHTML = itemJson.name.toUpperCase();

    let btn = newItemContainer.querySelector('.more-btn');
    btn.setAttribute('data-key', `${itemJson.id - 1},${itemJson.type}`);
    
    //Evento do botão, que captura os dados do item ao qual o botão pertence

    btn.addEventListener('click', () => { 
        let itemObj;       
        let keys = btn.getAttribute('data-key').split(',');
        let [keyId, keyType] = keys;
        console.log(keyType)
        switch (keyType) {
            case 'pizza':
                itemObj = pizzaJson[keyId];
                onItemWindow(itemObj);
                break;
            case 'bebida':
                itemObj = bebidaJson[keyId]; 
                onItemWindow(itemObj);
                break;
            case 'sobremesa':
                itemObj = sobremesaJson[keyId];
                onItemWindow(itemObj);
                break;            
        }
    });

    return newItemContainer;    
}

function onItemWindow(itemJson){
    let itemWindow = document.querySelector('.container-window-item-desc');    
    itemWindow.querySelector('.item-picture').src = itemJson.img;
    itemWindow.querySelector('.title-item-desc').innerHTML = itemJson.name.toUpperCase();
    itemWindow.querySelector('.p-item-desc').innerHTML = itemJson.description;
    itemWindow.querySelector('.item-desc-price').innerHTML = `R$${itemJson.price.toFixed(2)}`;
    itemWindow.querySelector('.item-desc-qtd-span').innerHTML = 1;
    
    obj = {
        id: `${itemJson.id}${itemJson.type}${itemJson.name}`,
        type: itemJson.type,
        name: itemJson.name,
        img: itemJson.img,
        prc_uni: itemJson.price,
        qtd: 1,
        prc_total: itemJson.price 
    }        

    itemWindow.style.display = 'flex';
}

document.querySelector('.item-desc-qtd-btn-more').addEventListener('click', () => {
    obj.qtd ++;
    obj.prc_total = obj.prc_uni * obj.qtd;
    document.querySelector('.item-desc-price').innerHTML = `R$${obj.prc_total.toFixed(2)}`;
    document.querySelector('.item-desc-qtd-span').innerHTML = obj.qtd;
});

document.querySelector('.item-desc-qtd-btn-less').addEventListener('click', () => {
    if(obj.qtd > 0){
        obj.qtd --;
        obj.prc_total = obj.prc_uni * obj.qtd;            
        document.querySelector('.item-desc-price').innerHTML = `R$${obj.prc_total.toFixed(2)}`;
        document.querySelector('.item-desc-qtd-span').innerHTML = obj.qtd;
    }
});

document.querySelector('.window-item-btn-add-cart').addEventListener('click', () => {
   
    document.querySelector('.container-window-item-desc').style.display = 'none';
    myCart.push(obj);
    obj = {};    
    infosCart.calc_Tot(myCart);
    addCart();
    document.querySelector('#cart-icon-notify').innerHTML = myCart.length;
    document.querySelector('#back-to-home img').style.display = 'none';    
    document.querySelector('.cart').classList.add('on');
});

document.querySelector('.window-item-btn-cancel').addEventListener('click', () => {
    document.querySelector('.container-window-item-desc').style.display = 'none';
    myCart.pop();
});

function displayCart(){
    let display_cart = document.querySelector('.cart');
    if(display_cart.classList.contains('on')){
        display_cart.classList.remove('on');
    } else {
        display_cart.classList.add('on');
    }
}


function addCart(){
    document.querySelector('.cart-list-items').innerHTML = '';
    myCart.forEach(itemObj => {
        let itemDiv = document.querySelector('.cart-item').cloneNode(true);
        itemDiv.setAttribute('id', itemObj.id);
        itemDiv.querySelector('.cart-item-picture').src = itemObj.img;
        itemDiv.querySelector('.cart-item-name').innerHTML = itemObj.name;
        itemDiv.querySelector('.cart-item-qtd-span').innerHTML = itemObj.qtd;
        itemDiv.querySelector('.cart-item-trash').addEventListener('click', (event) => {
            let keyId = event.currentTarget.parentNode.id;
            let id = myCart.findIndex((itemJson) => {return itemJson.id == keyId? true: false});
            myCart.splice(id, 1);
            infosCart.calc_Tot(myCart);
            document.querySelector('#cart-icon-notify').innerHTML = myCart.length;            
            console.log(myCart);
            addCart();            
        });
        
        itemDiv.querySelector('.cart-item-qtd-btn-more').addEventListener('click', (event) => {
            let aux = event.currentTarget.parentNode;
            let keyId = aux.parentNode.id;
            let findElement = myCart.findIndex((item) => {return item.id == keyId? true : false});
            myCart[findElement].qtd ++;
            myCart[findElement].prc_total = myCart[findElement].prc_uni * myCart[findElement].qtd;
            infosCart.calc_Tot(myCart);
            addCart();
        });        
        
        itemDiv.querySelector('.cart-item-qtd-btn-less').addEventListener('click', (event) => {
            let aux = event.currentTarget.parentNode;
            let keyId = aux.parentNode.id;
            let findElement = myCart.findIndex((item) => {return item.id == keyId? true : false});
            if(myCart[findElement].qtd > 0){
                myCart[findElement].qtd --;
                myCart[findElement].prc_total = myCart[findElement].prc_uni * myCart[findElement].qtd;
                infosCart.calc_Tot(myCart);
                addCart();
            }
        });
        
        document.querySelector('.cart-list-items').append(itemDiv);
    });
}

document.querySelector('#cart-icon-img').addEventListener('click', () => {
    document.querySelector('#back-to-home img').style.display = 'none';
    displayCart();
});

document.querySelector('.back-to-cardapio').addEventListener('click', () => {
    document.querySelector('#back-to-home img').style.display = 'flex';
    displayCart();
})


// Clonando o componente e preenchendo cada um com os dados
// para dar um append na vitrine

function ordenationAsc(arrItem){
    let resultSort = arrItem.sort((item_a, item_b) =>{
        let get_price_item_a = item_a.querySelector('.price-vitrine').textContent.slice(2,);
        let get_price_item_b = item_b.querySelector('.price-vitrine') .textContent.slice(2,);
        let price_a = Number(get_price_item_a);
        let price_b = Number(get_price_item_b);

        return price_a - price_b;
    });
    return resultSort;
}

function ordenationDesc(arrItem){
    let resultSort = arrItem.sort((item_a, item_b) =>{
        let get_price_item_a = item_a.querySelector('.price-vitrine').textContent.slice(2,);
        let get_price_item_b = item_b.querySelector('.price-vitrine') .textContent.slice(2,);
        let price_a = Number(get_price_item_a);
        let price_b = Number(get_price_item_b);

        if(price_a > price_b){
            return -1;
        } else {
            return 1;
        }
    });
    return resultSort;
}

function setFilter(arrItem){
    let prc_min = document.querySelector('#prc-min').value;
    let prc_max = document.querySelector('#prc-max').value;
    console.log(`Preço min: ${prc_min}, Preço max: ${prc_max}`);

    let resultFilter = arrItem.map((item) => {
        let price_aux = item.querySelector('.price-vitrine').textContent;
        let price = parseFloat(price_aux.slice(2));
        console.log('preço: ', price)
        if(price < prc_min && price > prc_max){
            item.classList.add('.displayOff');
        }
    });
    return resultFilter;
}

function imprimirNaTela(arrItens){       
    if(ordination_control == 'asc'){
        arrItens = ordenationAsc(arrItens);
    }
    if(ordination_control == 'desc'){
        arrItens = ordenationDesc(arrItens);
    }
    if(filter_control){
        arrItens = setFilter(arrItens);
    }
    shopMain.querySelector('.items-area').innerHTML = '';    
    arrItens.forEach((itemHtml) => {
        shopMain.querySelector('.items-area').append(itemHtml);
    });
}


let pizzas = pizzaJson.map(itemPizza => {
    let new_component = itemComponent(itemPizza, 'pizza');
    return new_component;
});

let title_pizzas = document.querySelector('.title-vitrine').cloneNode(true);
title_pizzas.innerHTML = 'Pizzas';


let bebidas = bebidaJson.map(itemBebida => {
    let new_component = itemComponent(itemBebida, 'bebida');
    return new_component;
})

let sobremesas = sobremesaJson.map(itemSobremesa => {
    let new_component = itemComponent(itemSobremesa, 'sobremesa');
    return new_component;
})

//Para inicializar o App Web com a vitrine de Pizzas.

view_control = 'pizzas';
const titles = document.querySelector('.slider-title-vitrine').cloneNode(true);
titles.querySelectorAll('.title-vitrine')[0].innerHTML = 'Pizzas';
titles.querySelectorAll('.title-vitrine')[1].innerHTML = 'Sobremesas';
titles.querySelectorAll('.title-vitrine')[2].innerHTML = 'Bebidas';
shopMain.querySelector('.title-area').append(titles);

imprimirNaTela(pizzas);

document.querySelectorAll('.options-items-view li').forEach((itemView) => {
    itemView.addEventListener('click', (event) => {
        let element = document.querySelector('.options-items-view li.onview');
        element.classList.remove('onview');
        event.target.classList.add('onview');
    });
});



document.querySelector('#pizzas-view').addEventListener('click', () => {
    document.querySelector('.title-area .slider-title-vitrine').style.marginLeft = '0';
    view_control = 'pizzas';        
    imprimirNaTela(pizzas);
});


document.querySelector('#sobremesas-view').addEventListener('click', ()=> {
    document.querySelector('.title-area .slider-title-vitrine').style.marginLeft = '-100%';
    view_control = 'sobremesas';           
    imprimirNaTela(sobremesas);
});

document.querySelector('#bebidas-view').addEventListener('click', ()=> {
    document.querySelector('.title-area .slider-title-vitrine').style.marginLeft = '-200%';
    view_control = 'bebidas';       
    imprimirNaTela(bebidas);
});

// Funções para a Applicação mobile

document.querySelectorAll('.title-area .title-vitrine')[0].addEventListener('touchmove', (event) => {
    console.log(event.touches[0].clientX);        
        if(event.touches[0].clientX > window.screenX / 2){
            document.querySelector('.title-area .slider-title-vitrine').style.marginLeft = '-100%';
        }
});

document.querySelectorAll('.title-area .title-vitrine')[1].addEventListener('touchmove', (event) => {           
    if(event.touches[0].clientX > window.screenX / 2){
        document.querySelector('.title-area .slider-title-vitrine').style.marginLeft = '-200%';
    }else {
        document.querySelector('.title-area .slider-title-vitrine').style.marginLeft = '0';
    }
});

document.querySelectorAll('.title-area .title-vitrine')[2].addEventListener('touchmove', (event) => {
    console.log(event.touches[0].clientX);        
        if(event.touches[0].clientX < window.screenX / 2){
            document.querySelector('.title-area .slider-title-vitrine').style.marginLeft = '-100%';
        }
});


// Função na label para mostrar a select-box

const openOrdinationList = () => {
    let ordination_list = document.querySelector('.ordination-list');
    if(ordination_list.classList.contains('desactivated')){
        ordination_list.classList.remove('desactivated');
        ordination_list.classList.add('activated');
    } else {
        ordination_list.classList.remove('activated');
        ordination_list.classList.add('desactivated');
    }
}

document.querySelector('.open-list').addEventListener('click', openOrdinationList);



// Função para o select-box de ordenação dos itens

document.querySelectorAll('.ordination-list div').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.ordination-list div.selected')
        .classList.remove('selected');
        item.classList.add('selected');
        document.querySelector('.open-list').innerHTML = item.textContent
        openOrdinationList();
    });
})

document.querySelector('.ordination-asc').addEventListener('click', () => {
    shopMain.innerHTML = '';
    ordination_control = 'asc'
    switch(view_control){
        case 'pizzas':
            var title = document.querySelector('.title-vitrine').cloneNode(true);
            title.innerHTML = 'Pizzas';
            shopMain.append(title);    
            imprimirNaTela(pizzas);
            break;
        case 'bebidas':
            var title = document.querySelector('.title-vitrine').cloneNode(true);
            title.innerHTML = 'Bebidas';
            shopMain.append(title);    
            imprimirNaTela(bebidas);
            break;
        case 'sobremesas':
            var title = document.querySelector('.title-vitrine').cloneNode(true);
            title.innerHTML = 'Sobremesas';
            shopMain.append(title);            
            imprimirNaTela(sobremesas);
            break;
    }
});

document.querySelector('.ordination-desc').addEventListener('click', () => {
    shopMain.innerHTML = ''
    ordination_control = 'desc'
    switch(view_control){
        case 'pizzas':
            var title = document.querySelector('.title-vitrine').cloneNode(true);
            title.innerHTML = 'Pizzas';
            shopMain.append(title);    
            imprimirNaTela(pizzas);
            break;
        case 'bebidas':
            var title = document.querySelector('.title-vitrine').cloneNode(true);
            title.innerHTML = 'Bebidas';
            shopMain.append(title);    
            imprimirNaTela(bebidas);
            break;
        case 'sobremesas':
            var title = document.querySelector('.title-vitrine').cloneNode(true);
            title.innerHTML = 'Sobremesas';
            shopMain.append(title);            
            imprimirNaTela(sobremesas);
            break;
    }
});

//ordenação dos itens
/*
document.querySelector('.ordination-asc').addEventListener('click', () => {
    let view = document.querySelector('li.onview');

    let pizzas_result_sort = pizzas.sort((item_a, item_b) =>{
        let get_price_item_a = item_a.querySelector('.price-vitrine').textContent.slice(2,);
        let get_price_item_b = item_b.querySelector('.price-vitrine') .textContent.slice(2,);
        let price_a = Number(get_price_item_a);
        let price_b = Number(get_price_item_b);

        return price_a - price_b;
    });

    let bebidas_result_sort = bebidas.sort((item_a, item_b) =>{
        let get_price_item_a = item_a.querySelector('.price-vitrine').textContent.slice(2,);
        let get_price_item_b = item_b.querySelector('.price-vitrine') .textContent.slice(2,);
        let price_a = Number(get_price_item_a);
        let price_b = Number(get_price_item_b);

        return price_a - price_b;
    });

    let sobremesas_result_sort = sobremesas.sort((item_a, item_b) =>{
        let get_price_item_a = item_a.querySelector('.price-vitrine').textContent.slice(2,);
        let get_price_item_b = item_b.querySelector('.price-vitrine') .textContent.slice(2,);
        let price_a = Number(get_price_item_a);
        let price_b = Number(get_price_item_b);

        return price_a - price_b;
    });

    
    switch(view.id){
        case 'pizzas-view':
            pizzas_result_sort.forEach((pizzaJson) => {
                imprimirNaTela(pizzaJson);
            });
            break;
        case 'sobremesas-view':
            sobremesas_result_sort.forEach((sobremesasJson) => {
                imprimirNaTela(sobremesasJson);
            });
            break;
        case 'bebidas-view':
            bebidas_result_sort.forEach((bebidasJson) => {
                imprimirNaTela(bebidasJson);
            });
    }
   

})


document.querySelector('.ordination-desc').addEventListener('click', () => {
    
    let view = document.querySelector('li.onview');
    
    let pizzas_result_sort = pizzas.sort((item_a, item_b) =>{
        let get_price_item_a = item_a.querySelector('.price-vitrine').textContent.slice(2,);
        let get_price_item_b = item_b.querySelector('.price-vitrine') .textContent.slice(2,);
        let price_a = Number(get_price_item_a);
        let price_b = Number(get_price_item_b);

        if(price_a > price_b){
            return -1;
        } else {
            return 1;
        }
    });

    let bebidas_result_sort = bebidas.sort((item_a, item_b) =>{
        let get_price_item_a = item_a.querySelector('.price-vitrine').textContent.slice(2,);
        let get_price_item_b = item_b.querySelector('.price-vitrine') .textContent.slice(2,);
        let price_a = Number(get_price_item_a);
        let price_b = Number(get_price_item_b);

        if(price_a > price_b){
            return -1;
        } else {
            return 1;
        }
    });

    let sobremesas_result_sort = sobremesas.sort((item_a, item_b) =>{
        let get_price_item_a = item_a.querySelector('.price-vitrine').textContent.slice(2,);
        let get_price_item_b = item_b.querySelector('.price-vitrine') .textContent.slice(2,);
        let price_a = Number(get_price_item_a);
        let price_b = Number(get_price_item_b);

        if(price_a > price_b){
            return -1;
        } else {
            return 1;
        }
    });


    switch(view.id){
        case 'pizzas-view':
            pizzas_result_sort.forEach((pizzaJson) => {
                imprimirNaTela(pizzaJson);
            });
            break;
        case 'sobremesas-view':
            sobremesas_result_sort.forEach((sobremesasJson) => {
                imprimirNaTela(sobremesasJson);
            });
            break;
        case 'bebidas-view':
            bebidas_result_sort.forEach((bebidasJson) => {
                imprimirNaTela(bebidasJson);
            });
    }
})
*/

// Funções do Botão da vitrine, que vai ativar o menu do item, que possui mais descrições

function openFilterPrice(){
    let filter_container = document.querySelector('.container-filter-price');
    if(filter_container.style.display == 'flex'){
        filter_container.style.display = 'none';
    }else{
        filter_container.style.display = 'flex';
    }
}

document.querySelector('.open-list-filter').addEventListener('click', openFilterPrice);

document.getElementById('filter-icon').addEventListener('click', openFilterPrice);

document.querySelector('.btn-filter-price').addEventListener('click', () => {
    filter_control = true;
    shopMain.innerHTML = '';
    switch(view_control){
        case 'pizzas':
            imprimirNaTela(pizzas);
            break;
        case 'bebidas':
            imprimirNaTela(bebidas);
            break;
        case 'sobremesas':
            imprimirNaTela(sobremesas);
            break;
    }
});