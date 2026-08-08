import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CharacterSheet from './CharacterSheet';
import { LocalizationProvider } from '../context/LocalizationContext';

vi.mock('../services/preferencesService', () => ({
    preferencesService: {
        getLanguage: vi.fn().mockResolvedValue('En-Us'),
        setLanguage: vi.fn(),
    }
}));

const mockCharacter = {
    id: 1,
    name: 'Victor Temple',
    player: 'Player One',
    chronicle: 'LA by Night',
    nature: 'Architect',
    demeanor: 'Survivor',
    concept: 'Cursed Detective',
    clan: 'Ventrue',
    generation: 13,
    sire: 'Elder Blood',
    attributes: {
        strength: 2, dexterity: 3, stamina: 2,
        charisma: 3, manipulation: 3, appearance: 2,
        perception: 3, intelligence: 3, wits: 2
    },
    abilities: {
        talents: { Alertness: 2, Awareness: 1 },
        skills: { Stealth: 2 },
        knowledges: { Occult: 1 }
    },
    disciplines: [{ name: 'Dominate', level: 2 }],
    virtues: { conscience: 3, selfControl: 3, courage: 3 },
    backgrounds: { Resources: 3 },
    willpower: 5,
    humanity: 7,
    health: -1,
    bloodPool: 10,
    path: 'Humanity',
    experience: 15,
    merits: [{ name: 'Influence', cost: 2 }],
    flaws: [],
    otherTraits: [],
    weakness: 'Only feed on aristocrats',
    possessions: 'sword',
    history: '',
    prelude: ''
};

const renderWithContext = (component) => {
    return render(
        <LocalizationProvider>
            {component}
        </LocalizationProvider>
    );
};

describe('CharacterSheet', () => {
    it('renders character details', async () => {
        renderWithContext(<CharacterSheet character={mockCharacter} onEdit={() => { }} onDelete={() => { }} />);

        await waitFor(() => {
            expect(screen.getByText('Victor Temple')).toBeInTheDocument();
        });
        expect(screen.getByText('Ventrue')).toBeInTheDocument();
        expect(screen.getByText('Resources')).toBeInTheDocument();
        expect(screen.getByText('Dominate')).toBeInTheDocument();
    });

    it('calls window.print when Export PDF is clicked', async () => {
        const printSpy = vi.spyOn(window, 'print').mockImplementation(() => { });

        renderWithContext(<CharacterSheet character={mockCharacter} onEdit={() => { }} onDelete={() => { }} />);

        await waitFor(() => {
            expect(screen.getByText('Export PDF')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Export PDF'));
        expect(printSpy).toHaveBeenCalled();
        printSpy.mockRestore();
    });
});
