const lightbox = d3.select('#lightbox');
const lightboxContent = d3.select('#lightbox-content');
const lightboxDetails = d3.select('#lightbox-details');
const radarChart = d3.select('#radarChart');
const closeButton = lightbox.select('.close');
const leftNav = lightbox.select('.left');
const rightNav = lightbox.select('.right');

let currentIndex = 0;
let currentData = [];

function createRadarChart(data, highlightedIndex) {
    // Bereinigen des Radar-Chart-Containers
    radarChart.selectAll("*").remove();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2 * 0.8;
    const angleSlice = Math.PI * 2 / data[0].attributes.length;
    const labelOffset = 10; // Abstand der Labels von den Ecken des RadarStrokes

    const radarChartSvg = radarChart.append("svg")
        .attr("width", width + 50)
        .attr("height", height + 50)
        .style("display", "block")
        .style("margin", "0 auto")
        .append("g")
        .attr("transform", `translate(${(width + 50) / 2}, ${(height + 50) / 2})`);

    // Skalen für die numerischen und kategorischen Werte
    const numericScale = d3.scaleLinear()
        .domain([0, 1])
        .range([radius * 0.3, radius]);

    const logScale = d3.scaleLog()
        .domain([1, 20000])
        .range([radius * 0.3, radius]);

    // Hintergrundgitter und Achsen
    const axisGrid = radarChartSvg.append("g").attr("class", "axisWrapper");

    // Hintergrundkreise für die Eigenschaften
    const circleRadii = [0.3, 0.44, 0.58, 0.72, 0.86, 1.0];
    circleRadii.forEach(level => {
        const levelFactor = radius * level;
        axisGrid.append("circle")
            .attr("class", "gridCircle")
            .attr("r", levelFactor)
            .style("fill", "none")
            .style("stroke", "#CDCDCD")
            .style("stroke-width", "1px")
            .style("opacity", 0.1);
    });

    // Achsen hinzufügen
    const axis = axisGrid.selectAll(".axis")
        .data(data[0].attributes)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
        .attr("x1", (d, i) => radius * 0.3 * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y1", (d, i) => radius * 0.3 * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("x2", (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
        .style("stroke", "#000")
        .style("stroke-width", "1px")
        .style("opacity", 0.1);

    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", "#000")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", (d, i) => {
            const x = (radius + 40) * Math.cos(angleSlice * i - Math.PI / 2);
            if (d.axis === "Calories") return x + 25; // Für Linksbindung
            return x;
        })
        .attr("y", (d, i) => (radius + 40) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("text-anchor", d => d.axis === "Calories" ? "end" : "middle")
        .text(d => d.axis)

    // Daten hinzufügen
    data.forEach((d, index) => {
        const dataValues = d.attributes.map((attr, i) => {
            let scaledValue;
            if (attr.axis === "Sweetness") {
                scaledValue = logScale(attr.value + 1);
            } else {
                const value = attr.value;
                scaledValue = numericScale(value);
            }
            return [
                scaledValue * Math.cos(angleSlice * i - Math.PI / 2),
                scaledValue * Math.sin(angleSlice * i - Math.PI / 2)
            ];
        });

        radarChartSvg.append("path")
            .attr("class", "radarStroke")
            .attr("d", d3.line()(dataValues.map(d => [d[0], d[1]])) + "Z")
            .style("fill", index === highlightedIndex ? categoryColors[d.category] : "none")
            .style("fill-opacity", index === highlightedIndex ? 0.8 : 0)
            .style("opacity", index === highlightedIndex ? 1 : 0.7);

        // Labels für die Werte hinzufügen
        if (index === highlightedIndex) {
            radarChartSvg.selectAll(".valueLabel")
                .data(dataValues)
                .enter()
                .append("text")
                .attr("class", "valueLabel")
                .attr("x", (d, i) => d[0] + labelOffset * Math.cos(angleSlice * i - Math.PI / 2))
                .attr("y", (d, i) => d[1] + labelOffset * Math.sin(angleSlice * i - Math.PI / 2))
                .attr("dy", "0.35em")
                .style("font-size", "12px")
                .style("fill", "#000")
                .attr("text-anchor", "middle")
                .text((d, i) => {
                    if (data[highlightedIndex].attributes[i].axis === "Sweetness") {
                        return data[highlightedIndex].attributes[i].value;
                    } else if (data[highlightedIndex].attributes[i].axis === "Calories") {
                        return data[highlightedIndex].attributes[i].value * 400;
                    } else if (data[highlightedIndex].attributes[i].axis === "GI") {
                        return data[highlightedIndex].attributes[i].value * 105;
                    }
                    return data[highlightedIndex].attributes[i].value;
                });
        }
    });
}

function showLightbox(index) {
    currentIndex = index;
    const d = currentData[currentIndex];

    lightboxDetails.html(`
        <h1>${d.name}</h1>
        <i>${d.othernames}</i><br><br>
        Category: ${d.category}<br>
        Sweetness: ${d.sweetnes}<br>
        Calories: ${d.calories}<br>
        GI: ${d.gi}<br><br>
        <i>${d.notes}</i>
    `);

    // Umwandlung der Daten für das Radar-Chart
    const radarData = currentData.map(item => ({
        category: item.category,
        attributes: [
            { axis: "Sweetness", value: item.sweetnes },
            { axis: "Calories", value: item.calories / 400 },
            { axis: "GI", value: item.gi / 105 }
        ]
    }));

    // Radar-Chart erstellen
    createRadarChart(radarData, index);

    lightbox.style('display', 'block');

    // lightbox.style('background-color', categoryColors[d.category]);

    lightboxContent.style('border', '20px solid ' + categoryColors[d.category])


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