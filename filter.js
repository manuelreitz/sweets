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
    tableContainer.selectAll('.box').style('opacity', 1).style('border', '2px solid #000'); // Setzt die Rahmenfarbe zurück
    tableContainer.selectAll('.filter-value').remove(); // Entferne vorherige Filterwerte
    d3.selectAll('.dropdown-content a').classed('active', false);
    activeFilter = null;
    selectedFilterDiv.text('');
    filterDescriptionDiv.html(filterDescriptions["all"].description);
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
        
        // Zusätzliche Bedingungen für "bedingt" und "gut"
        if (filterName === 'heat' || filterName === 'fructose') {
            tableContainer.selectAll('.box')
                .filter(d => d[filterName] === "bedingt")
                .style('opacity', 0.6);
        }
        
        if (filterName === 'toothDecay') {
            tableContainer.selectAll('.box')
                .filter(d => d.tooth === "gut")
                .style('border', '2px solid #fff');
        }

        button.classed('active', true);
        activeFilter = filterName;
        selectedFilterDiv.text(filterDescriptions[filterName].title);
        filterDescriptionDiv.html(filterDescriptions[filterName].description);
        clearFilterButton.style('display', 'inline-block');
        filterDropdownButton.html(`${filterDescriptions[filterName].title} <i class="fas fa-chevron-down"></i>`); // Ändere den Dropdown-Button-Text
        adjustBoxContent();
        updateHeaderBackground(filterName);
    }
}

filterButtonLowCalories.on('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten
    toggleFilter(d3.select(this), d => d.calories < 21, 'lowCalories');
});

filterButtonToothDecay.on('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten
    toggleFilter(d3.select(this), d => d.tooth === "ja" || d.tooth === "gut", 'toothDecay');
});

filterButtonSweetness.on('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten
    toggleFilter(d3.select(this), d => d.sweetness > 2, 'sweetness');
});

filterButtonGI.on('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten
    toggleFilter(d3.select(this), d => d.gi < 56, 'glycemicIndex');
});

filterButtonHeat.on('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten
    toggleFilter(d3.select(this), d => d.heat === "ja" || d.heat === "bedingt", 'heat');
});

filterButtonLaxative.on('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten
    toggleFilter(d3.select(this), d => d.laxative === "ja", 'laxative');
});

filterButtonAftertaste.on('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten
    toggleFilter(d3.select(this), d => d.aftertaste === "ja", 'aftertaste');
});

filterButtonFructose.on('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten
    toggleFilter(d3.select(this), d => d.fructose === "ja" || d.fructose === "bedingt", 'fructose');
});

filterButtonAll.on('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten
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
        "glycemicIndex": "media/glycemic-index.webp",
        "heat": "media/heat.webp",
        "laxative": "media/laxative.webp",
        "aftertaste": "media/aftertaste.webp",
        "fructose": "media/fructose.webp"
    };

    const imageUrl = filterImages[filterName] || "media/all.jpg";
    header.style('background-image', `url(${imageUrl})`);
}
