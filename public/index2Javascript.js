let seasonal = [{}];
const allMonths = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];
const d = new Date();
let currentMonth = allMonths[d.getMonth()];

function displayCurrentMonth(){
    d3.json(`/api/seasonalFruit/${currentMonth}`, {
        method: "GET"
    }).then(function (response) {
        const data = response.data; // Hent data ud af response
        seasonal = data

        for (let index1 = 0; index1 < seasonal.length; index1++) {
            const style1 = `border:1px #e8e6e0;`;
            const tmpName = seasonal[index1].Groentsag;
            const buttonId = `${tmpName}${currentMonth}`
            const button = d3.select(".kalender")
                .append("button")
                .attr("style", style1)
                .attr("id", buttonId)
                .attr("class", "fruit-card-btn calenderButtons")
                .attr("background-image", `url("/grøntsager-realistisk/${tmpName}.png")`)
                .on("click", function () {
                    console.log(`${tmpName} clicked`)
                    modal.style.display = "block";
                    pLabel.textContent = `${seasonal[index1].Kommentar}`;
                    
                });


            // Koden der indsætter billede til den tilsvarende grøntsag - når der køres loop.
            const image1 = document.createElement("img");
            image1.src = `grøntsager-realistisk/${tmpName}.png`;
            image1.width = 10
            image1.height = 10
            document.getElementById(buttonId).appendChild(image1);
            const labelTag = document.createElement("a");
            labelTag.innerText = `${tmpName}`
            labelTag.className = "textTilKnapper"
            document.getElementById(`${tmpName}${currentMonth}`).appendChild(labelTag);
        }

    })
}

displayCurrentMonth()




for (let month = 0; month < 12; month++) {
    
    d3.select(`#${allMonths[month]}`)
        .on("click", function () {
            seasonal = [{}];
            console.log(`${allMonths[month]} button clicked`);
            d3.selectAll(".calenderButtons").remove();

            //Ændre knappen der trykkes på til grøn
            for (let q = 0; q < 12; q++) {
                document.getElementById(`${allMonths[q]}`).style.color='black';
                //document.getElementById(`${allMonths[q]}`).style.color = 'black';
            }
            document.getElementById(`${allMonths[month]}`).style.color='#5a8f57';
            //




            d3.json(`/api/seasonalFruit/${allMonths[month]}`, {
                method: "GET"
            }).then(function (response) {
                const data = response.data; // Hent data ud af response
                seasonal = data

                for (let index1 = 0; index1 < seasonal.length; index1++) {
                    const style1 = `border:1px #e8e6e0;`;
                    const tmpName = seasonal[index1].Groentsag;
                    const buttonId = `${tmpName}${allMonths[month]}`
                    const button = d3.select(".kalender")
                        .append("button")
                        .attr("style", style1)
                        .attr("id", buttonId)
                        .attr("class", "fruit-card-btn calenderButtons")
                        .attr("background-image", `url("/grøntsager-realistisk/${tmpName}.png")`)
                        .on("click", function () {
                            console.log(`${tmpName} clicked`)
                            modal.style.display = "block";
                            pLabel.textContent = `${seasonal[index1].Kommentar}`;
                            
                        });


                    // Koden der indsætter billede til den tilsvarende grøntsag - når der køres loop.
                    const image1 = document.createElement("img");
                    image1.src = `grøntsager-realistisk/${tmpName}.png`;
                    image1.width = 10
                    image1.height = 10
                    document.getElementById(buttonId).appendChild(image1);
                    const labelTag = document.createElement("a");
                    labelTag.innerText = `${tmpName}`
                    labelTag.className = "textTilKnapper"
                    document.getElementById(`${tmpName}${allMonths[month]}`).appendChild(labelTag);
                }

            })


        });
}





// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the brødtekst element that contains the kommentar
var pLabel = document.getElementsByClassName("KommentarTekst")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}