const MAX_WIDTH = 879; // Maximale Breite für die erweiterte Ansicht
const MIN_OPACITY = 0.1; // Globale Variable für die minimale Deckkraft

const groupedData = d3.group(data, d => d.category);

const container = d3.select('#container1');

const filterButtonAll = d3.select('#filterButtonAll');
const filterButtonPrebiotic = d3.select('#filterButtonPrebiotic');
const filterButtonLowCalories = d3.select('#filterButtonLowCalories');
const filterButtonToothDecay = d3.select('#filterButtonToothDecay');
const filterButtonSweetness = d3.select('#filterButtonSweetness'); // Neuer Button
const filterButtonGI = d3.select('#filterButtonGI');
const filterButtonNutrients = d3.select('#filterButtonNutrients');
const filterButtonHeat = d3.select('#filterButtonHeat');
const filterButtonLaxative = d3.select('#filterButtonLaxative');
const filterButtonAftertaste = d3.select('#filterButtonAftertaste');

const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip');

let activeFilter = null; // Variable, um den aktiven Filter zu verfolgen

// Funktion zum Anpassen der Box-Inhalte basierend auf der Containerbreite und dem aktiven Filter
function adjustBoxContent() {
    const containerWidth = document.getElementById('container1').offsetWidth;
    container.selectAll('.box').each(function(d) {
        const box = d3.select(this);
        // Entferne vorherigen Inhalt, falls vorhanden
        box.selectAll('span').remove();
        box.selectAll('.symbol').remove();
        box.selectAll('.filter-value').remove();

        // Füge den Namen und den Filterwert hinzu, wenn die Containerbreite größer als MAX_WIDTH ist
        if (containerWidth > MAX_WIDTH) {
            box.html(`<div class="symbol">${d.symbol}</div><span class="name">${d.name}</span>`);
            if (activeFilter) {
                let filterValue = '';
                switch (activeFilter) {
                    case 'prebiotic':
                        filterValue = d.prebiotic;
                        break;
                    case 'calories':
                        filterValue = d.calories;
                        break;
                    case 'tooth':
                        filterValue = d.tooth;
                        break;
                    case 'sweetness':
                        filterValue = d.sweetnes;
                        break;
                    case 'gi':
                        filterValue = d.gi;
                        break;
                    case 'nutrients':
                        filterValue = d.nutrients;
                        break;
                    case 'heat':
                        filterValue = d.heat;
                        break;
                    case 'laxative':
                        filterValue = d.laxative;
                        break;
                    case 'aftertaste':
                        filterValue = d.aftertaste;
                        break;
                    default:
                        filterValue = '';
                }
                box.append('span').attr('class', 'filter-value').text(filterValue);
            }
        } else {
            // Andernfalls wird nur das Symbol angezeigt
            box.html(`<div class="symbol">${d.symbol}</div>`);
        }

    });
}

