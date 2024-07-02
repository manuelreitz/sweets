let activeFilter = null; // Variable, um den aktiven Filter zu verfolgen

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