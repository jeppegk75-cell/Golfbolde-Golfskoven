// =================================
// STATISTIK
// =================================

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



// =================================
// HENT GEMT STATISTIK
// =================================

const gemtStatistik =
    localStorage.getItem(
        "golfStatistik"
    );


if (gemtStatistik) {

    statistik =
        JSON.parse(
            gemtStatistik
        );

}



// =================================
// FARVER
// =================================

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



// =================================
// HTML-ELEMENTER
// =================================

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



// =================================
// TRYK PÅ GOLFBOLD
// =================================

const knapper =
    document.querySelectorAll(
        ".bold-knap"
    );


knapper.forEach(
    function(knap) {

        knap.addEventListener(
            "click",
            function() {

                const farve =
                    knap.dataset.color;


                // Tilføj én sejr

                statistik[farve]++;



                // Gem statistikken

                localStorage.setItem(

                    "golfStatistik",

                    JSON.stringify(
                        statistik
                    )

                );



                // Vis statistik
                // og automatisk retur

                visStatistik(true);

            }
        );

    }
);



// =================================
// STATISTIK-KNAP
// =================================

statistikKnap.addEventListener(
    "click",
    function() {

        // Manuel statistikside
        // derfor ingen timer

        visStatistik(false);

    }
);



// =================================
// TILBAGE-KNAP
// =================================

tilbageKnap.addEventListener(
    "click",
    function() {

        visForside();

    }
);



// =================================
// NULSTIL STATISTIK
// =================================

nulstilKnap.addEventListener(
    "click",
    function() {


        const førsteGodkendelse =
            confirm(

                "Er du sikker på, at du vil nulstille hele statistikken?"

            );


        if (!førsteGodkendelse) {

            return;

        }



        const andenGodkendelse =
            confirm(

                "Er du HELT sikker? Alle registrerede runder bliver slettet."

            );


        if (!andenGodkendelse) {

            return;

        }



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



        localStorage.setItem(

            "golfStatistik",

            JSON.stringify(
                statistik
            )

        );



        lavDiagram();



        alert(
            "Statistikken er nu nulstillet."
        );

    }
);



// =================================
// RUNDER I ALT
// =================================

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



// =================================
// VIS STATISTIK
// =================================

function visStatistik(
    automatiskTilbage
) {

    clearTimeout(timer);


    forside.classList.remove(
        "aktiv"
    );


    statistikSide.classList.add(
        "aktiv"
    );


    lavDiagram();



    // Efter tryk på en bold

    if (automatiskTilbage) {

        nulstilKnap
            .classList
            .remove("vis");


        // Automatisk retur
        // efter 7 sekunder

        timer =
            setTimeout(

                function() {

                    visForside();

                },

                7000

            );

    }



    // Manuel statistik-knap

    else {

        nulstilKnap
            .classList
            .add("vis");

    }

}



// =================================
// VIS FORSIDE
// =================================

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



// =================================
// LAV DIAGRAM
// =================================

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



    farver.forEach(
        function(farve) {

            const antal =
                statistik[
                    farve.id
                ];



            // -------------------------
            // PROCENT AF ALLE RUNDER
            // -------------------------

            let procent = 0;


            if (total > 0) {

                procent =
                    Math.round(

                        antal /
                        total *
                        100

                    );

            }



            // -------------------------
            // SØJLEHØJDE
            // -------------------------

            let søjleHøjde = 1;


            if (antal > 0) {

                søjleHøjde =

                    antal /
                    højeste *
                    100;

            }



            // -------------------------
            // OPRET SØJLE
            // -------------------------

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


                <div
                    class="sojle-holder"
                >

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