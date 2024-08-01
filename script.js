const MAX_WIDTH = 930; // Maximale Breite für die erweiterte Ansicht
const MIN_OPACITY = 0.25; // Globale Variable für die minimale Deckkraft
let activeFilter = null; // Variable, um den aktiven Filter zu verfolgen

const groupedData = d3.group(data, d => d.category);

const tableContainer = d3.select('#tableContainer');

const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip');

tableContainer.selectAll('.box')
    .on('click', (event, d) => {
        currentData = tableContainer.selectAll('.box').data();
        const index = currentData.findIndex(item => item.name === d.name);
        showLightbox(index);
    });

function getCategoryNumber(category) {
    const categoryNumbers = {
        "Zucker (raffiniert)": "I",
        "Naturstoff (roh)": "II",
        "Naturstoff (verarbeitet)": "III",
        "Zuckeralkohol": "IV",
        "Synthetischer Süßstoff": "V"
    };

    return categoryNumbers[category] || "Unbekannte Kategorie";
}

groupedData.forEach((values, key) => {
    // Erstelle einen Container für die Kategorie
    const categoryContainer = tableContainer.append('div').attr('class', 'category-container');

    // Boxen pro Spalte
    const numBoxes = 5;

    // Berechnung der benötigten Anzahl an Spalten
    const numColumns = Math.ceil(values.length / numBoxes);

    categoryContainer.append('div')
        .attr('class', 'headlineNumber')
        .attr('colspan', numColumns) // Attribut für die CSS-Zentrierung
        .text(getCategoryNumber(key))
        .style('color', categoryColors[key]);

    // Zentriere die Headline unter den Spalten
    categoryContainer.append('div')
        .attr('class', 'headline')
        .attr('colspan', numColumns) // Attribut für die CSS-Zentrierung
        .text(function() {
            var words = key.split(' ');
            if (words.length == 2) {
                return words[0] + '<br>' + words[1];
            } else {
                return key;
            }
        })
        .style('color', categoryColors[key])
        .html(function() {
            var words = key.split(' ');
            if (words.length == 2) {
                return words[0] + '<br>' + words[1];
            } else {
                return key;
            }
        });

    const columns = categoryContainer.append('div').attr('class', 'columns');

    // Erstelle die Spalten und verteile die Boxen
    for (let i = 0; i < numColumns; i++) {
        const column = columns.append('div').attr('class', 'column');

        // Slice die Daten für die aktuelle Spalte
        const columnData = values.slice(i * numBoxes, (i + 1) * numBoxes);

        // Erstelle die Boxen in der aktuellen Spalte
        column.selectAll('.box')
            .data(columnData)
            .enter()
            .append('div')
            .attr('class', 'box')
            .style('background-color', categoryColors[key]) // Hintergrundfarbe der Boxen
            .html(d => `<div class="symbol">${d.symbol}</div>`)
        // .on('mouseover', (event, d) => {
        //     tooltip.style('opacity', 1)
        //         .html(`
        //             <strong>${d.name}</strong><br>
        //             Category: ${d.category}<br>
        //             Sweetness: ${d.sweetnes}<br>
        //             Calories: ${d.calories}<br>
        //             GI: ${d.gi}<br>
        //             Nutrients: ${d.nutrients}<br>
        //             Prebiotic: ${d.prebiotic}<br>
        //             Metabolic: ${d.metabolic}<br>
        //             Tooth: ${d.tooth}<br>
        //             Heat: ${d.heat}<br>
        //             Laxative: ${d.laxative}<br>
        //             Aftertaste: ${d.aftertaste}
        //         `);
        // })
        // .on('mousemove', (event) => {
        //     tooltip.style('left', (event.pageX + 10) + 'px')
        //         .style('top', (event.pageY + 10) + 'px');
        // })
        // .on('mouseout', () => {
        //     tooltip.style('opacity', 0);
        // });
    }
});


