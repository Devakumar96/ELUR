// ==========================================
// GET ALL CARDS
// ==========================================

const cards =
    document.querySelectorAll(".bus-card");


// ==========================================
// FIND NEXT BUS
// ==========================================

function getNextBus(schedule) {

    const now =
        new Date();

    for (let bus of schedule) {

        const [hours, minutes] =
            bus.time.split(":");

        const busTime =
            new Date();

        busTime.setHours(hours);
        busTime.setMinutes(minutes);
        busTime.setSeconds(0);

        // Find Upcoming Bus
        if (busTime > now) {

            return {

                ...bus,

                busTime

            };

        }

    }

    return null;

}


// ==========================================
// UPDATE SINGLE CARD
// ==========================================

function updateCard(card, schedule) {

    const nextBus =
        getNextBus(schedule);

    const busNumber =
        card.querySelector(".bus-number");

    const routeText =
        card.querySelector(".route-text");

    const countdown =
        card.querySelector(".countdown");


    // No Bus

    if (!nextBus) {

        busNumber.innerText =
            "No Bus";

        routeText.innerText =
            "Service Closed";

        countdown.innerText =
            "00h 00m 00s";

        return;

    }


    // Update Bus Details

    busNumber.innerText =
        nextBus.busNumber;

    routeText.innerText =
        nextBus.route;


    // Time Difference

    const now =
        new Date().getTime();

    const distance =
        nextBus.busTime.getTime() - now;


    // Hours

    const hours =
        Math.floor(
            distance / (1000 * 60 * 60)
        );

    // Minutes

    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

    // Seconds

    const seconds =
        Math.floor(
            (distance % (1000 * 60))
            / 1000
        );


    // Display

    countdown.innerText =
        `${hours}h ${minutes}m ${seconds}s`;

}


// ==========================================
// LIVE UPDATE
// ==========================================

function startLiveCountdown() {

    // Card 1 → Gobi to Sathy

    updateCard(
        cards[0],
        busSchedule
    );

    // Card 2 → Sathy to Gobi

    updateCard(
        cards[1],
        sathyToGobiSchedule
    );

}


// Initial Load

startLiveCountdown();


// Update Every Second

setInterval(() => {

    startLiveCountdown();

}, 1000);