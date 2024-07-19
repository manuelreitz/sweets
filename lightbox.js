const lightbox = d3.select('#lightbox');
const lightboxContent = d3.select('#lightbox-content');
const lightboxDetails = d3.select('#lightbox-details');
const radarChart = d3.select('#radarChart');
const closeButton = lightbox.select('.close');
const leftNav = lightbox.select('.left');
const rightNav = lightbox.select('.right');

let currentIndex = 0;
let currentData = [];
const maxCalories = 400;
const maxSweetness = 20000;
const maxGI = 105;

// function createPolarChart(data, highlightedIndex) {
//     radarChart.selectAll("*").remove();

//     const width = 300;
//     const height = 300;
//     const radius = Math.min(width, height) / 2 * 0.8;
//     const color = categoryColors[data[highlightedIndex].category];

//     const polarChartSvg = radarChart.append("svg")
//         .attr("width", width + 50)
//         .attr("height", height + 50)
//         .style("display", "block")
//         .style("margin", "0 auto")
//         .append("g")
//         .attr("transform", `translate(${(width + 50) / 2}, ${(height + 50) / 2})`);

//     const scales = {
//         calories: d3.scaleLinear().domain([0, maxCalories]).range([0, radius]),
//         sweetness: d3.scaleLog().domain([1, maxSweetness]).range([0, radius]),
//         gi: d3.scaleLinear().domain([0, maxGI]).range([0, radius]),
//     };

//     const angles = {
//         sweetness: { start: 0, end: 2 * Math.PI / 3 }, // 0 bis 120 Grad
//         gi: { start: 2 * Math.PI / 3, end: 4 * Math.PI / 3 }, // 120 bis 240 Grad
//         calories: { start: 4 * Math.PI / 3, end: 2 * Math.PI }, // 240 bis 360 Grad (0 Grad)
//     };

//     const attributes = ['sweetness', 'gi', 'calories'];

//     const sucrose = {
//         calories: 387,
//         sweetness: 1,
//         gi: 65,
//     };



//     attributes.forEach(attr => {
//         const scale = scales[attr];
//         const angle = angles[attr];
//         const value = data[highlightedIndex][attr];
//         const sucroseValue = sucrose[attr];

//         // Ausgewähltes Element
//         polarChartSvg.append("path")
//             .attr("d", d3.arc()
//                 .innerRadius(0)
//                 .outerRadius(scale(value))
//                 .startAngle(angle.start)
//                 .endAngle(angle.end))
//             .attr("fill", color)
//             .attr("opacity", 0.8);

//         // Vergleichswert (Sucrose)
//         polarChartSvg.append("path")
//             .attr("d", d3.arc()
//                 .innerRadius(0)
//                 .outerRadius(scale(sucroseValue))
//                 .startAngle(angle.start)
//                 .endAngle(angle.end))
//             .attr("stroke", "#000")
//             .attr("stroke-width", "2px")
//             .attr("fill", "none")
//             .attr("opacity", 0.6);

//         // Hinzufügen der Labels
//         const angleMiddle = ((angle.start + angle.end) / 2) - (Math.PI / 2);
//         polarChartSvg.append("text")
//             .attr("x", (attr === 'gi' ? radius + 20 : radius + 80) * Math.cos(angleMiddle))
//             .attr("y", (attr === 'gi' ? radius + 20 : radius + 80) * Math.sin(angleMiddle))
//             .attr("text-anchor", attr === 'sweetness' ? 'end' : (attr === 'calories' ? 'start' : 'middle'))
//             .attr("alignment-baseline", "top")
//             .attr("fill", "#000")
//             .style("font-size", "14px")
//             .text(attr.toUpperCase());

//         polarChartSvg.append("text")
//             .attr("x", (attr === 'gi' ? radius + 20 : radius + 80) * Math.cos(angleMiddle))
//             .attr("y", (attr === 'gi' ? radius + 20 : radius + 80) * Math.sin(angleMiddle) + 20)
//             .attr("text-anchor", attr === 'sweetness' ? 'end' : (attr === 'calories' ? 'start' : 'middle'))
//             .attr("alignment-baseline", "bottom")
//             .attr("fill", color)
//             .style("font-size", "18px")
//             .style("font-weight", "bold")
//             .text(`${value} | ${sucroseValue}`);
//     });
// }

