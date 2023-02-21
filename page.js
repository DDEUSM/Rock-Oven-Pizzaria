let id_slider = 1;
/*
function nextStatus(id_status){

    let status = document.querySelector('.status.actual');
    status.classList.remove('actual');
    document.querySelectorAll('.status')[id_status].classList.add('actual');
    
}

setInterval(() => {
    if(id_slider <= 2){
        document.querySelector('.slider-show').style.marginLeft = `-${id_slider * 100}vw`;
        nextStatus(id_slider);        
    } else {
        document.querySelector('.slider-show').style.marginLeft = `0`;
        id_slider = 0;
        nextStatus(id_slider);
    }
    id_slider ++;
}, 5000);
*/
document.querySelectorAll('.mouse-zoom span').forEach((element) => {
    element.addEventListener('click', (event) => {
        let fatherEl = event.currentTarget.parentNode;
        let imgUrl = fatherEl.nextElementSibling.src;        
        document.querySelector('.view-image img').src = imgUrl;        
        let viewImg = document.querySelector('.container-view-image')        
        viewImg.style.display = 'flex';
        setTimeout(() => {viewImg.style.opacity = 1;},100)
    })
})

document.querySelector('.container-view-image').addEventListener('click', (event) => {
    if(event.target.classList.contains('container-view-image')){
        event.target.style.opacity = 0;
        setTimeout(() => {event.target.style.display = 'none';}, 300)
    }
})

document.querySelector('#view-image-btn-left').addEventListener('click', () => {
    
    let elImg = document.querySelector('.view-image img');
    let urlImg = elImg.src;
    let n_img = Number(urlImg[urlImg.length - 5]);
    if(n_img > 1){
        document.querySelector('.container-view-image').style.opacity = 0;
        n_img --;
        urlImg = urlImg.slice(0, -5);
        urlImg += `${n_img}.jpg`;        
        setTimeout(() => {
            elImg.src = urlImg;
            document.querySelector('.container-view-image').style.opacity = 1;
        }, 300)
    }
});

document.querySelector('#view-image-btn-right').addEventListener('click', () => {
    let elImg = document.querySelector('.view-image img');
    let urlImg = elImg.src;
    let n_img = Number(urlImg[urlImg.length - 5]);    
    let n_childs = document.querySelector('.container-grid-fotos').childElementCount;    
    if(n_img < n_childs){
        document.querySelector('.container-view-image').style.opacity = 0;
        n_img ++;
        urlImg = urlImg.slice(0, -5);
        urlImg += `${n_img}.jpg`;
        setTimeout(() => {
            elImg.src = urlImg;
            document.querySelector('.container-view-image').style.opacity = 1;
        }, 300)  
    }        
});