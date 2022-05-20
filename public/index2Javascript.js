

d3.select("#Januar")
.on("click", function () {
    seasonal = [{}];
    console.log("Januar button clicked");
    d3.selectAll(".calenderButtons").remove();
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
                .attr("id", `${tmpName}Januar`)
                .attr("class", "fruit-card-btn calenderButtons")
                .attr("background-image", `url("/grøntsager-realistisk/${tmpName}.png")`)
                .on("click", function () {
                    console.log(`${tmpName} clicked`)
                });

            // Koden der indsætter billede til den tilsvarende grøntsag - når der køres loop.
            const image1 = document.createElement("img");
            image1.src = `grøntsager-realistisk/${tmpName}.png`;
            image1.width = 25
            image1.height = 25
            document.getElementById(`${tmpName}Januar`).appendChild(image1);
        }




    })


});



let seasonal = [{}];


//---------Februar api kald------------------------

d3.select("#Februar")
.on("click", function () {
    seasonal = [{}];
    console.log("Februar button clicked");
    d3.selectAll(".calenderButtons").remove();
    d3.json(`api/frugt/seasonalVegatabels2`, {
        method: "GET"
    }).then(function (response) {

        const data = response.data; // Hent data ud af response
        seasonal = data
        console.log(`Data from "seasonalVegatabels2": ${response.data[0].Groentsag}`);

        for (let index1 = 0; index1 < seasonal.length; index1++) {
            const style1 = `border:1px solid black`;
            const tmpName = seasonal[index1].Groentsag;
            const button = d3.select(".kalender")
                .append("button")
                .attr("style", style1)
                .attr("id", `${tmpName}Februar`)
                .attr("class", "fruit-card-btn calenderButtons")
                .attr("background-image", `url("/grøntsager-realistisk/${tmpName}.png")`)
                .on("click", function () {
                    console.log(`${tmpName} clicked`)
                });

            // Koden der indsætter billede til den tilsvarende grøntsag - når der køres loop.
            const image1 = document.createElement("img");
            image1.src = `grøntsager-realistisk/${tmpName}.png`;
            image1.width = 35
            image1.height = 35
            document.getElementById(`${tmpName}Februar`).appendChild(image1);
        }




    })


});


d3.select("#Marts")
.on("click", function () {
    seasonal = [{}];
    console.log("Marts button clicked");
    d3.selectAll(".calenderButtons").remove();
    d3.json(`api/frugt/seasonalVegatabels3`, {
        method: "GET"
    }).then(function (response) {

        const data = response.data; // Hent data ud af response
        seasonal = data
        console.log(`Data from "seasonalVegatabels3": ${response.data[0].Groentsag}`);

        for (let index1 = 0; index1 < seasonal.length; index1++) {
            const style1 = `border:1px solid black`;
            const tmpName = seasonal[index1].Groentsag;
            const button = d3.select(".kalender")
                .append("button")
                .attr("style", style1)
                .attr("id", `${tmpName}Marts`)
                .attr("class", "fruit-card-btn calenderButtons")
                .attr("background-image", `url("/grøntsager-realistisk/${tmpName}.png")`)
                .on("click", function () {
                    console.log(`${tmpName} clicked`)
                });

            // Koden der indsætter billede til den tilsvarende grøntsag - når der køres loop.
            const image1 = document.createElement("img");
            image1.src = `grøntsager-realistisk/${tmpName}.png`;
            image1.width = 50
            image1.height = 50
            document.getElementById(`${tmpName}Marts`).appendChild(image1);
        }




    })


});