groupedData.forEach((values, key) => {
    const column = container.append('div').attr('class', 'column');

    column.append('div')
        .attr('class', 'headline')
        .text(key)
        .style('color', categoryColors[key]); // Schriftfarbe der Headlines

    const row = column.append('div').attr('class', 'row');
    row.selectAll('.box')
        .data(values)
        .enter()
        .append('div')
        .attr('class', 'box')
        .style('background-color', categoryColors[key]) // Hintergrundfarbe der Boxen
        .html(d => `<div class="symbol">${d.symbol}</div>`)
        .on('mouseover', (event, d) => {
            tooltip.style('opacity', 1)
                .html(`
                    <strong>${d.name}</strong><br>
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

// Initialer Aufruf der Funktion beim Laden der Seite
adjustBoxContent();

// Event-Listener für die Fenstergrößenänderung
window.addEventListener('resize', adjustBoxContent);

// Funktion zum Zurücksetzen aller Filter
function clearFilters() {
    container.selectAll('.box').style('opacity', 1);
    d3.selectAll('button').classed('active', false);
    activeFilter = null;
    adjustBoxContent(); // Aktualisiere die Box-Inhalte
}

// Funktionen zum Aktivieren/Deaktivieren von Filtern
function toggleFilter(button, filterFn, filterName) {
    const isActive = button.classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box')
            .style('opacity', MIN_OPACITY)
            .filter(filterFn)
            .style('opacity', 1);
        button.classed('active', true);
        activeFilter = filterName;
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
}

// Funktion zum Setzen der Deckkraft basierend auf Kalorien
function setOpacityByCalories(d) {
    const minCalories = 0;
    const maxCalories = 400;
    const maxOpacity = 1.0;

    const opacity = maxOpacity - (d.calories / maxCalories) * (maxOpacity - MIN_OPACITY);
    return Math.max(opacity, MIN_OPACITY);
}

// Funktion zum Setzen der Deckkraft basierend auf Sweetness (Logarithmische Skala)
function setOpacityBySweetness(d) {
    const minSweetness = 1; // Minimaler Wert für Sweetness, um log(1) = 0 zu vermeiden
    const maxSweetness = 300; // Beispielhaft, anpassen an tatsächliche Daten
    const maxOpacity = 1.0;

    const logSweetness = Math.log(d.sweetnes + 1); // Logarithmische Skalierung
    const logMaxSweetness = Math.log(maxSweetness + 1);

    const opacity = MIN_OPACITY + (logSweetness / logMaxSweetness) * (maxOpacity - MIN_OPACITY);
    return Math.max(opacity, MIN_OPACITY);
}

// Funktion zum Setzen der Deckkraft basierend auf GI (Glycemic Index)
function setOpacityByGI(d) {
    const minGI = 0;
    const maxGI = 105;
    const maxOpacity = 1.0;

    const opacity = maxOpacity - (d.gi / maxGI) * (maxOpacity - MIN_OPACITY);
    return Math.max(opacity, MIN_OPACITY);
}

// Funktion zum Setzen der Deckkraft basierend auf Nutrients
function setOpacityByNutrients(d) {
    if (d.nutrients === "yes") return 1.0;
    if (d.nutrients === "small") return 0.5;
    return MIN_OPACITY;
}

// Funktion zum Setzen der Deckkraft basierend auf Heat
function setOpacityByHeat(d) {
    return d.heat === "yes" ? 1.0 : MIN_OPACITY;
}

// Funktion zum Setzen der Deckkraft basierend auf Laxative
function setOpacityByLaxative(d) {
    return d.laxative === "yes" ? 1.0 : MIN_OPACITY;
}

// Funktion zum Setzen der Deckkraft basierend auf Aftertaste
function setOpacityByAftertaste(d) {
    return d.aftertaste === "yes" ? 1.0 : MIN_OPACITY;
}

// Filter-Button-Events
filterButtonPrebiotic.on('click', function() {
    toggleFilter(d3.select(this), d => d.prebiotic === "yes", 'prebiotic');
});

filterButtonLowCalories.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityByCalories(d));
        d3.select(this).classed('active', true);
        activeFilter = 'calories';
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonToothDecay.on('click', function() {
    toggleFilter(d3.select(this), d => d.tooth === "yes", 'tooth');
});

filterButtonSweetness.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityBySweetness(d));
        d3.select(this).classed('active', true);
        activeFilter = 'sweetness';
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonGI.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityByGI(d));
        d3.select(this).classed('active', true);
        activeFilter = 'gi';
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonNutrients.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityByNutrients(d));
        d3.select(this).classed('active', true);
        activeFilter = 'nutrients';
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonHeat.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityByHeat(d));
        d3.select(this).classed('active', true);
        activeFilter = 'heat';
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonLaxative.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityByLaxative(d));
        d3.select(this).classed('active', true);
        activeFilter = 'laxative';
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonAftertaste.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityByAftertaste(d));
        d3.select(this).classed('active', true);
        activeFilter = 'aftertaste';
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonAll.on('click', function() {
    clearFilters();
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