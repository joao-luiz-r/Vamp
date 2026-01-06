export const STANDARD_ABILITIES = {
    talents: [
        "Alertness", "Athletics", "Brawl", "Dodge", "Empathy",
        "Expression", "Intimidation", "Leadership", "Streetwise", "Subterfuge"
    ],
    skills: [
        "Animal Ken", "Crafts", "Drive", "Etiquette", "Firearms",
        "Melee", "Performance", "Security", "Stealth", "Survival"
    ],
    knowledges: [
        "Academics", "Computer", "Finance", "Investigation", "Law",
        "Linguistics", "Medicine", "Occult", "Politics", "Science"
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
// Archetypes (Nature & Demeanor)
export const ARCHETYPES = [
    "Architect", "Autocrat", "Bon Vivant", "Bravo", "Caregiver",
    "Celebrant", "Child", "Conformist", "Conniver", "Curmudgeon",
    "Deviant", "Director", "Fanatic", "Gallant", "Jester",
    "Loner", "Martyr", "Monster", "Penitent", "Perfectionist",
    "Rebel", "Rogue", "Survivor", "Thrill-Seeker", "Traditionalist", "Visionary"
];
