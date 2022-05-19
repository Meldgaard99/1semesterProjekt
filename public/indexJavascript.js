
function loadHTML() {
    fetch('index2.html')
        .then(response => response.text())
        .then(text => document.getElementById('index2Content').innerHTML = text);
}
loadHTML();

let allFruits = [{}];

d3.json("/api/frugt/getall", {
    method: "POST"
}).then(function (response) {
    const data = response.data; // Hent data ud af response
    allFruits = data
    console.log(`Data from "getall": ${data}`);

    for (let index1 = 0; index1 < allFruits.length; index1++) {
        const style1 = `border:1px solid black`;
        const tmpName = allFruits[index1].grøntsag;
        const button = d3.select("#rightSide")
            .append("button")
            .attr("style", style1)
            .attr("id", tmpName)
            .attr("class", "fruit-card-btn")
            .attr("background", `url([grøntsager-realistisk/${tmpName}.jpg])`)
            .on("click", function () {
                console.log(`${tmpName} clicked`)

                d3.json(`/api/frugt/getco2indud`, {
                    method: "POST"
                }).then(function (response) {
                    const data = response.data; // Hent data ud af response
                    console.log(data)
                    for (let q = 0; q < data.length; q++) {

                        if (data[q].grøntsag == tmpName) {
                            dataset.push([data[q].grøntsag, parseFloat(data[q].ind)])
                            dataset.push([data[q].grøntsag, parseFloat(data[q].ud)])
                        }
                    }
                    updateSelectionAdd()
                })


            });

        const image1 = document.createElement("img");
        image1.src = `grøntsager-realistisk/${tmpName}.png`;
        image1.width = 50
        image1.height = 50
        document.getElementById(`${tmpName}`).appendChild(image1);

        //document.getElementById(`${tmpName}`).innerText = `${tmpName}`

    }


})

// Width og height på selve søjlerne 
const w = 250;
const h = 500;
const barPadding = 1; // Bruges til at lave afstand imellem søjler
const maxValue = 1;
const bottomPadding = 20; // Plads til akse i bunden
const sidePadding = 10; // Lidt luft i siderne også
const padding = 69;

// Selve datasættet
let dataset = [];
let fruitID = 0;



// Scale-funktioner

// Lav et SVG element
const svg = d3.select("#leftSide")
    .append("svg")
    /*.attr("style", "border:1px solid black")*/
    .attr("id", "svgBarchart")


// En scaleBand benytter sig af ordenstal i stedet for et interval af tal
const xScale = d3.scaleBand()
    // Domænet er alle værdier på plads nr. 2 i hvert indre array
    // Husk, domænet består kun af 20 tal - hverken mere eller mindre
    // Så domænet er præcist 20 tal, i en bestemt rækkefølge.
    .domain(dataset.map(function (d) { return d[1] }))
    // Output-området er fra 0 til 'w'
    .range([0, w])
    // Vi sætter padding imellem søjlerne også
    .paddingInner(0.10);

// Traditionel skaleringsfunktion for 'y'.
const yScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, h])

const xAxis = d3.axisBottom().scale(xScale);


// På SVG laver vi en <g>
// <g> er en container der indeholder andre SVG-elementer.
svg.append("g")
    // "transform" er en flytning af hele <g>
    // Eller på dansk: "parallelforskydning".
    // Den flyttes ned i bunden af diagrammet
    .attr("transform", "translate(0," + (525 - bottomPadding) + ")")
    // "call" bruger akse-funktionen til at lave selve aksen.
    .call(d3.axisBottom(xScale));

svg
    .select("g#y-axis")
    .selectAll("g.tick")
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", w)
    .attr("y2", 0)
    .style("opacity", 0.3);
