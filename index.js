// =========================================
// STANDARD STATISTIK
// =========================================

const tomStatistik = {

    hvid: 0,
    sort: 0,
    rod: 0,
    gron: 0,
    gul: 0,
    lilla: 0,
    pink: 0,
    orange: 0,

    lysbla: 0,
    morkbla: 0

};



// =========================================
// HENT GEMT STATISTIK
// =========================================

let statistik = {
    ...tomStatistik
};


const gemtStatistik =
    localStorage.getItem(
        "golfStatistik"
    );


if (gemtStatistik) {

    const gamleTal =
        JSON.parse(
            gemtStatistik
        );


    // Dette sikrer, at dine gamle 8 farver
    // stadig beholder deres tal,
    // mens de to nye starter på 0.

    statistik = {

        ...tomStatistik,

        ...gamleTal

    };

}



// =========================================
// DE 10 FARVER
// =========================================

const farver = [

    {
        id: "hvid",
        navn: "Hvid",
        farve: "#ffffff"
    },


    {
        id: "sort",
        navn: "Sort",
        farve: "#202020"
    },


    {
        id: "rod",
        navn: "Rød",
        farve: "#ef3838"
    },


    {
        id: "gron",
        navn: "Grøn",
        farve: "#39b75a"
    },


    {
        id: "gul",
        navn: "Gul",
        farve: "#ffdb32"
    },


    {
        id: "lilla",
        navn: "Lilla",
        farve: "#9366db"
    },


    {
        id: "pink",
        navn: "Pink",
        farve: "#f386bc"
    },


    {
        id: "orange",
        navn: "Orange",
        farve: "#ff922f"
    },


    {
        id: "lysbla",
        navn: "Lys blå",
        farve: "#64c9f2"
    },


    {
        id: "morkbla",
        navn: "Mørk blå",
        farve: "#164f9b"
    }

];



// =========================================
// HTML-ELEMENTER
// =========================================

const forside =
    document.getElementById(
        "forside"
    );


const statistikSide =
    document.getElementById(
        "statistik"
    );


const statistikKnap =
    document.getElementById(
        "statistikKnap"
    );


const tilbageKnap =
    document.getElementById(
        "tilbageKnap"
    );


const nulstilKnap =
    document.getElementById(
        "nulstilKnap"
    );


let timer;



// =========================================
// GEM STATISTIK
// =========================================

function gemStatistik() {

    localStorage.setItem(

        "golfStatistik",

        JSON.stringify(
            statistik
        )

    );

}



// =========================================
// TRYK PÅ GOLFBOLD
// =========================================

const boldKnapper =
    document.querySelectorAll(
        ".bold-knap"
    );


boldKnapper.forEach(

    function(knap) {

        knap.addEventListener(

            "click",

            function() {


                const farve =
                    knap.dataset.color;



                // Læg én sejr til

                statistik[farve]++;



                // Gem

                gemStatistik();



                // Vis statistik
                // med automatisk retur

                visStatistik(true);

            }

        );

    }

);



// =========================================
// STATISTIK-KNAP
// =========================================

statistikKnap.addEventListener(

    "click",

    function() {

        // Manuel visning:
        // ingen timer

        visStatistik(false);

    }

);



// =========================================
// TILBAGE-KNAP
// =========================================

tilbageKnap.addEventListener(

    "click",

    function() {

        visForside();

    }

);



// =========================================
// NULSTIL STATISTIK
// =========================================

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



        // Nulstil alle 10 farver

        statistik = {

            ...tomStatistik

        };



        gemStatistik();



        lavDiagram();



        alert(
            "Statistikken er nu nulstillet."
        );

    }

);



// =========================================
// RUNDER I ALT
// =========================================

function antalRunder() {

    return Object
        .values(statistik)
        .reduce(

            function(total, antal) {

                return total + antal;

            },

            0

        );

}



// =========================================
// VIS STATISTIK
// =========================================

function visStatistik(
    automatiskTilbage
) {

    clearTimeout(timer);


    forside
        .classList
        .remove("aktiv");


    statistikSide
        .classList
        .add("aktiv");



    lavDiagram();



    // Hvis man lige har trykket
    // på en golfbold

    if (automatiskTilbage) {


        // Nulstil-knap må ikke vises

        nulstilKnap
            .classList
            .remove("vis");



        // Tilbage til forsiden
        // efter 7 sekunder

        timer =
            setTimeout(

                function() {

                    visForside();

                },

                7000

            );

    }



    // Hvis man selv trykker
    // på Statistik-knappen

    else {


        nulstilKnap
            .classList
            .add("vis");

    }

}



// =========================================
// VIS FORSIDE
// =========================================

function visForside() {

    clearTimeout(timer);


    statistikSide
        .classList
        .remove("aktiv");


    forside
        .classList
        .add("aktiv");


    nulstilKnap
        .classList
        .remove("vis");

}



// =========================================
// LAV SØJLEDIAGRAM
// =========================================

function lavDiagram() {

    const diagram =
        document.getElementById(
            "diagram"
        );


    diagram.innerHTML = "";



    const total =
        antalRunder();



    document
        .getElementById(
            "runderIAlt"
        )
        .textContent =
        total;



    // Find den farve,
    // der har flest sejre

    const højeste =
        Math.max(

            ...Object.values(
                statistik
            ),

            1

        );



    farver.forEach(

        function(farve) {


            const antal =
                statistik[
                    farve.id
                ];



            // =========================
            // PROCENT
            // =========================

            let procent = 0;


            if (total > 0) {

                procent =
                    Math.round(

                        antal /
                        total *
                        100

                    );

            }



            // =========================
            // SØJLEHØJDE
            // =========================

            let søjleHøjde = 1;


            if (antal > 0) {

                søjleHøjde =

                    antal /
                    højeste *
                    100;

            }



            // =========================
            // OPRET SØJLEN
            // =========================

            const område =
                document.createElement(
                    "div"
                );


            område.className =
                "sojle-område";



            område.innerHTML = `

                <div
                    class="lille-bold"

                    style="
                        background-color:
                        ${farve.farve};
                    "
                >
                </div>



                <div class="antal">
                    ${antal}
                </div>



                <div class="sojle-holder">

                    <div
                        class="sojle"

                        style="
                            --hojde:
                            ${søjleHøjde}%;

                            background-color:
                            ${farve.farve};
                        "
                    >
                    </div>

                </div>



                <div class="navn">
                    ${farve.navn}
                </div>



                <div class="procent">
                    ${procent}%
                </div>

            `;



            diagram.appendChild(
                område
            );

        }

    );

}