// Funktion zum Anpassen der Box-Inhalte basierend auf der Containerbreite und dem aktiven Filter
function adjustBoxContent() {
    const containerWidth = document.getElementById('tableContainer').offsetWidth;
    tableContainer.selectAll('.box').each(function(d) {
        const box = d3.select(this);
        // Entferne vorherigen Inhalt, falls vorhanden
        box.selectAll('span').remove();
        box.selectAll('.symbol').remove();
        box.selectAll('.filter-value').remove();

        // Füge den Namen und den Filterwert hinzu, wenn die Containerbreite größer als MAX_WIDTH ist
        if (containerWidth > MAX_WIDTH) {
            box.html(`<div class="symbol">${d.symbol}</div><span class="name">${d.name}</span><span class="e-number">${d.enumber}</span>`);
            if (activeFilter) {
                let filterValue = '';
                switch (activeFilter) {
                    case 'Prebiotic':
                        filterValue = d.prebiotic;
                        break;
                    case 'Low Calories':
                        filterValue = d.calories;
                        break;
                    case 'Tooth Decay':
                        filterValue = d.tooth;
                        break;
                    case 'Sweetness':
                        filterValue = d.sweetnes;
                        break;
                    case 'Glycemic Index':
                        filterValue = d.gi;
                        break;
                    case 'Nutrients':
                        filterValue = d.nutrients;
                        break;
                    case 'Heat':
                        filterValue = d.heat;
                        break;
                    case 'Laxative':
                        filterValue = d.laxative;
                        break;
                    case 'Aftertaste':
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
        };

        if (d.symbol === "Sa") {
            box.attr('id', 'box-highlight');
        } else {
            box.attr('id', null);
        };



    });
}


const accordions = d3.selectAll('.accordion');
const panels = d3.selectAll('.panel');

function closePanel(panel) {
    d3.select(panel)
        .classed('show', false)
        .style('max-height', '0px')
    setTimeout(() => {
        d3.select(panel).style('display', 'none');
    }, 400); // Gleiche Zeit wie die Transition-Dauer
}

function closeAllPanels(exceptPanel) {
    accordions.classed('active', false);
    panels.each(function() {
        if (this !== exceptPanel) {
            closePanel(this);
        }
    });
    d3.selectAll('.chevron').classed('rotate', false);
}

accordions.on('click', function(event, d) {
    const accordion = d3.select(this);
    const panel = accordion.node().nextElementSibling;
    const chevron = accordion.select('.chevron');

    const isActive = accordion.classed('active');

    closeAllPanels(panel);

    // Wenn das geklickte Accordion nicht aktiv war, öffne es
    if (!isActive) {
        accordion.classed('active', true);
        d3.select(panel).classed('show', true).style('display', 'block').style('max-height', panel.scrollHeight + 'px').style('display', 'block');
        chevron.classed('rotate', true);
    } else {

    }
});

// Das erste Segment zum Start ausgeklappt
const firstAccordion = d3.select('.accordion').node();
const firstPanel = firstAccordion.nextElementSibling;
d3.select(firstAccordion).classed('active', true);
d3.select(firstPanel).classed('show', true).style('max-height', firstPanel.scrollHeight + 'px').style('display', 'block');
d3.select(firstAccordion).select('.chevron').classed('rotate', true);

const headerColors = {
    "headerI": categoryColors["Zucker (raffiniert)"],
    "headerII": categoryColors["Naturstoff (roh)"],
    "headerIII": categoryColors["Naturstoff (verarbeitet)"],
    "headerIV": categoryColors["Zuckeralkohol"],
    "headerV": categoryColors["Synthetischer Süßstoff"],
    "headerQ": "#000"
};

for (const [key, value] of Object.entries(headerColors)) {
    d3.select(`#${key}`)
        .style('color', value);

    const numId = key.replace("header", "accordion");
    d3.select(`#${numId} .accordion-number`)
        .style('color', value);
}




// Initialer Aufruf der Funktion beim Laden der Seite
adjustBoxContent();

// Event-Listener für die Fenstergrößenänderung
// window.addEventListener('resize', adjustBoxContent);

// function updateScaleFactor() {
//     const windowWidth = window.innerWidth;
//     const scaleFactor = Math.min(1, (windowWidth / MAX_WIDTH));
//     tableContainer.style('transform', `scale(${scaleFactor})`);
// }

// updateScaleFactor();
// window.addEventListener('resize', updateScaleFactor);