d3.select("#April")
.on("click", function () {
    console.log("April button clicked");
    d3.selectAll(".calenderButtons").remove();
    d3.json(`api/frugt/seasonalVegatabels4`, {
        method: "GET"
    }).then(function (response) {

        const data = response.data; // Hent data ud af response
        seasonal = data
        console.log(`Data from "seasonalVegatabels4": ${response.data[0].Groentsag}`);

        for (let index1 = 0; index1 < seasonal.length; index1++) {
            const style1 = `border:1px solid black`;
            const tmpName = seasonal[index1].Groentsag;
            const button = d3.select(".kalender")
                .append("button")
                .attr("style", style1)
                .attr("id", `${tmpName}April`)
                .attr("class", "fruit-card-btn calenderButtons")
                .attr("background-image", `url("/grøntsager-realistisk/${tmpName}.png")`)
                .on("click", function () {
                    console.log(`${tmpName} clicked`)
                });

            // Koden der indsætter billede til den tilsvarende grøntsag - når der køres loop.
            const image1 = document.createElement("img");
            image1.src = `grøntsager-realistisk/${tmpName}.png`;
            image1.width = 50
            image1.height = 50
            document.getElementById(`${tmpName}April`).appendChild(image1);
        }




    })


});


d3.select("#Maj")
.on("click", function () {
    console.log("Maj button clicked");
    d3.selectAll(".calenderButtons").remove();
    d3.json(`api/frugt/seasonalVegatabels5`, {
        method: "GET"
    }).then(function (response) {

        const data = response.data; // Hent data ud af response
        seasonal = data
        console.log(`Data from "seasonalVegatabels5": ${response.data[0].Groentsag}`);

        for (let index1 = 0; index1 < seasonal.length; index1++) {
            const style1 = `border:1px solid black`;
            const tmpName = seasonal[index1].Groentsag;
            const button = d3.select(".kalender")
                .append("button")
                .attr("style", style1)
                .attr("id", `${tmpName}Maj`)
                .attr("class", "fruit-card-btn calenderButtons")
                .attr("background-image", `url("/grøntsager-realistisk/${tmpName}.png")`)
                .on("click", function () {
                    console.log(`${tmpName} clicked`)
                });

            // Koden der indsætter billede til den tilsvarende grøntsag - når der køres loop.
            const image1 = document.createElement("img");
            image1.src = `grøntsager-realistisk/${tmpName}.png`;
            image1.width = 50
            image1.height = 50
            document.getElementById(`${tmpName}Maj`).appendChild(image1);
        }




    })


});

d3.select("#Juni")
.on("click", function () {
    console.log("Juni button clicked");
    d3.selectAll(".calenderButtons").remove();
    d3.json(`api/frugt/seasonalVegatabels6`, {
        method: "GET"
    }).then(function (response) { 
        const data = response.data; // Hent data ud af response
        seasonal = data 
        console.log(`Data from "seasonalVegatabels6": ${response.data[0].Groentsag}`);

        for (let index1 = 0; index1 < seasonal.length; index1++) {
            const style1 = `border:1px solid black`;
            const tmpName = seasonal[index1].Groentsag;
            const button = d3.select(".kalender")
                .append("button")
                .attr("style", style1)
                .attr("id", `${tmpName}Juni`)
                .attr("class", "fruit-card-btn calenderButtons")
                .attr("background-image", `url("/grøntsager-realistisk/${tmpName}.png")`)
                .on("click", function () {
                    console.log(`${tmpName} clicked`)
                });

            // Koden der indsætter billede til den tilsvarende grøntsag - når der køres loop.
            const image1 = document.createElement("img");
            image1.src = `grøntsager-realistisk/${tmpName}.png`;
            image1.width = 50
            image1.height = 50
            document.getElementById(`${tmpName}Juni`).appendChild(image1);
        }




    })


});

