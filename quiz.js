// Setting up the beginning of the quiz.

let pokemonData = [];
let currentStep = 0;
let currentPokemon = null;
let mainType = "";
let secondTypes = [];

// Change this if you want different music.

const bgm = new Audio('bgm.mp3');
bgm.loop = true;

// Linking this document to the Pokemon list.

fetch('masterlist.json')
    .then(response => response.json())
    .then(data => {
        pokemonData = data;
        console.log("Masterlist loaded:", pokemonData);
    })
    .catch(err => console.error("Fetch error:", err));

// Questions go here.

const typeQuestions = [
    {
        question: "What is your primary driving force?",
        options: [
            { text: "Passion (action, energy, and moving forward)", typeWeight: { Fighting: 3, Fire: 2, Electric: 1 } },
            { text: "Logic (planning, analyzing, and self-preservation)", typeWeight: { Psychic: 3, Ice: 2, Normal: 1 } },
            { text: "Harmony (connection, nature, and peace)", typeWeight: { Grass: 3, Water: 2, Bug: 1 } },
            { text: "Knowledge (the pursuit, curiosity, and mystery)", typeWeight: { Flying: 3, Bug: 2, Ghost: 1 } }
        ]
    },
    {
        question: "How do you naturally express that force?",
        options: [
            { text: "Explosively (fast, intense, and loud)", typeWeight: { Fire: 3, Electric: 2, Fighting: 1 } },
            { text: "Quietly (subtle, independent, and internal)", typeWeight: { Ghost: 3, Dark: 2, Poison: 1 } },
            { text: "Adaptably (flowing, changing, and open-minded)", typeWeight: { Water: 3, Rock: 2, Normal: 1 } },
            { text: "Sturdily (resilient, unyielding, and protective)", typeWeight: { Rock: 3, Ground: 2, Ice: 1 } }
        ]
    },
    {
        question: "If your soul had a physical texture, what would it feel like?",
        options: [
            { text: "A crackling, warm, restless flame", typeWeight: { Fire: 3, Poison: 2, Normal: 1 } },
            { text: "A cool, sharp, brilliant crystal shard", typeWeight: { Ice: 3, Rock: 2, Ground: 1 } },
            { text: "A soft, ever-shifting morning breeze", typeWeight: { Flying: 3, Ghost: 2, Bug: 1 } },
            { text: "A deep, quiet, endless starry night sky", typeWeight: { Dark: 3, Ghost: 2, Poison: 1 } }
        ]
    },
    {
        question: "What do you fear losing the most?",
        options: [
            { text: "Your purpose. To have nothing worth fighting for", typeWeight: { Normal: 3, Ground: 2, Fire: 1 } },
            { text: "Your freedom. To be trapped by duty or expectation", typeWeight: { Electric: 3, Flying: 2, Fire: 1 } },
            { text: "Your connections. To stand alone when it matters most", typeWeight: { Grass: 3, Bug: 2, Dark: 1 } },
            { text: "Your identity. To become someone you no longer recognize", typeWeight: { Poison: 3, Psychic: 2, Normal: 1 } },
            { text: "Your curiosity. To believe there is nothing left to discover", typeWeight: { Water: 3, Fighting: 2, Fire: 1 } }
        ]
    },
    {
        question: "If you could command one domain, which would you claim?",
        options: [
            { text: "The Wild Inferno", typeWeight: { Fire: 3, Dark: 2, Electric: 1 } },
            { text: "The Abyssal Depths", typeWeight: { Water: 3, Ghost: 2, Poison: 1 } },
            { text: "The Open Skies", typeWeight: { Flying: 3, Electric: 2, Psychic: 1 } },
            { text: "The Living Earth", typeWeight: { Ground: 3, Rock: 2, Grass: 1 } },
            { text: "The Primal Beasts", typeWeight: { Bug: 3, Normal: 2, Ice: 1 } }
        ]
    },
    {
        question: "When it is time to make your move, how do you strike?",
        options: [
            { text: "With Overwhelming Force: no room for doubt", typeWeight: { Fighting: 3, Rock: 2, Ground: 1 } },
            { text: "With Calculated Precision: striking true", typeWeight: { Ice: 3, Psychic: 2, Electric: 1 } },
            { text: "With Fluid Versatility: adapting to the challenge", typeWeight: { Normal: 3, Bug: 2, Water: 1 } }
        ]
    },
    {
        question: "You are about to enter the arena along with an ally. Which would you take with you?",
        options: [
            { text: "An impenetrable shield", typeWeight: { Ground: 3, Normal: 2, Rock: 1 } },
            { text: "An unstoppable spear", typeWeight: { Fighting: 3, Bug: 2, Flying: 1 } },
            { text: "An infallible bow and an endless quiver", typeWeight: { Grass: 3, Electric: 2, Water: 1 } },
            { text: "An elemental orb", typeWeight: { Psychic: 3, Poison: 2, Water: 1 } },
            { text: "A loyal battle beast", typeWeight: { Dark: 3, Fire: 2, Ghost: 1 } }
        ]
    },
    {
        question: "You are walking through an ancient, forgotten library. Which naturally draws your attention first?",
        options: [
            { text: "A heavy, iron-bound tome", typeWeight: { Normal: 3, Rock: 2, Ground: 1 } },
            { text: "A dusty leather ledger with scraps sticking out", typeWeight: { Flying: 3, Electric: 2, Fire: 1 } },
            { text: "A fragile, beautifully illustrated diary", typeWeight: { Psychic: 3, Ghost: 2, Dark: 1 } },
            { text: "A pitch-black gold-embossed hardcover", typeWeight: { Ice: 3, Fighting: 2, Ground: 1 } },
            { text: "A water-stained scroll sealed with blue wax", typeWeight: { Grass: 3, Poison: 2, Bug: 1 } }
        ]
    },
    {
        question: "If you could choose where your final battle would take place, where would it be?",
        options: [
            { text: "A crumbling stone bridge over a sea of magma", typeWeight: { Rock: 3, Ground: 2, Ghost: 1 } },
            { text: "The eye of a roaring, debris-filled hurricane", typeWeight: { Electric: 3, Water: 2, Flying: 1 } },
            { text: "A mirror-like frozen lake under a brilliant starry sky", typeWeight: { Poison: 3, Grass: 2, Ice: 1 } },
            { text: "A misty mountain peak untouched by the world", typeWeight: { Flying: 3, Ice: 2, Rock: 1 } },
            { text: "The grand, silent throne room of a ruined palace", typeWeight: { Ghost: 3, Dark: 2, Psychic: 1 } }
        ]
    },
    {
        question: "Soon, you will join the world of Pokémon. If you could bring one thing from your former life, what would it be?",
        options: [
            { text: "Entertainment, like a good book", typeWeight: { Bug: 3, Electric: 2, Normal: 1 } },
            { text: "Something practical, like a compass", typeWeight: { Ground: 3, Rock: 2, Normal: 1 } },
            { text: "Delicious food", typeWeight: { Grass: 3, Water: 2, Poison: 1 } },
            { text: "My best friend", typeWeight: { Fighting: 3, Poison: 2, Water: 1 } },
            { text: "A secret treasure", typeWeight: { Dark: 3, Ice: 2, Rock: 1 } }
        ]
    }
];

