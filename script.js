const imageContainer = document.getElementById('image-container');
const laoder = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let imageCount = 5;
const apiKey = 'qceTFYd85qbMz9V3VF4Ojx4XLQ_0Iu2m-_5pNWVD0PY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;


// check if all images were loaded

function imageLoaded(){
    imagesLoaded++;
    console.log(totalImages);
    if (imagesLoaded === totalImages){
        ready = true;
        laoder.hidden = true;
        imageCount = 10;
    }
}


//  helper to set attributes

function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
};

// create elements for links and phots

function displayPhotos(){
    totalImages = photosArray.length;
    imagesLoaded = 0;
    photosArray.forEach ((photo) =>{
        // create <a>  to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // img for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src:  photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // put img inside a, then both inside container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get photos

async function getPhotoes(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){

    }
}


// check scrolling on bottom page, load more

window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotoes();
        ready = true;
     }
});

// on load

getPhotoes();