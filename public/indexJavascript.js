// Selve datasættet, der sørger for at der bliver vist to søjler ved sidens indlæsning 
let dataset = [["Default", parseFloat(0), "white"], ["Tomater0", 0.32, "#a6b38a"], ["Tomater1", 0.8, "#5a8f57"], ["Tomater2", 0, "white"]];


//Denne funktion henter html data fra index2 og præsentere indholdet i getElementById('index2Content')
function loadHTML() {// 
    fetch('index2.html')
        .then(response => response.text())
        .then(text => document.getElementById('index2Content').innerHTML = text);
}
loadHTML();

let allFruits = [{}];
//Når siden indlæses, køres dette api kald med det samme, uden noget form for user input
d3.json("/api/frugt/getall", {
    method: "POST"
}).then(function (response) {
    allFruits = response.data; // Hent data ud af response

    for (let index1 = 0; index1 < allFruits.length; index1++) { //laver et loop der kør et array af dataen igennem vi har fået fra /api/frugt/getall i main.js
        const style1 = `border:1px #e8e6e0;`;
        const tmpName = allFruits[index1].grøntsag; //udelukkende lavet for at ikke skulle skirve "allFruits[index1].grøntsag" men blot "tmpName" hver gang navnet skulle bruges

        //Generer hver knap og tilføjer den til #rightSide
        const button = d3.select("#rightSide")
            .append("button")
            .attr("style", style1)
            .attr("id", tmpName) //giver knappen et id med dens eget navn, for at vi kan specifikt udvælge knapperne enkeltvis senere 
            .attr("class", "fruit-card-btn_Barchart") //gives alle den samme 'class' for at vi kan style dem ens i css
            .on("click", function () {

                //Tilføjelse af funktionalitet ved klik på knappen
                let foodFound = false;
                let index = -1;
                //Løber datasættet igennem for at se om maden allerede er tilføjet til datasættet og visualiseret
                for (let q = 1; q < dataset.length; q += 3) {
                    if (dataset[q][0] == `${tmpName}0`) {
                        foodFound = true; //Hvis maden bliver fundet sættes variablen til sand
                        index = q; //og 'index' variablen bliver sat til den omgang som loopet var nået til
                    }
                }

                if (foodFound == true) { //maden er fundet og 
                    
                    //Fjerner den madvare der ikke længere skal visualiseres samt tekst
                    dataset.splice(index, 3) 
                    for (fruitIndex in fruitNamesLabel) {
                        if (fruitNamesLabel[fruitIndex][0] == `${tmpName}0`) {
                            fruitNamesLabel.splice(fruitIndex, 1) //Fjerner tekst
                        }
                    }
                    updateSelectionRemoval()
                    document.getElementById(`${tmpName}`).style.backgroundColor = "#e8e6e0" //Sætter farven på knappen tilbage til standard

                }
                else { //Hvis madvareren ikke bliver fundet ...
                    d3.json(`/api/frugt/getco2indud`, {
                        method: "POST"
                    }).then(function (response) {
                        const data = response.data; // Hent data ud af response
                        for (let q = 0; q < data.length; q++) { //Løber arrayet igennem indtil det matcher med knappens navn 
                            if (data[q].grøntsag == tmpName) {
                                dataset.push([`${data[q].grøntsag}0`, parseFloat(data[q].ud), "#a6b38a"])//pusher navn(id), udlandske data og putter en farve på
                                dataset.push([`${data[q].grøntsag}1`, parseFloat(data[q].ind), "#5a8f57"])//pusher navn(id), indlandske data og putter en farve på
                                dataset.push([`${data[q].grøntsag}2`, parseFloat(0), "white"])//laver usynlig søjle til at skabe rum
                            }

                        }
                        updateSelectionAdd();
                        document.getElementById(`${tmpName}`).style.backgroundColor = "rgb(111, 152, 98)" //Sætter knappen til grøn ish
                    })
                }

            })


        //laver billede til knapper
        const image1 = document.createElement("img");
        image1.src = `grøntsager-realistisk/${tmpName}.png`;
        image1.width = 0
        image1.height = 0
        image1.className = "fruitImagesButtons"
        document.getElementById(`${tmpName}`).appendChild(image1);
          //laver labels til knapper 
        const labelTag = document.createElement("p");
        labelTag.textContent = `${tmpName}`
        labelTag.className = "textTilKnapper"
        document.getElementById(`${tmpName}`).appendChild(labelTag);

    }
    document.getElementById(`Tomater`).style.backgroundColor = "rgb(111, 152, 98)"
})



// Lav et SVG element
const svg = d3.select("#leftSide")
    .append("svg")
    .attr("id", "svgBarchart")
 

// Width og height på selve søjlerne 
const svgWidth = document.getElementById('svgBarchart').clientWidth;
const svgHeight = document.getElementById('svgBarchart').clientHeight - 40;
let maxValue = 2.2;


// Scale-funktioner
const xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([35, svgWidth])
    .paddingInner(0.05);

const yScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, svgHeight]);


