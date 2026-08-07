const API_URL = '/api/preferences'; // Using relative path

export const preferencesService = {
    getLanguage: async () => {
        try {
            const response = await fetch(`${API_URL}/language`);
            if (!response.ok) throw new Error('Failed to fetch language preference');
            const data = await response.json();
            return data.language;
        } catch (error) {
            console.error(error);
            return 'En-Us'; // Default fallback
        }
    },

    setLanguage: async (language) => {
        console.log('[preferencesService] Setting language to:', language);
        try {
            const response = await fetch(`${API_URL}/language`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language })
            });
            if (!response.ok) {
                console.error('[preferencesService] Failed to set language, status:', response.status);
                throw new Error('Failed to set language preference');
            }
            console.log('[preferencesService] Language set successfully');
        } catch (error) {
            console.error('[preferencesService] Error setting language:', error);
        }
    }
};
