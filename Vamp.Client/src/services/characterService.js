const API_URL = 'http://localhost:5022/api/character';

export const characterService = {
    getAll: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch characters');
        }
        return response.json();
    },

    create: async (character) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(character)
        });
        if (!response.ok) {
            throw new Error('Failed to create character');
        }
        return response.json();
    },

    update: async (id, character) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(character)
        });
        if (!response.ok) {
            throw new Error('Failed to update character');
        }
        return response.json();
    }
};