let fruitNamesLabel = [];
function updateSelectionAdd() {
    let xPositionBarchart = 0;
    fruitNamesLabel = [];
    for (let index = 0; index < dataset.length; index++) {
        if (dataset[index][0].slice(-1) == "0") {
            fruitNamesLabel.push(dataset[index])
        }
    }
    // Opdater scale-funktioner
    xScale.domain(d3.range(dataset.length));

    function updateRect() {

        // select 'rects' og tilføj ny data
        const updateSelection = svg.selectAll("rect")
            .data(dataset, function (d) {
                return d[0];
            });
        // 'enter' bruges til at animere det nye data
        updateSelection.enter()
            // Alt efter 'enter()' vedrører kun det nye datapunkt
            .append("rect")

            .on("mouseover", function (event, d) {
                // Læs søjlens x og y position ud fra '
                // Husk parseFloat for at lave text til number.
                const xPosition = parseFloat(d3.select(this).attr("x"));
                const yPosition = parseFloat(d3.select(this).attr("y")) - 50;


                console.log(`d : ${d}`)

                // laver kassen ved hover på barchart
                d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#value")
                    .text(d[1])//viser det første i indekset i fra vores datasæt


                d3.select("#foodName")//vælger det id fra indeks
                    .text(d[0].slice(0,-1));//viser plads 0 fra indeks - med fjernelse af noget af ordet
                // Vis tooltip på ny position
                d3.select("#tooltip").classed("hidden", false);
            })
            .on("mouseout", function () {
                // Gem tooltip til næste gang
                d3.select("#tooltip").classed("hidden", true);
            })
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
            .attr("id", function (d) {
                return d[0]
            })
            .attr("class", "barchartLines")

            .attr("x", function (d, i) {
                return xScale(i);
            })
            .attr("y", function (d) {
                return svgHeight - yScale(d[1]);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return yScale(d[1]);
            })

    }
    updateRect()




    function updateText() {
        // select 'texts' og tilføj ny data
        const updateSelectionText = svg.selectAll(".svgBarcahrtLabels")
            .data(fruitNamesLabel, function (d) {
                return d[0];
            });

        updateSelectionText.enter()
            // Alt efter 'enter()' vedrører kun det nye datapunkt
            .append("text")
            .attr("class", "svgBarcahrtLabels")
            .attr("x", svgWidth)
            .attr("y", svgHeight)
            .attr("fill", "black")
            .text(function (d) { return d[0].slice(0, -1); })
            // Her flettes det nye punkt sammen med de gamle punkter
            .merge(updateSelectionText)
            // Og animationen herunder vedrører alle punkter
            .transition()
            .duration(750)
            .attr("id", function (d) {
                return d[0];
            })

            .attr("x", function (d, i) {
                return svgWidth / (fruitNamesLabel.length + 1) * (i + 1) + 35
            })


            .attr("y", "640")
            .attr("text-anchor", "end")
            .attr("class", "svgBarcahrtLabels")
            .attr("font-size", function () {
                return 24 - fruitNamesLabel.length
            });
    }
    updateText()











}

updateSelectionAdd()

function updateSelectionRemoval() {

    // Opdater scale-funktioner
    xScale.domain(d3.range(dataset.length));

    // select alle 'labels' og tilføj ny data
    const updateSelectionText = svg.selectAll(".svgBarcahrtLabels")
        .data(fruitNamesLabel, function (d) {
            return d[0];
        });

    // Alle søjler animeres fint.
    // De har alle fået nye værdier fordi der er fjernet et punkt
    updateSelectionText.transition()
        .duration(1500)
        .attr("x", function (d, i) {
            return svgWidth / (fruitNamesLabel.length + 1) * (i + 1) + 35
        })
        .attr("y", "640")
        .attr("font-size", function () {
            return 24 - fruitNamesLabel.length
        });

    // 'exit' bruges til at animere den søjle der er fjernet, og kun den
    updateSelectionText.exit()
        .transition()
        .delay(200)
        .duration(1000)
        .attr("fill", "#00000000") // Animere til usynlighed
        .attr("x", svgWidth + 200) // Flytter søjlen ud til højre
        .remove(); // 'rect' slettes




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
/*laver en funktion til at lave y-aksen */
function createYaxis() {

    const svgElement1 = d3.select("#svgBarchart")


    const yScale = d3.scaleLinear()
        .domain([0, maxValue]) /* hvor meget maks værdien kan være på y-aksen */
        .range([svgHeight, 0]);


    var y_axis = d3.axisLeft()
        .scale(yScale)
        .ticks(10); /* ticks vælger hvor mange punkter og tal der er på venstre side */

    svgElement1.append("g")
        .attr("transform", "translate(50, 10)")
        .call(y_axis);

        /*tilføjer teksten til y-aksen*/
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("dy", ".80em")
        .attr("transform", "rotate(-90)")
        .text("Co2e/kg");


}
createYaxis();



d3.select('#remove-btn')
    .on("click", function () {
        for (let i = 1; i < dataset.length; i += 3) {
            document.getElementById(`${dataset[i][0].slice(0, -1)}`).style.backgroundColor = "#e8e6e0"
        }
        dataset = [["Default", parseFloat(0), "white"]];
        fruitNamesLabel = [];
        updateSelectionRemoval()
    });



//Indlæser scriptet der skal køres på index2.html
function loadScript(url) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}
loadScript('/index2Javascript.js');