/*
// Definerer X-aksen ticks er hvor meget der skal vises på stregen, lige nu kommer der til at stå 16 ting 
let xAxis = d3.axisBottom()
.scale(xScale)
.tickFormat(d => d)
.ticks(16)
.tickPadding(7);

// Appender x-aksen til SVG'en
svg.append("g")
.attr("class", "x-axis")
.attr("transform", "translate(0, " + (h + 130) + ")")
.call(xAxis)

// Appender label til x-aksen
svg.append("text")
.attr("text-anchor", "end")
.attr("class", "Grøntsagstabel")
.attr("x", w - padding)
.attr("y", h - 200)
.text("Grøntsager/frugter")

// Definerer y-aksen
let yAxis = d3.axisLeft()
.scale(yScale)
.ticks(3)
.tickPadding(10);

// Appender y-aksen til SVG'en
svg.append("g")
.attr("class", "y-axis")
.attr("transform", "translate(" + (padding) + ",0)")




// Sætter eller prøver y-akse label på grafen
svg.append("text")
.attr("class", "Grøntsagstabel")
.attr("text-anchor", "end")
.attr("x", padding + 20)
.attr("y", padding)
.text("Grøtn")


*/
/*

  //opretter label der skal vises når der hoveres, 'text' sættes til i[1], fixes til 2 så 
  svg.append("text")
                  .attr("id", "tooltip")
                  .attr("x", xScale)
                  .attr("y", yPosition - 21)
                  .attr("text-anchor", "middle")
                  .attr("font-family", "sans-serif")
                  .attr("font-size", "15px")
                  .attr("font-weight", "bold")
                  .attr("fill", "rgba(255, 255, 255, 0.74)")
                  .text(parseFloat(i[1]).toFixed(2));


*/


// Vælg elementet med id "klik_tilføj" og tilføj en handling		
function updateSelectionAdd() {
    // Kode herunder kører kun når der trykkes på knappen
    console.log(`Data der skal visualiseres: ${dataset}`)

    // Opdater scale-funktioner
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, maxValue]);	// Strengt taget ikke nødvendig her

    // select 'rects' og tilføj ny data
    const updateSelection = svg.selectAll("rect")
        .data(dataset, function (d) {
            return d[0];
        });

    // 'enter' bruges til at animere det nye data
    updateSelection.enter()
        // Alt efter 'enter()' vedrører kun det nye datapunkt
        .append("rect")
        .attr("x", w)
        .attr("y", function (d) {
            return h - yScale(d[1]);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d[1]);
        })
        .attr("fill", function (d) {
            return "red";
        })
        // Her flettes det nye punkt sammen med de gamle punkter
        .merge(updateSelection)
        // Og animationen herunder vedrører alle punkter
        .transition()
        .duration(1500)
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h - yScale(d[1]);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d[1]);
        });
};

function updateSelectionRemoval() {

    // Kode herunder kører kun når der trykkes på knappen

    // Opdater scale-funktioner
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, maxValue]);	// Strengt taget ikke nødvendig igen

    // select alle 'rects' og tilføj ny data
    const updateSelection = svg.selectAll("rect")
        .data(dataset, function (d) {
            return d[0];
        });

    // Alle søjler animeres fint.
    // De har alle fået nye værdier fordi der er fjernet et punkt
    updateSelection.transition()
        .duration(1500)
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h - yScale(d[1]);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d[1]);
        });

    // 'exit' bruges til at animere den søjle der er fjernet, og kun den
    updateSelection.exit()
        .transition()
        .delay(200)
        .duration(2000)
        .attr("fill", "#00000000") // Animere til usynlighed
        .attr("x", w + 200) // Flytter søjlen ud til højre
        .remove(); // 'rect' slettes
}

/*
    let kartoffelId = -1;
    d3.select("#kartoffel")
        // Koden herunder køres kun ved tryk på knappen
        .on("click", function () {

            if (kålBool == true) {
                d3.json("/api/frugt/kartoffel", {
                    method: "POST"
                }).then(function (response) {
                    const data = response.data; // Hent data ud af response
                    kartoffelId = fruitID;
                    fruitID += 1;
                    dataset.push([kartoffelId, parseFloat(data[0].totalkgco2)]);
                    updateSelectionAdd()
                    kålBool = false;
                })
            } else {
                let index = findIndexInArray(dataset, kartoffelId)
                dataset.splice(index, 1);
                kartoffelBool = true;
                updateSelectionRemoval()
            }
        });


*/

// Vælg elementet med id "remove-btn" 		
d3.select("#remove-btn")
    .on("click", function () {
        // Kode herunder kører kun når der trykkes på knappen
        // Fjern sidste element   
        dataset.pop();
        updateSelectionRemoval();
    });






function loadScript(url) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}
loadScript('/index2Javascript.js');