let typeScores = {
    Fighting: 0, Fire: 0, Electric: 0, Psychic: 0, Ice: 0, Normal: 0,
    Grass: 0, Water: 0, Bug: 0, Flying: 0, Ghost: 0, Dark: 0,
    Poison: 0, Rock: 0, Ground: 0
};

// This code lets the questions work properly.

function renderQuestion() {
    const textElement = document.getElementById("quiz-text");
    const optionsContainer = document.getElementById("options-container");

    optionsContainer.innerHTML = "";
    textElement.innerText = "";

    const data = typeQuestions[currentStep];

    typeWriter(data.question, () => {
        data.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.innerText = opt.text;
            btn.onclick = () => selectOption(opt);
            optionsContainer.appendChild(btn);
        });
    });
}

function typeWriter(text, callback) {
    let i = 0;
    const textElement = document.getElementById("quiz-text");
    let typingTimeout;
    let isTyping = true;

    if (textElement) textElement.innerHTML = "";

    const handleGlobalClick = (e) => {
        if (e.target.tagName === 'BUTTON') return;
        if (isTyping) {
            clearTimeout(typingTimeout);
            textElement.innerHTML = text;
            finishTyping();
        }
    };

    window.addEventListener("click", handleGlobalClick);

    function finishTyping() {
        isTyping = false;
        window.removeEventListener("click", handleGlobalClick);
        setTimeout(() => {
            if (callback) callback();
        }, 150);
    }

    function type() {
        if (i < text.length) {
            textElement.innerHTML += text.charAt(i);
            i++;
            typingTimeout = setTimeout(type, 25);
        } else if (isTyping) {
            finishTyping();
        }
    }

    type();
}

function selectOption(opt) {
    for (let type in opt.typeWeight) {
        typeScores[type] += opt.typeWeight[type];
    }

    currentStep++;

    if (currentStep < typeQuestions.length) {
        renderQuestion();
    } else {
        calculateFinalResult();
    }
}

//Scoring

function calculateFinalResult() {
    const sortedTypes = Object.keys(typeScores).sort((a, b) => typeScores[b] - typeScores[a]);

    mainType = sortedTypes[0];
    const secondScore = typeScores[sortedTypes[1]];
    secondTypes = sortedTypes.filter((t, i) => i > 0 && typeScores[t] === secondScore);

    startPokemonReveal();
}

function getRandomAbility(pokemon) {
    const pool = [...pokemon.ability];
    if (pokemon.hidden_ability) pool.push(pokemon.hidden_ability);
    return pool[Math.floor(Math.random() * pool.length)];
}

function getPokemonByType(type, excludeNames = []) {
    if (!pokemonData || !pokemonData.pokemon_entries) return [];
    return pokemonData.pokemon_entries.filter(p =>
        p.type.includes(type) && !excludeNames.includes(p.name)
    );
}

