const MAX_WIDTH = 879; // Maximale Breite für die erweiterte Ansicht
const MIN_OPACITY = 0.1; // Globale Variable für die minimale Deckkraft

const groupedData = d3.group(data, d => d.category);

const container = d3.select('#container1');

const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip');

container.selectAll('.box')
    .on('click', (event, d) => {
        currentData = container.selectAll('.box').data();
        const index = currentData.findIndex(item => item.name === d.name);
        showLightbox(index);
    });

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
        .style('text-decoration', categoryColors[key] + ' underline 3px'); // Schriftfarbe der Headlines

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

function updateScaleFactor() {
    const windowWidth = window.innerWidth;
    const maxWidth = 896;

    const scaleFactor = Math.min(1, (windowWidth / maxWidth));

    container.style('transform', `scale(${scaleFactor})`);
}

updateScaleFactor();
window.addEventListener('resize', updateScaleFactor);