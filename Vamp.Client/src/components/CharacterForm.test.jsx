import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CharacterForm from './CharacterForm';
import { LocalizationProvider } from '../context/LocalizationContext';

// Mock services
vi.mock('../services/preferencesService', () => ({
    preferencesService: {
        getLanguage: vi.fn().mockResolvedValue('En-Us'),
        setLanguage: vi.fn(),
    }
}));

global.fetch = vi.fn();

const renderWithContext = (component) => {
    return render(
        <LocalizationProvider>
            {component}
        </LocalizationProvider>
    );
};

describe('CharacterForm', () => {
    it('renders correctly', async () => {
        renderWithContext(<CharacterForm onCharacterCreated={() => { }} />);

        // Wait for language to load and component to render title
        await waitFor(() => {
            expect(screen.getByText('VAMPIRE')).toBeInTheDocument();
        });

        // Use regex for flexible matching if labels have colons or are translated
        // "Name" is a key in locales 'label.name'
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Embrace')).toBeInTheDocument();

    });

    it('submits form data', async () => {
        const mockOnCreated = vi.fn();
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ name: 'Vlad', clan: 'Ventrue' }),
        });

        renderWithContext(<CharacterForm onCharacterCreated={mockOnCreated} />);

        // Wait for render
        await waitFor(() => expect(screen.getByText('Name')).toBeInTheDocument());

        // Fill inputs
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Vlad' } });

        // Select Clan (Dropdown now)
        fireEvent.change(screen.getByLabelText('Clan'), { target: { value: 'Ventrue' } });

        // Add a discipline
        fireEvent.click(screen.getByText('+ Add Discipline'));

        // Discipline Name is now a Select
        // We select the first available discipline e.g. "Dominate"
        const discSelect = screen.getByLabelText('Discipline Name');
        fireEvent.change(discSelect, { target: { value: 'Dominate' } });

        // Submit
        fireEvent.click(screen.getByText('Embrace'));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
            expect(mockOnCreated).toHaveBeenCalled();
        });
    });
});
