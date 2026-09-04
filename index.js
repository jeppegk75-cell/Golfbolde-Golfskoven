// -------------------------
// STATISTIK
// -------------------------

let statistik = {

    hvid: 0,
    sort: 0,
    rod: 0,
    gron: 0,
    gul: 0,
    lilla: 0,
    pink: 0,
    orange: 0

};



// -------------------------
// HENT GEMTE TAL
// -------------------------

let gemtStatistik =
    localStorage.getItem("golfStatistik");


if (gemtStatistik) {

    statistik =
        JSON.parse(gemtStatistik);

}



// -------------------------
// FARVER
// -------------------------

const farver = [

    {
        id: "hvid",
        navn: "Hvid",
        farve: "white"
    },

    {
        id: "sort",
        navn: "Sort",
        farve: "#222222"
    },

    {
        id: "rod",
        navn: "Rød",
        farve: "#e53935"
    },

    {
        id: "gron",
        navn: "Grøn",
        farve: "#32a852"
    },

    {
        id: "gul",
        navn: "Gul",
        farve: "#ffd633"
    },

    {
        id: "lilla",
        navn: "Lilla",
        farve: "#8e63ce"
    },

    {
        id: "pink",
        navn: "Pink",
        farve: "#f38bb6"
    },

    {
        id: "orange",
        navn: "Orange",
        farve: "#f28c28"
    }

];



// -------------------------
// HTML-ELEMENTER
// -------------------------

const forside =
    document.getElementById("forside");


const statistikSide =
    document.getElementById("statistik");


const statistikKnap =
    document.getElementById("statistikKnap");


const tilbageKnap =
    document.getElementById("tilbageKnap");


const nulstilKnap =
    document.getElementById("nulstilKnap");



// Timer til automatisk retur

let timer;



// -------------------------
// TRYK PÅ GOLFBOLD
// -------------------------

const knapper =
    document.querySelectorAll(".bold-knap");


knapper.forEach(function(knap) {

    knap.addEventListener(
        "click",
        function() {

            const farve =
                knap.dataset.color;


            // Læg 1 til den valgte farve

            statistik[farve]++;


            // Gem tallene

            localStorage.setItem(
                "golfStatistik",
                JSON.stringify(statistik)
            );


            // Vis statistik
            // og gå automatisk tilbage

            visStatistik(true);

        }
    );

});



// -------------------------
// STATISTIK-KNAP
// -------------------------

statistikKnap.addEventListener(
    "click",
    function() {

        // Statistik åbnet manuelt
        // derfor ingen timer

        visStatistik(false);

    }
);



// -------------------------
// TILBAGE-KNAP
// -------------------------

tilbageKnap.addEventListener(
    "click",
    function() {

        visForside();

    }
);



// -------------------------
// NULSTIL-KNAP
// -------------------------

nulstilKnap.addEventListener(
    "click",
    function() {

        // Første godkendelse

        const førsteGodkendelse =
            confirm(
                "Er du sikker på, at du vil nulstille hele statistikken?"
            );


        if (!førsteGodkendelse) {

            return;

        }



        // Anden godkendelse

        const andenGodkendelse =
            confirm(
                "Er du HELT sikker? Alle registrerede runder bliver slettet."
            );


        if (!andenGodkendelse) {

            return;

        }



        // Nulstil alle tal

        statistik = {

            hvid: 0,
            sort: 0,
            rod: 0,
            gron: 0,
            gul: 0,
            lilla: 0,
            pink: 0,
            orange: 0

        };



        // Gem nulstillingen

        localStorage.setItem(
            "golfStatistik",
            JSON.stringify(statistik)
        );



        // Opdater diagram

        lavDiagram();



        // Besked

        alert(
            "Statistikken er nu nulstillet."
        );

    }
);



// -------------------------
// BEREGN RUNDER I ALT
// -------------------------

function antalRunder() {

    return (

        statistik.hvid +
        statistik.sort +
        statistik.rod +
        statistik.gron +
        statistik.gul +
        statistik.lilla +
        statistik.pink +
        statistik.orange

    );

}



// -------------------------
// VIS STATISTIK
// -------------------------

function visStatistik(automatiskTilbage) {

    clearTimeout(timer);


    forside.classList.remove("aktiv");

    statistikSide.classList.add("aktiv");


    lavDiagram();



    // Hvis siden åbnes efter tryk på bold

    if (automatiskTilbage) {

        // Nulstil-knappen skjules

        nulstilKnap.classList.remove("vis");



        // Automatisk tilbage efter 7 sekunder

        timer = setTimeout(
            function() {

                visForside();

            },

            7000
        );

    }



    // Hvis man selv trykker Statistik

    else {

        // Vis nulstil-knappen

        nulstilKnap.classList.add("vis");

    }

}



// -------------------------
// VIS FORSIDE
// -------------------------

function visForside() {

    clearTimeout(timer);


    statistikSide.classList.remove("aktiv");

    forside.classList.add("aktiv");


    // Skjul nulstil-knap igen

    nulstilKnap.classList.remove("vis");

}



// -------------------------
// LAV DIAGRAM
// -------------------------

function lavDiagram() {

    const diagram =
        document.getElementById("diagram");


    diagram.innerHTML = "";



    const total =
        antalRunder();



    document
        .getElementById("runderIAlt")
        .textContent = total;



    // Find højeste antal sejre

    const højeste =
        Math.max(

            statistik.hvid,
            statistik.sort,
            statistik.rod,
            statistik.gron,
            statistik.gul,
            statistik.lilla,
            statistik.pink,
            statistik.orange,
            1

        );



    farver.forEach(function(farve) {

        const antal =
            statistik[farve.id];



        // Beregn procent

        let procent = 0;


        if (total > 0) {

            procent =
                Math.round(
                    antal / total * 100
                );

        }



        // Beregn søjlehøjde

        let højde = 3;


        if (antal > 0) {

            højde =
                antal / højeste * 230;

        }



        // Lav én søjle

        const område =
            document.createElement("div");


        område.className =
            "sojle-område";


        område.innerHTML = `

            <div
                class="lille-bold"
                style="
                    background-color: ${farve.farve};
                "
            >
            </div>


            <div class="antal">
                ${antal}
            </div>


            <div
                class="sojle"
                style="
                    height: ${højde}px;
                    background-color: ${farve.farve};
                "
            >
            </div>


            <div class="navn">
                ${farve.navn}
            </div>


            <div class="procent">
                ${procent}%
            </div>

        `;


        diagram.appendChild(område);

    });

}