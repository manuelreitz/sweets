const lightbox = d3.select('#lightbox');
const lightboxContent = d3.select('.lightbox-content');
const lightboxBody = d3.select('.lightbox-body');
const lightboxDetails = d3.select('.lightbox-details');
const lightboxHeader = d3.select('.lightbox-header');
const radarChart = d3.select('#radarChart');
const closeButton = lightbox.select('.close');
const leftNav = lightbox.select('.left');
const rightNav = lightbox.select('.right');

let currentIndex = 0;
let currentData = [];
const maxCalories = 400;
const maxSweetness = 10;
const maxGI = 105;

let previousIndex = -1;

function showLightbox(index) {
    const previousData = previousIndex >= 0 ? currentData[previousIndex] : null;
    currentIndex = index;
    const d = currentData[currentIndex];

    d3.select('.lightbox-title').text(d.name);
    d3.select('.symbol-box')
        .style('background-color', categoryColors[d.category])
        .text(d.symbol);

    d3.select('.lightbox-subtitle').html(`
        ${d.enumber || ' '} ${d.othernames || ' '}
    `);

    lightboxDetails.html(`
        <span class="detail-headline">KATEGORIE</span>
        <span class="detail-value detail-category">${d.category}</span>
        <span class="detail-headline">EIGENSCHAFTEN</span>
        <div class="properties">
        ${createPropertyElement("Zahnfreundlich", d.tooth === "ja", d.category, d.tooth)}
        ${createPropertyElement("Zum Backen geeignet", d.heat === "ja", d.category, d.heat)}
        ${createPropertyElement("Wirkt nicht abführend", d.laxative === "ja", d.category)}
        ${createPropertyElement("Kein unangenehmer Nachgeschmack", d.aftertaste === "ja", d.category)}
        ${createPropertyElement("Geeignet bei Fruktoseunverträglichkeit", d.fructose === "ja", d.category, d.fructose)}

        </div><br>

        <span class="detail-headline">TYPISCHE PRODUKTE</span>
        <span class="detail-value">${d.containedin}</span>
        <span class="detail-headline">HINWEISE</span>
        <span class="detail-value">${d.notes}</span>
    `);

    d3.select(".detail-category")
        .style('color', categoryColors[d.category])
        .style("font-weight", "bold");

    function createPropertyElement(propertyName, condition, category, value) {
        console.log(value);
        const color = categoryColors[category];
        let opacity = 0.25; // Default opacity for conditions not met
        if (condition) {
            opacity = 1; // Condition met
        } else if (value === "bedingt") {
            opacity = 0.6; // Special case for "bedingt"
        } else if (value === "gut") {
            opacity = 1; // Special case for "gut"
        }

        const filterIcons = {
        "Zahnfreundlich": '<i class="fa-solid fa-tooth"></i>',
        "Zum Backen geeignet": '<i class="fa-solid fa-fire"></i>',
        "Wirkt nicht abführend": '<i class="fa-solid fa-restroom"></i>',
        "Kein unangenehmer Nachgeschmack": '<i class="fa-regular fa-face-grin-tongue"></i>',
        "Geeignet bei Fruktoseunverträglichkeit": '<i class="fa-regular fa-lemon"></i>',
    };

    // Get the icon for the given property name
    const icon = filterIcons[propertyName] || '';
    console.log(icon);

        return `<span class="property" style="background-color: ${color}; opacity: ${opacity};">${icon} ${propertyName}</span>`;
    };


    const radarData = currentData.map(item => ({
        category: item.category,
        calories: item.calories,
        sweetness: item.sweetness,
        gi: item.gi
    }));

    createPolarChart(radarData, index, previousData);

    lightbox.style('display', 'block');

    previousIndex = index;
}






