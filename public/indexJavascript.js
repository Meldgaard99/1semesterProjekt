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
    console.log(`Data from "getall": ${data}`);

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
                console.log(`${tmpName} clicked`)

                if (dataset.length == 0) {
                    d3.json(`/api/frugt/getco2indud`, {
                        method: "POST"
                    }).then(function (response) {
                        const data = response.data; // Hent data ud af response
                        console.log(data)
                        for (let q = 0; q < data.length; q++) {
                            if (data[q].grøntsag == tmpName) {
                                dataset.push([`${data[q].grøntsag}0`, parseFloat(data[q].ud), "#a6b38a"])
                                dataset.push([`${data[q].grøntsag}1`, parseFloat(data[q].ind), "#5a8f57"])
                                dataset.push([`${data[q].grøntsag}2`, parseFloat(0), "white"])
                            }
                        }
                        updateSelectionAdd();
                        console.log(`New dataset after insert ${dataset}`)
                    })
                } else {
                    let foodFound = false;
                    let index = -1;
                    for (let q = 1; q < dataset.length; q += 3) {
                        console.log(`Loop : ${dataset[q][0]}`)
                        if (dataset[q][0] == `${tmpName}0`) {
                            foodFound = true;
                            index = q;
                        }
                    }


                    if (foodFound == true) {
                        console.log("Remove current data")
                        console.log("")
                        dataset.splice(index, 3)
                        updateSelectionRemoval()
                        console.log(`New dataset after removal ${dataset}`)
                    } else {

                        console.log("Insert new data")
                        console.log("")
                        d3.json(`/api/frugt/getco2indud`, {
                            method: "POST"
                        }).then(function (response) {
                            const data = response.data; // Hent data ud af response
                            console.log(data)
                            for (let q = 0; q < data.length; q++) {
                                if (data[q].grøntsag == tmpName) {
                                    dataset.push([`${data[q].grøntsag}0`, parseFloat(data[q].ind), "#a6b38a"])
                                    dataset.push([`${data[q].grøntsag}1`, parseFloat(data[q].ud), "#5a8f57"])
                                    dataset.push([`${data[q].grøntsag}2`, parseFloat(0), "white"])
                                }
                            }
                            updateSelectionAdd();
                            console.log(`New dataset after insert ${dataset}`)
                        })
                    }
                }

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
    console.log(dataset)

})



















// Lav et SVG element
const svg = d3.select("#leftSide")
    .append("svg")
    /*.attr("style", "border:1px solid black")*/
    .attr("id", "svgBarchart")
    .attr("style", "border:1px solid black")

// Width og height på selve søjlerne 
const w = document.getElementById('svgBarchart').clientWidth;
const h = document.getElementById('svgBarchart').clientHeight;
const maxValue = 3;

// Scale-funktioner
const xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

const yScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, h]);





// Vælg elementet med id "klik_tilføj" og tilføj en handling		
function updateSelectionAdd() {

    // Opdater scale-funktioner
    xScale.domain(d3.range(dataset.length));

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
            return d[2];
        })
        // Her flettes det nye punkt sammen med de gamle punkter
        .merge(updateSelection)
        // Og animationen herunder vedrører alle punkter
        .transition()
        .duration(1500)
        .attr("name", function(d){
            return d[0]
        })
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

}

function updateSelectionRemoval() {
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







function loadScript(url) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}
loadScript('/index2Javascript.js');