let previousIndex = -1;

function showLightbox(index) {
    const previousData = previousIndex >= 0 ? currentData[previousIndex] : null;
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
    Aftertaste: ${d.aftertaste}<br><br>
    <i>${d.notes}</i>
`);

    const radarData = currentData.map(item => ({
        category: item.category,
        calories: item.calories,
        sweetness: item.sweetnes,
        gi: item.gi
    }));

    createPolarChart(radarData, index, previousData);

    lightbox.style('display', 'block');

    lightboxContent.style('border', '20px solid ' + categoryColors[d.category]);

    previousIndex = index; // Update the previousIndex to current index
}



function createPolarChart(data, highlightedIndex, previousData) {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2 * 0.8;
    const color = categoryColors[data[highlightedIndex].category];

    const scales = {
        calories: d3.scaleLinear().domain([0, maxCalories]).range([0, radius]),
        sweetness: d3.scaleLog().domain([1, maxSweetness]).range([0, radius]),
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

    const polarChartSvg = radarChart.append("svg")
        .attr("width", width + 50)
        .attr("height", height + 50)
        .style("display", "block")
        .style("margin", "0 auto")
        .append("g")
        .attr("transform", `translate(${(width + 50) / 2}, ${(height + 50) / 2})`);

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
            .attr("fill", color)
            .attr("opacity", 0.8)
            .attr("d", arc);

        // Animate the transition from previousValue to new value
        path.transition()
            .duration(300)
            .attrTween("d", function(d) {
                const interpolate = d3.interpolate({ value: previousValue }, d);
                return function(t) {
                    return arc(interpolate(t));
                };
            });

        // Vergleichswert (Sucrose)
        polarChartSvg.append("path")
            .attr("d", d3.arc()
                .innerRadius(0)
                .outerRadius(scale(sucrose[attr]))
                .startAngle(angle.start)
                .endAngle(angle.end))
            .attr("stroke", "#000")
            .attr("stroke-width", "2px")
            .attr("fill", "none")
            .attr("opacity", 0.6);

        // Hinzufügen der Labels
        const angleMiddle = ((angle.start + angle.end) / 2) - (Math.PI / 2);
        const labelX = (attr === 'gi' ? radius + 20 : radius + 80) * Math.cos(angleMiddle);
        const labelY = (attr === 'gi' ? radius + 20 : radius + 80) * Math.sin(angleMiddle);

        polarChartSvg.append("text")
            .attr("x", labelX)
            .attr("y", labelY)
            .attr("text-anchor", attr === 'sweetness' ? 'end' : (attr === 'calories' ? 'start' : 'middle'))
            .attr("alignment-baseline", "top")
            .attr("fill", "#000")
            .style("font-size", "14px")
            .text(attr.toUpperCase());

        const valueLabel = polarChartSvg.append("text")
            .attr("x", labelX)
            .attr("y", labelY + 20)
            .attr("text-anchor", attr === 'sweetness' ? 'end' : (attr === 'calories' ? 'start' : 'middle'))
            .attr("alignment-baseline", "bottom")
            .attr("fill", color)
            .style("font-size", "18px")
            .style("font-weight", "bold");

        // Animate the label transition with special handling for sweetness
        valueLabel.transition()
            .duration(300)
            .tween("text", function() {
                if (attr === 'sweetness') {
                    const interpolate = d3.interpolate(Math.log10(previousValue), Math.log10(value));
                    return function(t) {
                        const interpolatedValue = Math.pow(10, interpolate(t));
                        d3.select(this).text(interpolatedValue.toFixed(2));
                    };
                } else {
                    const interpolate = d3.interpolate(previousValue, value);
                    return function(t) {
                        const interpolatedValue = interpolate(t);
                        d3.select(this).text(Math.round(interpolatedValue));
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

container.selectAll('.box')
    .on('click', (event, d) => {
        currentData = container.selectAll('.box').data();
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