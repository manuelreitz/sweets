const lightbox = d3.select('#lightbox');
const lightboxContent = d3.select('#lightbox-content');
const lightboxDetails = d3.select('#lightbox-details');
// const lightboxImage = d3.select('#lightbox-image');
const closeButton = lightbox.select('.close');
const leftNav = lightbox.select('.left');
const rightNav = lightbox.select('.right');

let currentIndex = 0;
let currentData = [];

function showLightbox(index) {
    currentIndex = index;
    const d = currentData[currentIndex];

    lightboxDetails.html(`
        <h1>${d.name}</h1>
        <i>${d.othernames}</i><br><br>
        Category: ${d.category}<br>
        Sweetness: ${d.sweetnes}<br>
        Calories: ${d.calories}<br>
        GI: ${d.gi}<br>
        Nutrients: ${d.nutrients}<br>
        Prebiotic: ${d.prebiotic}<br>
        Metabolic: ${d.metabolic}<br>
        Tooth: ${d.tooth}<br>
        Heat: ${d.heat}<br>
        Laxative: ${d.laxative}<br>
        Aftertaste: ${d.aftertaste}<br><br>
        <i>${d.notes}</i>
    `);

    // lightboxImage.attr('src', `media/${d.symbol.toLowerCase()}.jpg`);

    lightbox.style('display', 'block');
    lightboxContent.style('background-color', categoryColors[d.category]);
}

function hideLightbox() {
    lightbox.style('display', 'none');
}

function showPrevious() {
    if (currentIndex > 0) {
        showLightbox(currentIndex - 1);
    }
}

function showNext() {
    if (currentIndex < currentData.length - 1) {
        showLightbox(currentIndex + 1);
    }
}

closeButton.on('click', hideLightbox);
leftNav.on('click', showPrevious);
rightNav.on('click', showNext);

lightbox.on('click', (event) => {
    if (event.target === lightbox.node()) {
        hideLightbox();
    }
});

container.selectAll('.box')
    .on('click', (event, d) => {
        currentData = container.selectAll('.box').data();
        const index = currentData.findIndex(item => item.name === d.name);
        showLightbox(index);
    });

// Touch-Event-Handler für Swiping
let startX;

function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    startX = firstTouch.clientX;
}

function handleTouchMove(event) {
    if (!startX) {
        return;
    }

    let currentX = event.touches[0].clientX;
    let diffX = startX - currentX;

    if (diffX > 50) {
        showNext();
    } else if (diffX < -50) {
        showPrevious();
    }

    startX = null;
}

lightbox.on('touchstart', handleTouchStart);
lightbox.on('touchmove', handleTouchMove);