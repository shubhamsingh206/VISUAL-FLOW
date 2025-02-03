//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 6000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)

// Auto Animation Toggle
let isAutoAnimationEnabled = true;
const autoToggleButton = document.getElementById('autoToggle');

autoToggleButton.addEventListener('click', function() {
    isAutoAnimationEnabled = !isAutoAnimationEnabled;
    
    if (isAutoAnimationEnabled) {
        // Resume auto animation
        runNextAuto = setTimeout(() => {
            next.click();
        }, timeAutoNext);
        
        // Update button appearance
        autoToggleButton.classList.remove('paused');
    } else {
        // Stop auto animation
        clearTimeout(runNextAuto);
        
        // Update button appearance
        autoToggleButton.classList.add('paused');
    }
});

function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    
    // Only set timeout if auto animation is enabled
    if (isAutoAnimationEnabled) {
        runNextAuto = setTimeout(() => {
            next.click();
        }, timeAutoNext);
    }
}

// See More Button Implementation
const seeMoreButtons = document.querySelectorAll('.buttons button:first-child');

seeMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Create a container for all images
        const imageContainer = document.createElement('div');
        imageContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            overflow-y: auto;
            z-index: 1000;
        `;

        // Get all images from the carousel
        const images = document.querySelectorAll('.carousel .list .item img');
        
        // Add each image to the container
        images.forEach(img => {
            const imgWrapper = document.createElement('div');
            imgWrapper.style.cssText = `
                height: 400px;
                overflow: hidden;
                border-radius: 10px;
                cursor: pointer;
            `;
            
            const newImg = document.createElement('img');
            newImg.src = img.src;
            newImg.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s;
            `;
            
            imgWrapper.appendChild(newImg);
            imageContainer.appendChild(imgWrapper);
            
            // Add hover effect
            imgWrapper.onmouseover = () => newImg.style.transform = 'scale(1.1)';
            imgWrapper.onmouseout = () => newImg.style.transform = 'scale(1)';
            
            // Click to view full size
            imgWrapper.onclick = () => {
                const fullImg = document.createElement('div');
                fullImg.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1001;
                `;
                
                const largeImg = document.createElement('img');
                largeImg.src = img.src;
                largeImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                `;
                
                fullImg.appendChild(largeImg);
                document.body.appendChild(fullImg);
                
                fullImg.onclick = () => document.body.removeChild(fullImg);
            };
        });

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            z-index: 1001;
        `;
        
        closeBtn.onclick = () => document.body.removeChild(imageContainer);
        imageContainer.appendChild(closeBtn);
        
        document.body.appendChild(imageContainer);
    });
});

// Follow Button Implementation
const followButtons = document.querySelectorAll('.buttons button:last-child');
const linkedinUrl = 'https://www.linkedin.com/in/shubham-singh2006?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app';

followButtons.forEach(button => {
    button.addEventListener('click', function() {
        window.open(linkedinUrl, '_blank');
    });
});