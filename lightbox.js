const lightbox = d3.select('#lightbox');
const lightboxContent = d3.select('.lightbox-content');
const lightboxDetails = d3.select('.lightbox-details');
const radarChart = d3.select('#radarChart');
const closeButton = lightbox.select('.close');
const leftNav = lightbox.select('.left');
const rightNav = lightbox.select('.right');

let currentIndex = 0;
let currentData = [];
const maxCalories = 400;
const maxSweetness = 50;
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
        <span class="detail-value">${d.category}</span>
        <span class="detail-headline">TYPISCHE PRODUKTE</span>
        <span class="detail-value">${d.containedin}</span>
        <span class="detail-headline">BESCHREIBUNG</span>
        <span class="detail-value">${d.notes}</span>
        <span class="detail-headline">EIGENSCHAFTEN</span>
        <div class="properties">
            ${createPropertyElement("Prebiotic", d.prebiotic === "ja", d.category)}
            ${createPropertyElement("Low Calories", d.calories < 11, d.category)}
            ${createPropertyElement("Tooth Decay", d.tooth === "ja", d.category)}
            ${createPropertyElement("Sweetness", d.sweetness > 1, d.category)}
            ${createPropertyElement("Glycemic Index", d.gi < 56, d.category)}
            ${createPropertyElement("Nutrients", d.nutrients === "ja", d.category)}
            ${createPropertyElement("Heat", d.heat === "ja", d.category)}
            ${createPropertyElement("Laxative", d.laxative === "ja", d.category)}
            ${createPropertyElement("Aftertaste", d.aftertaste === "ja", d.category)}
        </div>
    `);

    function createPropertyElement(propertyName, condition, category) {
    const color = categoryColors[category];
    const opacity = condition ? 1 : 0.25;
    return `<span class="property" style="background-color: ${color}; opacity: ${opacity};">${propertyName}</span>`;
}


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
    const width = 250;
    const height = 250;
    const radius = Math.min(width, height) / 2 * 0.8;
    const color = categoryColors[data[highlightedIndex].category];

    const scales = {
        calories: d3.scaleLinear().domain([0, maxCalories]).range([0, radius]),
        sweetness: d3.scaleLog().domain([1, maxSweetness]).range([0, radius]).clamp(true),
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
        .attr("width", width + 50)
        .attr("height", height + 50)
        .style("display", "block")
        .style("margin", "0 auto")
        .append("g")
        .attr("transform", `translate(${(width + 50) / 2}, ${(height + 50) / 2})`);

    polarChartSvg.append("text")
        .attr("y", 170)
        .attr("fill", "#000")
        .style("font-size", "14px")
        .attr("text-anchor", "middle")
        .text("verglichen mit Haushaltszucker")

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
            .attr("d", arc);

        // Animate the transition from previousValue to new value
        path.transition()
            .duration(500)
            .attrTween("d", function(d) {
                if (attr === 'sweetness') {
                    const interpolate = d3.interpolate(Math.log10(Math.max(previousValue, 1)), Math.log10(Math.max(value, 1)));
                    return function(t) {
                        const interpolatedValue = Math.pow(10, interpolate(t));
                        return arc({ value: interpolatedValue });
                    };
                } else {
                    const interpolate = d3.interpolate({ value: previousValue }, d);
                    return function(t) {
                        return arc(interpolate(t));
                    };
                }
            });

        // Vergleichswert (Sucrose)
        polarChartSvg.append("path")
            .attr("d", d3.arc()
                .innerRadius(scale(sucrose[attr]))
                .outerRadius(scale(sucrose[attr]))
                .startAngle(angle.start)
                .endAngle(angle.end))
            .attr("stroke", "#000")
            .attr("stroke-width", "2px")
            .attr("fill", "none")
            .attr("opacity", 0.6);

        // Hinzufügen der Labels
        const angleMiddle = ((angle.start + angle.end) / 2) - (Math.PI / 2);
        const labelX = (attr === 'gi' ? radius + 20 : radius + 70) * Math.cos(angleMiddle);
        const labelY = (attr === 'gi' ? radius + 20 : radius + 140) * Math.sin(angleMiddle);

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
            .attr("y", labelY + 20)
            .attr("text-anchor", attr === 'sweetness' ? 'end' : (attr === 'calories' ? 'start' : 'middle'))
            .attr("alignment-baseline", "bottom")
            .style("font-size", "18px")
            .style("font-weight", "bold");

        const sucroseValue = sucrose[attr];

        // Animate the label transition with special handling for sweetness
        valueLabel.transition()
            .duration(500)
            .tween("text", function() {
                const self = this;
                if (attr === 'sweetness') {
                    const interpolate = d3.interpolate(Math.log10(Math.max(previousValue, 1)), Math.log10(Math.max(value, 1)));
                    return function(t) {
                        const interpolatedValue = Math.pow(10, interpolate(t));
                        d3.select(self).html(`<tspan fill="#FFF">${interpolatedValue.toFixed(2)}</tspan><tspan fill="#000" font-weight="normal"> | ${sucroseValue}</tspan>`);
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
    const numCircles = 1;
    const circleRadius = radius / numCircles;

    for (let i = 1; i <= numCircles; i++) {
        polarChartSvg.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", i * circleRadius)
            .style("fill", "none")
            .style("stroke", "#ccc");
    }

    const numLines = 3;
    const angleStep = (2 * Math.PI) / numLines;

    for (let i = 0; i < numLines; i++) {
        const angle = (i * angleStep) - (Math.PI / 2);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        polarChartSvg.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", x)
            .attr("y2", y)
            .style("stroke", "#ccc");
    }
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

tableContainer.selectAll('.box')
    .on('click', (event, d) => {
        currentData = tableContainer.selectAll('.box').data();
        const index = currentData.findIndex(item => item.name === d.name);
        showLightbox(index);
    });

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