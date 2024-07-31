let filterDescriptions = {}; // Objekt zur Speicherung der Filterbeschreibungen

const filterButtonAll = d3.select('#filterAll');
const filterButtonLowCalories = d3.select('#filterLowCalories');
const filterButtonToothDecay = d3.select('#filterToothDecay');
const filterButtonSweetness = d3.select('#filterSweetness');
const filterButtonGI = d3.select('#filterGI');
const filterButtonHeat = d3.select('#filterHeat');
const filterButtonLaxative = d3.select('#filterLaxative');
const filterButtonAftertaste = d3.select('#filterAftertaste');
const filterButtonFructose = d3.select('#filterFructose');

const selectedFilterDiv = d3.select('#selectedFilter');
const filterDescriptionDiv = d3.select('#filterDescription');
const clearFilterButton = d3.select('#clearFilterButton');
const filterDropdownButton = d3.select('#filterDropdownButton');

// Funktion zum Laden der Filterbeschreibungen aus der JSON-Datei
function loadFilterDescriptions() {
    d3.json('filter-descriptions.json').then(data => {
        data.forEach(item => {
            filterDescriptions[item.id] = item;
        });
    });
}

// Funktion zum Zurücksetzen aller Filter
function clearFilters() {
    tableContainer.selectAll('.box').style('opacity', 1);
    tableContainer.selectAll('.filter-value').remove(); // Entferne vorherige Filterwerte
    d3.selectAll('.dropdown-content a').classed('active', false);
    activeFilter = null;
    selectedFilterDiv.text('');
    filterDescriptionDiv.text(filterDescriptions["all"].description);
    clearFilterButton.style('display', 'none');
    filterDropdownButton.html(`${filterDescriptions["all"].title} <i class="fas fa-chevron-down"></i>`); // Setze den Dropdown-Button-Text zurück
    adjustBoxContent();
    updateHeaderBackground('all');
}

// Funktionen zum Aktivieren/Deaktivieren von Filtern
function toggleFilter(button, filterFn, filterName) {
    const isActive = button.classed('active');
    clearFilters();
    if (!isActive) {
        tableContainer.selectAll('.box')
            .style('opacity', MIN_OPACITY)
            .filter(filterFn)
            .style('opacity', 1);
        button.classed('active', true);
        activeFilter = filterName;
        selectedFilterDiv.text(filterDescriptions[filterName].title);
        filterDescriptionDiv.text(filterDescriptions[filterName].description);
        clearFilterButton.style('display', 'inline-block');
        filterDropdownButton.html(`${filterDescriptions[filterName].title} <i class="fas fa-chevron-down"></i>`); // Ändere den Dropdown-Button-Text
        adjustBoxContent();
        updateHeaderBackground(filterName);
    }
}

filterButtonLowCalories.on('click', function() {
    toggleFilter(d3.select(this), d => d.calories < 11, 'lowCalories');
});

filterButtonToothDecay.on('click', function() {
    toggleFilter(d3.select(this), d => d.tooth === "yes", 'toothDecay');
});

filterButtonSweetness.on('click', function() {
    toggleFilter(d3.select(this), d => d.sweetness > 1, 'sweetness');
});

filterButtonGI.on('click', function() {
    toggleFilter(d3.select(this), d => d.gi < 56, 'glycemicIndex');
});

filterButtonHeat.on('click', function() {
    toggleFilter(d3.select(this), d => d.heat === "yes", 'heat');
});

filterButtonLaxative.on('click', function() {
    toggleFilter(d3.select(this), d => d.laxative === "yes", 'laxative');
});

filterButtonAftertaste.on('click', function() {
    toggleFilter(d3.select(this), d => d.aftertaste === "yes", 'aftertaste');
});

filterButtonFructose.on('click', function() {
    toggleFilter(d3.select(this), d => d.fructose === "yes", 'fructose');
});

filterButtonAll.on('click', function() {
    clearFilters();
});

clearFilterButton.on('click', clearFilters);

loadFilterDescriptions();

const header = d3.select('header');

function updateHeaderBackground(filterName) {
    const filterImages = {
        "all": "media/all.webp",
        "lowCalories": "media/low-calories.webp",
        "toothDecay": "media/tooth-decay.webp",
        "sweetness": "media/sweetness.webp",
        "glycemicIndex": "media/glycemic-index.jpg",
        "nutrients": "media/nutrients.jpg",
        "heat": "media/heat.jpg",
        "laxative": "media/laxative.jpg",
        "aftertaste": "media/aftertaste.jpg",
        "fructose": "media/fructose.jpg"
    };

    const imageUrl = filterImages[filterName] || "media/all.jpg";
    header.style('background-image', `url(${imageUrl})`);
}
