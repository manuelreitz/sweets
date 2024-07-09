let filterDescriptions = {}; // Objekt zur Speicherung der Filterbeschreibungen

const filterButtonAll = d3.select('#filterAll');
const filterButtonPrebiotic = d3.select('#filterPrebiotic');
const filterButtonLowCalories = d3.select('#filterLowCalories');
const filterButtonToothDecay = d3.select('#filterToothDecay');
const filterButtonSweetness = d3.select('#filterSweetness');
const filterButtonGI = d3.select('#filterGI');
const filterButtonNutrients = d3.select('#filterNutrients');
const filterButtonHeat = d3.select('#filterHeat');
const filterButtonLaxative = d3.select('#filterLaxative');
const filterButtonAftertaste = d3.select('#filterAftertaste');

const selectedFilterDiv = d3.select('#selectedFilter');
const filterDescriptionDiv = d3.select('#filterDescription');
const clearFilterButton = d3.select('#clearFilterButton');
// const container = d3.select('#container1');

// Funktion zum Laden der Filterbeschreibungen aus der JSON-Datei
function loadFilterDescriptions() {
    d3.json('filter-descriptions.json').then(data => {
        filterDescriptions = data;
    });
}

// Funktion zum Zurücksetzen aller Filter
function clearFilters() {
    container.selectAll('.box').style('opacity', 1);
    container.selectAll('.filter-value').remove(); // Entferne vorherige Filterwerte
    d3.selectAll('.dropdown-content a').classed('active', false);
    activeFilter = null;
    selectedFilterDiv.text('');
    filterDescriptionDiv.text('');
    clearFilterButton.style('display', 'none');
    adjustBoxContent();
    updateHeaderBackground('All');
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
        selectedFilterDiv.text(filterName);
        filterDescriptionDiv.text(filterDescriptions[filterName]);
        clearFilterButton.style('display', 'inline-block');
        adjustBoxContent();
        updateHeaderBackground(filterName);
    }
}





// Filter-Option-Events
filterButtonPrebiotic.on('click', function() {
    toggleFilter(d3.select(this), d => d.prebiotic === "yes", 'Prebiotic');
});

filterButtonLowCalories.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityByCalories(d));
        d3.select(this).classed('active', true);
        activeFilter = 'Low Calories';
        selectedFilterDiv.text(activeFilter);
        filterDescriptionDiv.text(filterDescriptions[activeFilter]);
        clearFilterButton.style('display', 'inline-block');
        updateHeaderBackground(activeFilter);
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonToothDecay.on('click', function() {
    toggleFilter(d3.select(this), d => d.tooth === "yes", 'Tooth Decay');
});

filterButtonSweetness.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityBySweetness(d));
        d3.select(this).classed('active', true);
        activeFilter = 'Sweetness';
        selectedFilterDiv.text(activeFilter);
        filterDescriptionDiv.text(filterDescriptions[activeFilter]);
        clearFilterButton.style('display', 'inline-block');
        updateHeaderBackground(activeFilter);
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonGI.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityByGI(d));
        d3.select(this).classed('active', true);
        activeFilter = 'Glycemic Index';
        selectedFilterDiv.text(activeFilter);
        filterDescriptionDiv.text(filterDescriptions[activeFilter]);
        clearFilterButton.style('display', 'inline-block');
        updateHeaderBackground(activeFilter);
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonNutrients.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityByNutrients(d));
        container.selectAll('.box').append('span').attr('class', 'filter-value').text(d => d.nutrients);
        d3.select(this).classed('active', true);
        activeFilter = 'Nutrients';
        selectedFilterDiv.text(activeFilter);
        filterDescriptionDiv.text(filterDescriptions[activeFilter]);
        clearFilterButton.style('display', 'inline-block');
        updateHeaderBackground(activeFilter);
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonHeat.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityByHeat(d));
        d3.select(this).classed('active', true);
        activeFilter = 'Heat';
        selectedFilterDiv.text(activeFilter);
        filterDescriptionDiv.text(filterDescriptions[activeFilter]);
        clearFilterButton.style('display', 'inline-block');
        updateHeaderBackground(activeFilter);
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonLaxative.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityByLaxative(d));
        d3.select(this).classed('active', true);
        activeFilter = 'Laxative';
        selectedFilterDiv.text(activeFilter);
        filterDescriptionDiv.text(filterDescriptions[activeFilter]);
        clearFilterButton.style('display', 'inline-block');
        updateHeaderBackground(activeFilter);
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonAftertaste.on('click', function() {
    const isActive = d3.select(this).classed('active');
    clearFilters();
    if (!isActive) {
        container.selectAll('.box').style('opacity', d => setOpacityByAftertaste(d));
        d3.select(this).classed('active', true);
        activeFilter = 'Aftertaste';
        selectedFilterDiv.text(activeFilter);
        filterDescriptionDiv.text(filterDescriptions[activeFilter]);
        clearFilterButton.style('display', 'inline-block');
        updateHeaderBackground(activeFilter);
        adjustBoxContent(); // Aktualisiere die Box-Inhalte
    }
});

filterButtonAll.on('click', function() {
    clearFilters();
});

clearFilterButton.on('click', clearFilters);

function setOpacityByCalories(d) {
    if (d.calories < 11) return 1.0;
    if (d.calories > 11 && d.calories < 200) return 0.4;
    return MIN_OPACITY;
}

function setOpacityBySweetness(d) {
    if (d.sweetnes > 49) return 1.0;
    return MIN_OPACITY;
}

function setOpacityByGI(d) {
    if (d.gi < 56) return 1.0;
    if (d.gi >= 56 && d.gi <= 69) return 0.4;
    return MIN_OPACITY;
}

function setOpacityByNutrients(d) {
    if (d.nutrients === "yes") return 1.0;
    if (d.nutrients === "small") return 0.5;
    return MIN_OPACITY;
}

function setOpacityByHeat(d) {
    return d.heat === "yes" ? 1.0 : MIN_OPACITY;
}

function setOpacityByLaxative(d) {
    return d.laxative === "yes" ? 1.0 : MIN_OPACITY;
}

function setOpacityByAftertaste(d) {
    return d.aftertaste === "yes" ? 1.0 : MIN_OPACITY;
}

// Lade die Filterbeschreibungen beim Laden der Seite
loadFilterDescriptions();

const header = d3.select('header');

function updateHeaderBackground(filterName) {
    const filterImages = {
        "All": "media/all.jpg",
        "Prebiotic": "media/prebiotic.jpg",
        "Low Calories": "media/low-calories.jpg",
        "Tooth Decay": "media/tooth-decay.jpg",
        "Sweetness": "media/sweetness.jpg",
        "Glycemic Index": "media/glycemic-index.jpg",
        "Nutrients": "media/nutrients.jpg",
        "Heat": "media/heat.jpg",
        "Laxative": "media/laxative.jpg",
        "Aftertaste": "media/aftertaste.jpg"
    };

    const imageUrl = filterImages[filterName] || "media/all.jpg";
    header.style('background-image', `url(${imageUrl})`);
}