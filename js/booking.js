document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    const voyage = document.getElementById('voyage');
    const partySize = document.getElementById('partySize');
    const tier = document.getElementById('tier');
    const species = document.getElementById('species');
    const veilConfirm = document.getElementById('veilConfirm');

    const summaryVoyage = document.getElementById('summaryVoyage');
    const baseFare = document.getElementById('baseFare');
    const summaryParty = document.getElementById('summaryParty');
    const upgradeFare = document.getElementById('upgradeFare');
    const totalFare = document.getElementById('totalFare');
    const verificationStatus = document.getElementById('verificationStatus');
    const accommodationText = document.getElementById('accommodationText');
    const bookingSuccess = document.getElementById('bookingSuccess');

    const accommodations = {
        nightkin: 'Sunless Duskward cabin deep in the hull with night-shifted service and crimson cellar access.',
        merfolk: 'Tidal saltwater suite with constant humidity and sea-plumbed berth.',
        dryad: 'Living-garden cabin with real skylight, rooted bedding, and nectar-and-greens dining.',
        emberkin: 'Obsidian heat-rated stateroom with fireproof linens and brimstone galley service.',
        frostfolk: 'Below-freezing chilled cabin with ice-stocked galley access.',
        griffonkin: 'Upper-deck perch cabin with open-air access and wind-safe rails.'
    };

    const formatCrowns = (amount) => `◈${Number(amount).toLocaleString('en-US')}`;

    function updateSummary() {
        const selected = voyage.options[voyage.selectedIndex];
        const base = Number(selected.dataset.price || 0);
        const guests = Math.max(1, Number(partySize.value || 1));
        const upgrade = Number(tier.value || 0);
        const total = (base + upgrade) * guests;

        summaryVoyage.textContent = selected.textContent.split(' — ')[0];
        baseFare.textContent = formatCrowns(base);
        summaryParty.textContent = guests;
        upgradeFare.textContent = formatCrowns(upgrade * guests);
        totalFare.textContent = formatCrowns(total);
        accommodationText.textContent = accommodations[species.value];
        verificationStatus.textContent = veilConfirm.checked
            ? 'Veil Lens confirmation acknowledged. Final confirmation repeats at the gangway.'
            : 'Veil Lens confirmation pending.';
    }

    [voyage, partySize, tier, species, veilConfirm].forEach(element => {
        element.addEventListener('change', updateSummary);
        element.addEventListener('input', updateSummary);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        bookingSuccess.classList.add('show');
        bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    updateSummary();
});