d3.select("#Juli")
.on("click", function () {
    console.log("Juli button clicked");
    d3.selectAll(".calenderButtons").remove();
    d3.json(`api/frugt/seasonalVegatabels7`, {
        method: "GET"
    }).then(function (response) {

        const data = response.data; // Hent data ud af response
        seasonal = data
        console.log(`Data from "seasonalVegatabels7": ${response.data[0].Groentsag}`);

        for (let index1 = 0; index1 < seasonal.length; index1++) {
            const style1 = `border:1px solid black`;
            const tmpName = seasonal[index1].Groentsag;
            const button = d3.select(".kalender")
                .append("button")
                .attr("style", style1)
                .attr("id", `${tmpName}1`)
                .attr("class", "fruit-card-btn calenderButtons")
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


d3.select("#August")
.on("click", function () {
    console.log("August button clicked");
    d3.selectAll(".calenderButtons").remove();
    d3.json(`api/frugt/seasonalVegatabels8`, {
        method: "GET"
    }).then(function (response) {

        const data = response.data; // Hent data ud af response
        seasonal = data
        console.log(`Data from "seasonalVegatabels8": ${response.data[0].Groentsag}`);

        for (let index1 = 0; index1 < seasonal.length; index1++) {
            const style1 = `border:1px solid black`;
            const tmpName = seasonal[index1].Groentsag;
            const button = d3.select(".kalender")
                .append("button")
                .attr("style", style1)
                .attr("id", `${tmpName}1`)
                .attr("class", "fruit-card-btn calenderButtons")
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

d3.select("#September")
.on("click", function () {
    console.log("September button clicked");
    d3.selectAll(".calenderButtons").remove();
    d3.json(`api/frugt/seasonalVegatabels9`, {
        method: "GET"
    }).then(function (response) {

        const data = response.data; // Hent data ud af response
        seasonal = data
        console.log(`Data from "seasonalVegatabels9": ${response.data[0].Groentsag}`);

        for (let index1 = 0; index1 < seasonal.length; index1++) {
            const style1 = `border:1px solid black`;
            const tmpName = seasonal[index1].Groentsag;
            const button = d3.select(".kalender")
                .append("button")
                .attr("style", style1)
                .attr("id", `${tmpName}1`)
                .attr("class", "fruit-card-btn calenderButtons")
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


d3.select("#Oktober")
.on("click", function () {
    console.log("Oktober button clicked");
    d3.selectAll(".calenderButtons").remove();
    d3.json(`api/frugt/seasonalVegatabels10`, {
        method: "GET"
    }).then(function (response) {

        const data = response.data; // Hent data ud af response
        seasonal = data
        console.log(`Data from "seasonalVegatabels10": ${response.data[0].Groentsag}`);

        for (let index1 = 0; index1 < seasonal.length; index1++) {
            const style1 = `border:1px solid black`;
            const tmpName = seasonal[index1].Groentsag;
            const button = d3.select(".kalender")
                .append("button")
                .attr("style", style1)
                .attr("id", `${tmpName}1`)
                .attr("class", "fruit-card-btn calenderButtons")
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

d3.select("#November")
.on("click", function () {
    console.log("November button clicked");
    d3.selectAll(".calenderButtons").remove();
    d3.json(`api/frugt/seasonalVegatabels11`, {
        method: "GET"
    }).then(function (response) {

        const data = response.data; // Hent data ud af response
        seasonal = data
        console.log(`Data from "seasonalVegatabels11": ${response.data[0].Groentsag}`);

        for (let index1 = 0; index1 < seasonal.length; index1++) {
            const style1 = `border:1px solid black`;
            const tmpName = seasonal[index1].Groentsag;
            const button = d3.select(".kalender")
                .append("button")
                .attr("style", style1)
                .attr("id", `${tmpName}1`)
                .attr("class", "fruit-card-btn calenderButtons")
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



d3.select("#December")
.on("click", function () {
    console.log("December button clicked");
    d3.selectAll(".calenderButtons").remove();
    d3.json(`api/frugt/seasonalVegatabels12`, {
        method: "GET"
    }).then(function (response) {

        const data = response.data; // Hent data ud af response
        seasonal = data
        console.log(`Data from "seasonalVegatabels12": ${response.data[0].Groentsag}`);

        for (let index1 = 0; index1 < seasonal.length; index1++) {
            const style1 = `border:1px solid black`;
            const tmpName = seasonal[index1].Groentsag;
            const button = d3.select(".kalender")
                .append("button")
                .attr("style", style1)
                .attr("id", `${tmpName}1`)
                .attr("class", "fruit-card-btn calenderButtons")
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

