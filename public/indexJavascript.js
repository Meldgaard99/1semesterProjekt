// Selve datasættet
let dataset = [["Default", parseFloat(0), "white"]];

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

    for (let index1 = 0; index1 < allFruits.length; index1++) {
        const style1 = `border:1px #e8e6e0;`;
        const tmpName = allFruits[index1].grøntsag;
        const button = d3.select("#rightSide")
            .append("button")
            .attr("style", style1)
            .attr("id", tmpName)
            .attr("class", "fruit-card-btn")
            .attr("background", `url([grøntsager-realistisk/${tmpName}.jpg])`)
            .on("click", function () {

                let foodFound = false;
                let index = -1;
                for (let q = 1; q < dataset.length; q += 3) {
                    if (dataset[q][0] == `${tmpName}0`) {
                        foodFound = true;
                        index = q;
                    }
                }

                if (foodFound == true) {
                    dataset.splice(index, 3)
                    updateSelectionRemoval()
                    document.getElementById(`${tmpName}`).style.backgroundColor = "#e8e6e0"

                }
                else {
                    d3.json(`/api/frugt/getco2indud`, {
                        method: "POST"
                    }).then(function (response) {
                        const data = response.data; // Hent data ud af response
                        for (let q = 0; q < data.length; q++) {
                            if (data[q].grøntsag == tmpName) {
                                dataset.push([`${data[q].grøntsag}0`, parseFloat(data[q].ud), "#a6b38a"])
                                dataset.push([`${data[q].grøntsag}1`, parseFloat(data[q].ind), "#5a8f57"])
                                dataset.push([`${data[q].grøntsag}2`, parseFloat(0), "white"])

                            }


                        }
                        updateSelectionAdd();
                        console.log(dataset)
                        document.getElementById(`${tmpName}`).style.backgroundColor = "rgb(111, 152, 98)"
                    })
                }

            })

        d3.json(`/api/frugt/getco2indud`, {
            method: "POST"
        }).then(function (response) {
            const data = response.data; // Hent data ud af response
            tester = data

        })
        const image1 = document.createElement("img");
        image1.src = `grøntsager-realistisk/${tmpName}.png`;
        image1.width = 50
        image1.height = 50
        document.getElementById(`${tmpName}`).appendChild(image1);

        const labelTag = document.createElement("a");
        labelTag.innerText = `${tmpName}`
        labelTag.className = "textTilKnapper"
        document.getElementById(`${tmpName}`).appendChild(labelTag);

    }

})



// Lav et SVG element
const svg = d3.select("#leftSide")
    .append("svg")
    .attr("id", "svgBarchart")
    .attr("style", "border:1px solid black")

// Width og height på selve søjlerne 
const svgWidth = document.getElementById('svgBarchart').clientWidth;
const svgHeight = document.getElementById('svgBarchart').clientHeight - 40;
let maxValue = 2.2;
//maxValue = d3.maxValue()



// Scale-funktioner
const xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([35, svgWidth])
    .paddingInner(0.05);

const yScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, svgHeight]);

// gridlines in x axis function
function make_x_gridlines() {		
    return d3.axisBottom(x)
        .ticks(5)
}

// gridlines in y axis function
function make_y_gridlines() {		
    return d3.axisLeft(y)
        .ticks(5)
}

