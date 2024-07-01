const categoryColors = {
    "Raw": "#6e4c9e",
    "Cooked": "#f48989",
    "Partly Refined": "#7a8d60",
    "Other Refined": "#efa162",
    "Refined Sugar": "#932969",
    "Sugar Alcohol": "#7f7288",
    "Synthetic Sugar": "#d1aaa8",
    "Synthetic Sugar Alcohol": "#5685a5"
};

const groupedData = d3.group(data, d => d.category);

const container = d3.select('#container1');

const filterButtonAll = d3.select('#filterButtonAll');
const filterButtonPrebiotic = d3.select('#filterButtonPrebiotic');
const filterButtonLowCalories = d3.select('#filterButtonLowCalories');

const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip');

groupedData.forEach((values, key) => {
    const column = container.append('div').attr('class', 'column');

    column.append('div')
        .attr('class', 'headline')
        .text(key)
        .style('color', categoryColors[key]);

    const row = column.append('div').attr('class', 'row');
    row.selectAll('.box')
        .data(values)
        .enter()
        .append('div')
        .attr('class', 'box')
        .style('background-color', categoryColors[key])
        .text(d => d.symbol)
        .on('mouseover', (event, d) => {
            tooltip.style('opacity', 1)
                .html(`
                    <strong>${d.name}</strong><br>
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
                    Aftertaste: ${d.aftertaste}
                `);
        })
        .on('mousemove', (event) => {
            tooltip.style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY + 10) + 'px');
        })
        .on('mouseout', () => {
            tooltip.style('opacity', 0);
        });
});

filterButtonPrebiotic.on('click', () => {
    container.selectAll('.box')
        .each(function(d) {
            const box = d3.select(this);
            if (d.prebiotic === "no") {
                box.style('opacity', 0.2);
            } else {
                box.style('opacity', 1);
            }
        });
});

filterButtonAll.on('click', () => {
    container.selectAll('.box')
        .each(function(d) {
            const box = d3.select(this);
            box.style('opacity', 1);
        });
});

filterButtonLowCalories.on('click', () => {
    container.selectAll('.box')
        .each(function(d) {
            const box = d3.select(this);
            if (d.calories < 100) {
                box.style('opacity', 1);
            } else {
                box.style('opacity', 0.2);
            }
        });
});

function updateScaleFactor() {
    const windowWidth = window.innerWidth;
    const maxWidth = 896;

    const scaleFactor = Math.min(1, (windowWidth / maxWidth));

    container.style('transform', `scale(${scaleFactor})`);
}

updateScaleFactor();
window.addEventListener('resize', updateScaleFactor);

const lightbox = d3.select('#lightbox');
const lightboxContent = d3.select('#lightbox-content');
const lightboxDetails = d3.select('#lightbox-details');
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
        Aftertaste: ${d.aftertaste}
    `);

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
let isSwiping = false;

function handleTouchStart(event) {
    console.log('start');
    const firstTouch = event.touches[0];
    startX = firstTouch.clientX;
    isSwiping = true;
}

function handleTouchMove(event) {
    if (!isSwiping) {
        return;
    }

    let currentX = event.touches[0].clientX;
    let diffX = startX - currentX;

    // Swiping nach links
    if (diffX > 50) {
        showNext();
        isSwiping = false; // Prevent multiple swipes
    }

    // Swiping nach rechts
    if (diffX < -50) {
        showPrevious();
        isSwiping = false; // Prevent multiple swipes
    }
}

function handleTouchEnd() {
    isSwiping = false; // Reset swipe state
}

lightbox.on('touchstart', handleTouchStart);
lightbox.on('touchmove', handleTouchMove);
lightbox.on('touchend', handleTouchEnd);