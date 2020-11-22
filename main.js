let screensaver_active = false;
let mousetimeout;
let bezdeistvie = 10000;  // Час коли потрібно ввімкнути Заставку
let interval = 5000; // Інтервал зміни фотографій

function show_screensaver() { // Функція ввімкнення Заставки
    screensaver_active = true;
    str_anim();
}

function stop_screensaver() { // // Функція зупинки Заставки
    screensaver_active = false;
}

window.onmousemove = reset_timer; 
function reset_timer(){
    clearTimeout(mousetimeout);

    if (screensaver_active) {
        stop_screensaver();
    }

    mousetimeout = setTimeout(function(){
        show_screensaver();
    },bezdeistvie); 	
}

function str_anim(){ 
    if (screensaver_active) {
        imagetimeout=setInterval(function(){disp_img();moveImage();}, interval);
    }
}

function moveImage(){ // Виведення зображень
    if (!screensaver_active){
        fadeOut(image_Element);
        clearTimeout(imagetimeout);
        return false;   
    }
    let randNum_V = Math.round(Math.random() * availSpace_V);
    let randNum_H = Math.round(Math.random() * availSpace_H);
    
    image_Element.style.top = randNum_V + "px";
    image_Element.style.left = randNum_H + "px";
    fadeIn(image_Element);
}


function fadeOut(el){ 
    el.style.opacity = 1;
  
    (function fade() {
      if ((el.style.opacity -= .1) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
}
  
function fadeIn(el, display){
    el.style.opacity = 0;
    el.style.display = display || "block";
  
    (function fade() {
      let val = parseFloat(el.style.opacity);
      if (!((val += .05) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) { // Збережння розмірів зображень

    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
}
function preparation(){
    window_Height = window.innerHeight;
    window_Width = window.innerWidth;
    
    image_Element = document.getElementsByTagName("img")[0];
    image_Element.style.position = "fixed";
    image_Height = image_Element.clientHeight;
    image_Width = image_Element.clientWidth;

    if (image_Height>window_Height || image_Width>window_Width){
        ascept_Sizes=calculateAspectRatioFit(image_Width,image_Height,window_Width,window_Height);
        image_Element.width=ascept_Sizes.width;
        image_Element.height=ascept_Sizes.height;
        image_Height = image_Element.clientHeight;
        image_Width = image_Element.clientWidth;
    }
    availSpace_V = window_Height - image_Height;
    availSpace_H = window_Width - image_Width;
}


function disp_img() // Імпорт зображень
{
    if (screensaver_active){
     let theImages = [{
        src: "https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060",
        width: "904",
        height: "678"
    }, {
        src: "https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560",
        width: "675",
        height: "900"
    }, {
        src: "https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200",
        width: "400",
        height: "300"
    }, {
        src: "https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500",
        width: "377",
        height: "600"
    }, {
        src: "https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260",
        width: "200",
        height: "300"
    }, {
        src: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        width: "1179",
        height: "1500"
    }, {
        src: "https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400",
        width: "800",
        height: "533"
    }];
    
    
    let preBuffer = [];
    for (let i = 0, j = theImages.length; i < j; i++) {
        preBuffer[i] = new Image();
        preBuffer[i].src = theImages[i].src;
        preBuffer[i].width = theImages[i].width;
        preBuffer[i].height = theImages[i].height;
    }
   

  function getRandomInt(min,max)  // Функція Рандому для виводу зображень в будь-якому порядку
    {

    
    imn = Math.floor(Math.random() * (max - min + 1)) + min;
    return preBuffer[imn];
    }  

  
    let newImage = getRandomInt(0, preBuffer.length - 1);
    

    let images = document.getElementsByTagName('img');
    let l = images.length;
    for (let p = 0; p < l; p++) {
        images[0].parentNode.removeChild(images[0]);
    }
    
    document.body.appendChild(newImage);
    preparation();
    }
}