// Vælg elementet med id "klik_tilføj" og tilføj en handling		
function updateSelectionAdd() {
    let fruitNamesLabel = [];
    for (let index = 0; index < dataset.length; index++) {
        if (dataset[index][0].slice(-1) == "0") {
            fruitNamesLabel.push(dataset[index])
        }
    }
    // Opdater scale-funktioner
    xScale.domain(d3.range(dataset.length));

    // select 'texts' og tilføj ny data
    const updateSelectionText = svg.selectAll("text")
        .data(fruitNamesLabel, function (d) {
            return d[0];
        });

    updateSelectionText.enter()
        // Alt efter 'enter()' vedrører kun det nye datapunkt
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 100)
        .attr("height", 50)
        .attr("fill", "black")
        .text(function (d) { return d[0].slice(0, -1); })
        // Her flettes det nye punkt sammen med de gamle punkter
        .merge(updateSelectionText)
        // Og animationen herunder vedrører alle punkter
        .transition()
        .duration(750)
        .attr("id", function (d) {
            return d[0]
        })
        .attr("x", function (d, i) {
            let elementsInFruits = fruitNamesLabel.length
            console.log(`Elementer i fruitNamesLabel: ${elementsInFruits}`)
            console.log(`svgWidth: ${svgWidth}`) 
            const xPlacementOnAxis = svgWidth / (elementsInFruits + 1);
            console.log(`xPlacementOnAxis : ${xPlacementOnAxis}`);
            console.log(`final placement : ${xPlacementOnAxis * (i+1)}`);
            return xPlacementOnAxis * (i+1);
        })
        .attr("y", "640")
        .attr("text-anchor","end")
        .attr("height", 50)
        .attr("font-size", "8");

    // select 'rects' og tilføj ny data
    const updateSelection = svg.selectAll("rect")
        .data(dataset, function (d) {
            return d[0];
        });
    // 'enter' bruges til at animere det nye data


    
    updateSelection.enter()
        // Alt efter 'enter()' vedrører kun det nye datapunkt
        .append("rect")
        .attr("x", svgWidth)
        .attr("y", function (d) {
            return svgHeight - yScale(d[1]);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d[1]);
        })
        .attr("fill", function (d) {
            return d[2];
        })
        // Her flettes det nye punkt sammen med de gamle punkter
        .merge(updateSelection)
        // Og animationen herunder vedrører alle punkter
        .transition()
        .duration(750)
        .attr("class", "barchartText")
        .attr("id", function (d) {
            return d[0]
        })
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return svgHeight - yScale(d[1]);
        })

        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d[1]);
        });
}

function updateSelectionRemoval() {

    yScale.domain([0, maxValue]);	// Strengt taget ikke nødvendig igen

    // select alle 'rects' og tilføj ny data
    const updateSelection = svg.selectAll("rect")
        .data(dataset, function (d) {
            return d[0];
        });

    // select alle 'rects' og tilføj ny data
    const updateSelectionText = svg.selectAll("text")
        .data(dataset, function (d) {
            return d[0];
        });

    // Alle søjler animeres fint.
    // De har alle fået nye værdier fordi der er fjernet et punkt
    updateSelectionText.transition()
        .duration(1500)
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return svgHeight - yScale(d[1]);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d[1]);
        });

    // 'exit' bruges til at animere den søjle der er fjernet, og kun den
    updateSelectionText.exit()
        .transition()
        .delay(200)
        .duration(2000)
        .attr("fill", "#00000000") // Animere til usynlighed
        .attr("x", svgWidth + 200) // Flytter søjlen ud til højre
        .remove(); // 'rect' slettes





    // Alle søjler animeres fint.
    // De har alle fået nye værdier fordi der er fjernet et punkt
    updateSelection.transition()
        .duration(1500)
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return svgHeight - yScale(d[1]);
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
        .attr("x", svgWidth + 200) // Flytter søjlen ud til højre
        .remove(); // 'rect' slettes



}

function createYaxis() {


    var width = 400, height = 1190;

    var data1 = [0.1, 2.21];

    var svg1 = d3.select("#leftside")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const yScale = d3.scaleLinear()
        .domain([0, maxValue])
        .range([svgHeight,0]);


    var y_axis = d3.axisLeft()
        .scale(yScale)
        .ticks(10);

    svg.append("g")
        .attr("transform", "translate(50, 10)")
        .call(y_axis)


}
createYaxis();




function loadScript(url) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}
loadScript('/index2Javascript.js');