function createPolarChart(data, highlightedIndex, previousData) {
    const width = 350;
    const height = 350;
    const radius = Math.min(width, height) / 2 * 0.6;
    const color = categoryColors[data[highlightedIndex].category];

    const scales = {
        calories: d3.scaleLinear().domain([0, maxCalories]).range([0, radius]),
        // sweetness: d3.scaleLog().domain([1, maxSweetness]).range([0, radius]).clamp(true),
        sweetness: d3.scaleLinear().domain([0, maxSweetness]).range([0, radius]).clamp(true),
        gi: d3.scaleLinear().domain([0, maxGI]).range([0, radius]),
    };

    const angles = {
        sweetness: { start: 0, end: 2 * Math.PI / 3 }, // 0 bis 120 Grad
        gi: { start: 2 * Math.PI / 3, end: 4 * Math.PI / 3 }, // 120 bis 240 Grad
        calories: { start: 4 * Math.PI / 3, end: 2 * Math.PI }, // 240 bis 360 Grad (0 Grad)
    };

    const attributes = ['sweetness', 'gi', 'calories'];

    const sucrose = {
        calories: 387,
        sweetness: 1,
        gi: 65,
    };

    radarChart.selectAll("*").remove();

    radarChart.style("background-color", color);

    const polarChartSvg = radarChart.append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("display", "block")
        .style("margin", "0 auto")
        .append("g")
        .attr("transform", `translate(${(width) / 2}, ${(height) / 2 -15})`);

    polarChartSvg.append("text")
        .attr("y", 180)
        .attr("fill", "#000")
        .style("font-size", "14px")
        .attr("text-anchor", "middle")
        .text("verglichen mit Haushaltszucker");

    attributes.forEach(attr => {
        const scale = scales[attr];
        const angle = angles[attr];
        const value = data[highlightedIndex][attr];
        const previousValue = previousData ? previousData[attr] : value;

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(d => scale(d.value))
            .startAngle(angle.start)
            .endAngle(angle.end);

        const path = polarChartSvg.append("path")
            .datum({ value: value })
            .attr("fill", "#FFF")
            .attr("opacity", 1)
            .attr("d", arc);

        // Animate the transition from previousValue to new value
        path.transition()
            .duration(500)
            .attrTween("d", function(d) {
                if (attr === 'sweetnesss') {
                    const interpolate = d3.interpolate(previousValue, value);
                    return function(t) {
                        const interpolatedValue = interpolate(t);
                        if (interpolatedValue < 1) {
                            const linearScale = d3.scaleLinear().domain([0, 1]).range([0, scale(1)]);
                            return arc({ value: linearScale(interpolatedValue) });
                        } else {
                            return arc({ value: scale(interpolatedValue) });
                        }
                    };
                } else {
                    const interpolate = d3.interpolate({ value: previousValue }, d);
                    return function(t) {
                        return arc(interpolate(t));
                    };
                }
            });

        // Additional white arc for sweetness values over 50
        if (attr === 'sweetness' && value > 10) {
            const extraArc1 = d3.arc()
                .innerRadius(scale(maxSweetness) + 3)
                .outerRadius(scale(maxSweetness) + 3)
                .startAngle(angle.start)
                .endAngle(angle.end);

            polarChartSvg.append("path")
                .attr("stroke", "#FFF")
                .attr("stroke-width", "3px")
                .attr("opacity", 0)
                .attr("d", extraArc1)
                .transition()
                .delay(0) // No delay for the first arc
                .duration(250)
                .attr("opacity", 0.7);

            const extraArc2 = d3.arc()
                .innerRadius(scale(maxSweetness) + 6)
                .outerRadius(scale(maxSweetness) + 6)
                .startAngle(angle.start)
                .endAngle(angle.end);

            polarChartSvg.append("path")
                .attr("stroke", "#FFF")
                .attr("stroke-width", "2px")
                .attr("opacity", 0)
                .attr("d", extraArc2)
                .transition()
                .delay(125) // Delay for the second arc
                .duration(250)
                .attr("opacity", 0.5);

            const extraArc3 = d3.arc()
                .innerRadius(scale(maxSweetness) + 9)
                .outerRadius(scale(maxSweetness) + 9)
                .startAngle(angle.start)
                .endAngle(angle.end);

            polarChartSvg.append("path")
                .attr("stroke", "#FFF")
                .attr("stroke-width", "1px")
                .attr("opacity", 0)
                .attr("d", extraArc3)
                .transition()
                .delay(250) // Delay for the third arc
                .duration(250)
                .attr("opacity", 0.3);
        }

        // Vergleichswert (Sucrose)
        polarChartSvg.append("path")
            .attr("d", function(d) {
                if (attr === 'sweetnesss') {
                    const linearScale = d3.scaleLinear().domain([0, 2]).range([0, scale(2)]);
                    const sucroseArc = d3.arc()
                        .innerRadius(linearScale(sucrose[attr]))
                        .outerRadius(linearScale(sucrose[attr]))
                        .startAngle(angle.start)
                        .endAngle(angle.end);
                    return sucroseArc();
                } else {
                    const sucroseArc = d3.arc()
                        .innerRadius(scale(sucrose[attr]))
                        .outerRadius(scale(sucrose[attr]))
                        .startAngle(angle.start)
                        .endAngle(angle.end);
                    return sucroseArc();
                }
            })
            .attr("stroke", "#000")
            .attr("stroke-width", "3px")
            .attr("fill", "none")
            .attr("opacity", 0.6);

        // Hinzufügen der Labels
        const angleMiddle = ((angle.start + angle.end) / 2) - (Math.PI / 2);
        const labelX = (attr === 'gi' ? width / 2 : width / 2 + 10) * Math.cos(angleMiddle);
        const labelY = (attr === 'gi' ? height / 2 - 50 : height / 2 + 100) * Math.sin(angleMiddle);

        function translateAttribute(attr) {
            switch (attr) {
                case 'sweetness':
                    return 'Süße';
                case 'calories':
                    return 'Kalorien';
                case 'gi':
                    return 'Glykemischer Index';
                default:
                    return attr;
            }
        }

        polarChartSvg.append("text")
            .attr("x", labelX)
            .attr("y", labelY)
            .attr("text-anchor", attr === 'sweetness' ? 'end' : (attr === 'calories' ? 'start' : 'middle'))
            .attr("alignment-baseline", "top")
            .attr("fill", "#FFF")
            .style("font-size", "13px")
            .text(translateAttribute(attr).toUpperCase());

        const valueLabel = polarChartSvg.append("text")
            .attr("x", labelX)
            .attr("y", labelY + 25)
            .attr("text-anchor", attr === 'sweetness' ? 'end' : (attr === 'calories' ? 'start' : 'middle'))
            .attr("alignment-baseline", "bottom")
            .style("font-size", "22px")
            .style("font-weight", "bold");

        const sucroseValue = sucrose[attr];

        // Animate the label transition with special handling for sweetness
        valueLabel.transition()
            .duration(500)
            .tween("text", function() {
                const self = this;
                if (attr === 'sweetness') {
                    const interpolate = d3.interpolate(previousValue, value);
                    return function(t) {
                        const interpolatedValue = interpolate(t);
                        let displayValue;

                        // Bei Werten über 2 nur ganze Zahlen anzeigen
                        if (interpolatedValue > 2) {
                            displayValue = Math.round(interpolatedValue).toString();
                        } else {
                            displayValue = interpolatedValue.toFixed(2);

                            // Entferne Nachkommastellen, wenn sie null sind
                            if (displayValue.endsWith('.00')) {
                                displayValue = displayValue.slice(0, -3);
                            } else if (displayValue.endsWith('0')) {
                                displayValue = displayValue.slice(0, -1);
                            }

                            // Ersetze den Punkt durch ein Komma
                            displayValue = displayValue.replace('.', ',');
                        }

                        d3.select(self).html(`<tspan fill="#FFF">${displayValue}</tspan><tspan fill="#000" font-weight="normal"> | ${sucroseValue}</tspan>`);
                    };
                } else {
                    const interpolate = d3.interpolate(previousValue, value);
                    return function(t) {
                        const interpolatedValue = interpolate(t);
                        d3.select(self).html(`<tspan fill="#FFF">${Math.round(interpolatedValue)}</tspan><tspan fill="#000" font-weight="normal"> | ${sucroseValue}</tspan>`);
                    };
                }
            });

    });

    // Hintergrundringe
    const numCircles = 4;
    const circleRadius = radius / numCircles;

    for (let i = 1; i <= numCircles; i++) {
        polarChartSvg.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", i * circleRadius)
            .style("fill", "none")
            .style("stroke", "#CCC")
            .attr("opacity", 0.5);

        polarChartSvg.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", i * circleRadius + 1)
            .style("fill", "none")
            .style("stroke", "#000")
            .attr("opacity", 0);
    }

    const numLines = 3;
    const angleStep = (2 * Math.PI) / numLines;

    for (let i = 0; i < numLines; i++) {
        const angle = (i * angleStep) - (Math.PI / 2);
        const x = (radius + 20) * Math.cos(angle);
        const y = (radius + 20) * Math.sin(angle);

        polarChartSvg.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", x)
            .attr("y2", y)
            .style("stroke", "#CCC")
            .attr("opacity", 0.5);
    }
}


// Hinzufügen von Scroll-Ereignis für den Header-Schatten
lightboxBody.on('scroll', () => {
    if (lightboxBody.node().scrollTop > 0) {
        lightboxHeader.classed('shadow', true);
    } else {
        lightboxHeader.classed('shadow', false);
    }
});






function hideLightbox() {
    lightbox.style('display', 'none');
}

function showPrevious() {
    if (currentIndex > 0) {
        showLightbox(currentIndex - 1);
    } else {
        showLightbox(currentData.length - 1);
    }
}

function showNext() {
    if (currentIndex < currentData.length - 1) {
        showLightbox(currentIndex + 1);
    } else {
        showLightbox(0);
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

tableContainer.selectAll('.box')
    .on('click', (event, d) => {
        currentData = tableContainer.selectAll('.box').data();
        const index = currentData.findIndex(item => item.name === d.name);
        showLightbox(index);
    });

d3.select('body').on('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        showPrevious();
    } else if (event.key === 'ArrowRight') {
        showNext();
    } else if (event.key === 'Escape') {
        hideLightbox()
    }
});