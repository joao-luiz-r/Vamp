export const STANDARD_ABILITIES = {
    talents: [
        "Alertness", "Athletics", "Awareness", "Brawl", "Empathy",
        "Expression", "Intimidation", "Leadership", "Streetwise", "Subterfuge"
    ],
    skills: [
        "Animal Ken", "Crafts", "Drive", "Etiquette", "Firearms",
        "Larceny", "Melee", "Performance", "Stealth", "Survival"
    ],
    knowledges: [
        "Academics", "Computer", "Finance", "Investigation", "Law",
        "Medicine", "Occult", "Politics", "Science", "Technology"
    ]
};

export const CLANS = [
    { name: "Ventrue", disciplines: ["Dominate", "Fortitude", "Presence"] },
    { name: "Brujah", disciplines: ["Celerity", "Potence", "Presence"] },
    { name: "Toreador", disciplines: ["Auspex", "Celerity", "Presence"] },
    { name: "Gangrel", disciplines: ["Animalism", "Fortitude", "Protean"] },
    { name: "Malkavian", disciplines: ["Auspex", "Dementation", "Obfuscate"] },
    { name: "Nosferatu", disciplines: ["Animalism", "Obfuscate", "Potence"] },
    { name: "Tremere", disciplines: ["Auspex", "Dominate", "Thaumaturgy"] },
    { name: "Caitiff", disciplines: [] }
];

// Helper to get all unique disciplines if needed, or we just rely on clan filters
export const DISCIPLINES = [
    "Animalism", "Auspex", "Celerity", "Dementation", "Dominate",
    "Fortitude", "Obfuscate", "Potence", "Presence", "Protean", "Thaumaturgy"
];

// Clan Banes (V20) — auto-filled as the character's Weakness when a Clan is chosen.
// Keys match the Clan names in CLANS above.
export const CLAN_WEAKNESSES = {
    "Ventrue": "weakness.ventrue",
    "Brujah": "weakness.brujah",
    "Toreador": "weakness.toreador",
    "Gangrel": "weakness.gangrel",
    "Malkavian": "weakness.malkavian",
    "Nosferatu": "weakness.nosferatu",
    "Tremere": "weakness.tremere",
    "Caitiff": "weakness.caitiff"
};

// Clans with special attribute overrides applied automatically to the sheet.
export const CLAN_ATTRIBUTE_OVERRIDES = {
    "Nosferatu": { attribute: "appearance", value: 0 }
};
// Archetypes (Nature & Demeanor)
export const ARCHETYPES = [
    "Architect", "Autocrat", "Bon Vivant", "Bravo", "Caregiver",
    "Celebrant", "Child", "Conformist", "Conniver", "Curmudgeon",
    "Deviant", "Director", "Fanatic", "Gallant", "Jester",
    "Loner", "Martyr", "Monster", "Penitent", "Perfectionist",
    "Rebel", "Rogue", "Survivor", "Thrill-Seeker", "Traditionalist", "Visionary"
];

// Virtues (V20) - standard track, Conscience may be replaced by Conviction
// and Self-Control by Instinct on non-Humanity Paths.
// Keys match the JSON property names (camelCase) used by the API.
export const VIRTUES = [
    { key: "conscience", name: "Conscience", description: "Your moral compass and the voice of your humanity." },
    { key: "selfControl", name: "Self-Control", description: "Your discipline over your darker impulses." },
    { key: "courage", name: "Courage", description: "Your bravery in the face of fear and the Beast." }
];

// Backgrounds (V20) - standard list from the core rulebook
export const BACKGROUNDS = [
    "Allies", "Contacts", "Fame", "Generation", "Herd",
    "Influence", "Mentor", "Resources", "Retainers", "Status"
];

// Derived traits (V20, p. 269) based on Generation
export const bloodPoolByGeneration = (generation) => {
    const map = {
        4: 50, 5: 40, 6: 30, 7: 25, 8: 20, 9: 15,
        10: 13, 11: 12, 12: 11, 13: 10, 14: 8, 15: 5, 16: 1
    };
    return map[generation] ?? 10;
};

export const bloodPerTurnByGeneration = (generation) => {
    const map = {
        4: 12, 5: 10, 6: 8, 7: 7, 8: 6, 9: 5,
        10: 4, 11: 3, 12: 2, 13: 1, 14: 1, 15: 1, 16: 0
    };
    return map[generation] ?? 1;
};
