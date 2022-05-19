

d3.select("#Januar")
    .on("click", function () {
        console.log("Januar button clicked")
        d3.json(`api/frugt/seasonalVegatabels1`, {
            method: "GET"
        }).then(function (response) {

            const data = response.data; // Hent data ud af response
            seasonal = data
            console.log(`Data from "seasonalVegatabels1": ${response.data[0].Groentsag}`);

            for (let index1 = 0; index1 < seasonal.length; index1++) {
                const style1 = `border:1px solid black`;
                const tmpName = seasonal[index1].Groentsag;
                const button = d3.select(".kalender")
                    .append("button")
                    .attr("style", style1)
                    .attr("id", `${tmpName}1`)
                    .attr("class", "fruit-card-btn")
                    .attr("background-image", `url("/grøntsager-realistisk/${tmpName}.png")`)
                    .on("click", function () {
                        console.log(`${tmpName} clicked`)
                    });

                // Koden der indsætter billede til den tilsvarende grøntsag - når der køres loop.
                const image1 = document.createElement("img");
                image1.src = `grøntsager-realistisk/${tmpName}.png`;
                image1.width = 50
                image1.height = 50
                document.getElementById(`${tmpName}1`).appendChild(image1);
            }




        })


    });


let seasonal = [{}];

// Her køres koden for knappen januar - Viser alle grøntsager i sæson
// Laver en function for januar - onlick
/*
console.log("januar klik")
d3.json("/api/frugt/seasonalVegatabels1", {
method: "GET"
}).then(function (response) {
const data = response.data; // Hent data ud af response
seasonal = data
console.log(`Data from "seasonalVegatabels1": ${response.data[0].Groentsag}`);

for (let index1 = 0; index1 < seasonal.length; index1++) {
    const style1 = `border:1px solid black`;
    const tmpName = seasonal[index1].Groentsag;
    console.log(tmpName)
    const button = d3.select(".kalender")
        .append("button")
        .attr("style", style1)
        .attr("id", tmpName)
        .attr("class", "fruit-card-btn")
        .attr("background-image", `url("/grøntsager-realistisk/${tmpName}.png")`)
        .on("click", function () {
            console.log(`${tmpName} clicked`)
        });

}
})
*/