function pickRandomUnique(pool, count) {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function startPokemonReveal() {
    const pool = getPokemonByType(mainType);

    if (pool.length === 0) {
        console.error("No Pokémon found for type " + mainType);
        return;
    }

    const chosen = pool[Math.floor(Math.random() * pool.length)];
    const ability = getRandomAbility(chosen);

    currentPokemon = { name: chosen.name, type: chosen.type, ability: ability };
    displayFinalReveal(currentPokemon);
}

function displayFinalReveal(pokemon) {
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    const message = `Your Pokémon is ${pokemon.name}! (${pokemon.type.join(" / ")}) — Ability: ${pokemon.ability}`;

    typeWriter(message, () => {
        const yesBtn = document.createElement("button");
        yesBtn.innerText = "I'm happy with this!";
        yesBtn.onclick = () => showResultsPage(pokemon);
        optionsContainer.appendChild(yesBtn);

        const noBtn = document.createElement("button");
        noBtn.innerText = "Show me other options";
        noBtn.onclick = () => showAlternatives();
        optionsContainer.appendChild(noBtn);
    });
}

// Six alternatives: Four from the main type, two from second place.

function showAlternatives() {
    const optionsContainer = document.getElementById("options-container");
    const original = currentPokemon;

    const usedNames = [original.name];

    const mainPool = getPokemonByType(mainType, usedNames);
    const mainPicks = pickRandomUnique(mainPool, 4);
    usedNames.push(...mainPicks.map(p => p.name));

    let secondPicks = [];
    if (secondTypes.length > 0) {
        const slots = 2;
        const perType = Math.floor(slots / secondTypes.length);
        const remainder = slots % secondTypes.length;
        const orderedTypes = [...secondTypes].sort(() => 0.5 - Math.random());

        orderedTypes.forEach((t, idx) => {
            const count = perType + (idx < remainder ? 1 : 0);
            if (count > 0) {
                const pool = getPokemonByType(t, usedNames);
                const picks = pickRandomUnique(pool, count);
                secondPicks.push(...picks);
                usedNames.push(...picks.map(p => p.name));
            }
        });
    }

    const alternatives = [...mainPicks, ...secondPicks];

    optionsContainer.innerHTML = "";
    typeWriter("Here are a few other Pokémon that might fit you better:", () => {
        alternatives.forEach(alt => {
            const btn = document.createElement("button");
            btn.innerText = alt.name;
            btn.onclick = () => {
                const ability = getRandomAbility(alt);
                currentPokemon = { name: alt.name, type: alt.type, ability: ability };
                displayFinalReveal(currentPokemon);
            };
            optionsContainer.appendChild(btn);
        });

        const backBtn = document.createElement("button");
        backBtn.innerText = `Actually, ${original.name} was right.`;
        backBtn.className = "back-button";
        backBtn.onclick = () => {
            currentPokemon = original;
            displayFinalReveal(currentPokemon);
        };
        optionsContainer.appendChild(backBtn);
    });
}

// Copies the results to the clipboard, with a backup method
// in case the browser blocks or doesn't support the normal way.

function copyToClipboard(text, button) {
    const onSuccess = () => {
        button.innerText = "Saved to Clipboard!";
    };
    const onFailure = () => {
        fallbackCopy(text, button);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(onFailure);
    } else {
        fallbackCopy(text, button);
    }
}

function fallbackCopy(text, button) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    let succeeded = false;
    try {
        succeeded = document.execCommand("copy");
    } catch (err) {
        succeeded = false;
    }
    document.body.removeChild(textarea);

    button.innerText = succeeded
        ? "Saved to Clipboard!"
        : "Copy failed — select & copy manually";
}

// Results.

function showResultsPage(pokemon) {
    const textElement = document.getElementById("quiz-text");
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    const summary = `
        [Quiz Result]
        Pokémon: ${pokemon.name}
        Type: ${pokemon.type.join(" / ")}
        Ability: ${pokemon.ability}
    `;

    textElement.innerText = "Your result has been recorded!";

    const resultBox = document.createElement("div");
    resultBox.className = "result-box";
    resultBox.style.whiteSpace = "pre-line";
    resultBox.innerText = summary;
    optionsContainer.appendChild(resultBox);

    const copyBtn = document.createElement("button");
    copyBtn.innerText = "Copy Results";
    copyBtn.onclick = () => copyToClipboard(summary, copyBtn);
    optionsContainer.appendChild(copyBtn);

    const retakeBtn = document.createElement("button");
    retakeBtn.innerText = "Retake the Quiz";
    retakeBtn.onclick = () => {
        localStorage.removeItem("quiz_result");
        location.reload();
    };
    optionsContainer.appendChild(retakeBtn);

    localStorage.setItem("quiz_result", JSON.stringify(pokemon));
}

// This is stuff on load in.

window.onload = () => {
    bgm.play().catch(() => console.log("Autoplay blocked. Music will start on next click."));
    document.body.addEventListener('click', () => {
        if (bgm.paused) bgm.play();
    }, { once: true });

    const savedData = localStorage.getItem("quiz_result");
    if (savedData) {
        showResultsPage(JSON.parse(savedData));
    } else {
        renderQuestion();
    }
};
