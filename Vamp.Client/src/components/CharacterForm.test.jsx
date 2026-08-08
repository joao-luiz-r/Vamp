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

        // New V20 sections render
        expect(screen.getByText('Virtues')).toBeInTheDocument();
        expect(screen.getByText('Backgrounds')).toBeInTheDocument();
        expect(screen.getByText('Conscience')).toBeInTheDocument();
        expect(screen.getByText('Allies')).toBeInTheDocument();

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

        // Clan disciplines are auto-added
        await waitFor(() => {
            expect(screen.getAllByLabelText('Discipline Name').length).toBeGreaterThan(0);
        });

        // Submit
        fireEvent.click(screen.getByText('Embrace'));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
            expect(mockOnCreated).toHaveBeenCalled();
        });
    });

    it('auto-fills Weakness from the selected Clan', async () => {
        fetch.mockResolvedValue({ ok: true, json: async () => ({ name: 'Vlad', clan: 'Ventrue' }) });

        renderWithContext(<CharacterForm onCharacterCreated={() => { }} />);

        await waitFor(() => expect(screen.getByText('Name')).toBeInTheDocument());

        fireEvent.change(screen.getByLabelText('Clan'), { target: { value: 'Ventrue' } });

        await waitFor(() => {
            expect(screen.getByLabelText('Weakness').value).toMatch(/only feed on/i);
        });
    });

    it('sets Appearance to 0 when Nosferatu is selected', async () => {
        fetch.mockResolvedValue({ ok: true, json: async () => ({ name: 'Vlad', clan: 'Nosferatu' }) });

        renderWithContext(<CharacterForm onCharacterCreated={() => { }} />);

        await waitFor(() => expect(screen.getByText('Name')).toBeInTheDocument());

        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Vlad' } });
        fireEvent.change(screen.getByLabelText('Clan'), { target: { value: 'Nosferatu' } });

        await waitFor(() => {
            expect(screen.getByLabelText('Weakness').value).toMatch(/hideously deformed/i);
        });

        fireEvent.click(screen.getByText('Embrace'));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
        });
        const calls = fetch.mock.calls;
        const body = JSON.parse(calls[calls.length - 1][1].body);
        expect(body.attributes.appearance).toBe(0);
    });
    it('does not render Possessions or Other Traits sections', async () => {
        renderWithContext(<CharacterForm onCharacterCreated={() => { }} />);

        await waitFor(() => expect(screen.getByText('Name')).toBeInTheDocument());

        expect(screen.queryByText('Possessions')).not.toBeInTheDocument();
        expect(screen.queryByText('Other Traits')).not.toBeInTheDocument();
    });

    it('auto-adds clan disciplines at level 0', async () => {
        renderWithContext(<CharacterForm onCharacterCreated={() => { }} />);

        await waitFor(() => expect(screen.getByText('Name')).toBeInTheDocument());

        fireEvent.change(screen.getByLabelText('Clan'), { target: { value: 'Ventrue' } });

        await waitFor(() => {
            const selects = screen.getAllByLabelText('Discipline Name');
            expect(selects.length).toBe(3);
            expect(selects[0].value).toBe('Dominate');
            expect(selects[1].value).toBe('Fortitude');
            expect(selects[2].value).toBe('Presence');
        });
    });

    it('replaces clan disciplines when the Clan is changed', async () => {
        renderWithContext(<CharacterForm onCharacterCreated={() => { }} />);

        await waitFor(() => expect(screen.getByText('Name')).toBeInTheDocument());

        fireEvent.change(screen.getByLabelText('Clan'), { target: { value: 'Ventrue' } });
        await waitFor(() => {
            expect(screen.getAllByLabelText('Discipline Name').length).toBe(3);
        });

        fireEvent.change(screen.getByLabelText('Clan'), { target: { value: 'Brujah' } });

        await waitFor(() => {
            const selects = screen.getAllByLabelText('Discipline Name');
            expect(selects.length).toBe(3);
            expect(selects[0].value).toBe('Celerity');
            expect(selects[1].value).toBe('Potence');
            expect(selects[2].value).toBe('Presence');
        });
    });

    it('syncs Blood Pool to the Generation maximum', async () => {
        renderWithContext(<CharacterForm onCharacterCreated={() => { }} />);

        await waitFor(() => expect(screen.getByText('Name')).toBeInTheDocument());

        fireEvent.change(screen.getByLabelText('Generation'), { target: { value: '10' } });

        await waitFor(() => {
            const bloodInput = screen.getByLabelText('Blood Pool');
            expect(bloodInput.value).toBe('13');
        });
    });

    it('sets Willpower equal to Courage', async () => {
        renderWithContext(<CharacterForm onCharacterCreated={() => { }} />);

        await waitFor(() => expect(screen.getByText('Name')).toBeInTheDocument());

        fireEvent.click(screen.getByText('Courage').closest('.form-group').querySelectorAll('.dot')[3]);

        await waitFor(() => {
            const willpowerLabel = screen.getByText('Willpower');
            const willpowerDots = willpowerLabel.closest('.form-group').querySelectorAll('.filled');
            expect(willpowerDots.length).toBe(4);
        });
    });

    it('sets Humanity to Conscience + Self-Control', async () => {
        renderWithContext(<CharacterForm onCharacterCreated={() => { }} />);

        await waitFor(() => expect(screen.getByText('Name')).toBeInTheDocument());

        fireEvent.click(screen.getByText('Conscience').closest('.form-group').querySelectorAll('.dot')[4]);

        await waitFor(() => {
            const humanityLabel = screen.getAllByText('Humanity')[0];
            const humanityDots = humanityLabel.closest('.form-group').querySelectorAll('.filled');
            expect(humanityDots.length).toBe(8);
        });
    });
});
