import React, { useState, useEffect } from 'react';
import { characterService } from '../services/characterService';
import { useLocalization } from '../context/LocalizationContext';
import { CLANS, DISCIPLINES, ARCHETYPES } from '../constants/vtmRules';
import AttributesSection from './Create/AttributesSection';
import AbilitiesSection from './Create/AbilitiesSection';
import DisciplinesSection from './Create/DisciplinesSection';
import EssenceSection from './Create/EssenceSection';
import Tooltip from './Tooltip';

const CharacterForm = ({ onCharacterCreated, initialCharacter }) => {
    const { t, language } = useLocalization();
    const [character, setCharacter] = useState({
        name: '',
        player: '',
        chronicle: '',
        nature: '',
        demeanor: '',
        concept: '',
        clan: '', // Now a selection
        generation: 13,
        sire: '',
        attributes: {
            strength: 1, dexterity: 1, stamina: 1,
            charisma: 1, manipulation: 1, appearance: 1,
            perception: 1, intelligence: 1, wits: 1
        },
        abilities: {
            talents: {},
            skills: {},
            knowledges: {}
        },
        disciplines: [],
        willpower: 5,
        humanity: 7,
        health: 0,
        bloodPool: 10
    });

    useEffect(() => {
        if (initialCharacter) {
            setCharacter({
                ...initialCharacter,
                attributes: initialCharacter.attributes || {
                    strength: 1, dexterity: 1, stamina: 1,
                    charisma: 1, manipulation: 1, appearance: 1,
                    perception: 1, intelligence: 1, wits: 1
                },
                abilities: initialCharacter.abilities || {
                    talents: {},
                    skills: {},
                    knowledges: {}
                },
                disciplines: initialCharacter.disciplines || [],
                willpower: initialCharacter.willpower || 5,
                humanity: initialCharacter.humanity || 7,
                health: initialCharacter.health || 0,
                bloodPool: initialCharacter.bloodPool || 10
            });
        }
    }, [initialCharacter]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter(prev => ({ ...prev, [name]: value }));
    };

    const handleSimpleChange = (name, value) => {
        setCharacter(prev => ({ ...prev, [name]: value }));
    };

    const handleAttributeChange = (attr, value) => {
        setCharacter(prev => ({
            ...prev,
            attributes: { ...prev.attributes, [attr]: parseInt(value) }
        }));
    };

    const handleAbilityChange = (category, ability, value) => {
        setCharacter(prev => ({
            ...prev,
            abilities: {
                ...prev.abilities,
                [category]: {
                    ...prev.abilities[category],
                    [ability]: parseInt(value)
                }
            }
        }));
    };

    const handleDisciplineUpdate = (index, field, value) => {
        const newDisciplines = [...character.disciplines];
        newDisciplines[index] = { ...newDisciplines[index], [field]: value };
        setCharacter(prev => ({ ...prev, disciplines: newDisciplines }));
    };

    const addDiscipline = () => {
        setCharacter(prev => ({
            ...prev,
            disciplines: [...prev.disciplines, { name: '', level: 1 }]
        }));
    };

    const removeDiscipline = (index) => {
        const newDisciplines = character.disciplines.filter((_, i) => i !== index);
        setCharacter(prev => ({ ...prev, disciplines: newDisciplines }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const charToSave = { ...character, language };
            let savedChar;

            if (initialCharacter?.id) {
                savedChar = await characterService.update(initialCharacter.id, charToSave);
                alert(t('action.updated') || 'Character updated!');
            } else {
                savedChar = await characterService.create(charToSave);
                alert(t('action.created'));
            }

            onCharacterCreated(savedChar);
        } catch (error) {
            console.error('Error:', error);
            alert(t('action.error'));
        }
    };

    // Helper to get disciplines for selected Clan
    const getClanDisciplines = () => {
        const selectedClan = CLANS.find(c => c.name === character.clan);
        return selectedClan ? selectedClan.disciplines : [];
    };

    const allDisciplines = [...new Set([...DISCIPLINES, ...getClanDisciplines()])].sort();

    return (
        <div className="card" style={{ position: 'relative' }}>

            <br />
            <h1 style={{ textAlign: 'center', fontFamily: 'Cinzel', border: 'none', fontSize: '3rem' }}>{t('header.title')}</h1>
            <h3 style={{ textAlign: 'center', border: 'none', marginTop: '-1rem', letterSpacing: '8px' }}>{t('header.subtitle')}</h3>
            <br />

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '1rem' }}>
                    {/* Column 1: Identity */}
                    <div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.name')}>
                                <label>{t('label.name')}</label>
                                <input type="text" name="name" value={character.name || ''} onChange={handleChange} placeholder={t('placeholder.name')} required />
                            </Tooltip>
                        </div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.player')}>
                                <label>{t('label.player')}</label>
                                <input type="text" name="player" value={character.player || ''} onChange={handleChange} placeholder={t('placeholder.player')} />
                            </Tooltip>
                        </div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.chronicle')}>
                                <label>{t('label.chronicle')}</label>
                                <input type="text" name="chronicle" value={character.chronicle || ''} onChange={handleChange} placeholder={t('placeholder.chronicle')} />
                            </Tooltip>
                        </div>
                    </div>

                    {/* Column 2: Personality */}
                    <div>
                        <div className="form-group">
                            <Tooltip text={t(`tooltip.archetype_${(character.nature || '').toLowerCase().replace(/\s+/g, '_')}`) || t('tooltip.nature')}>
                                <label>{t('label.nature')}</label>
                                <select name="nature" value={character.nature || ''} onChange={handleChange}>
                                    <option value="">{t('placeholder.select_nature')}</option>
                                    {ARCHETYPES.map(arch => (
                                        <option key={arch} value={arch}>{t(`archetype.${(arch || '').toLowerCase().replace(/\s+/g, '_')}`)}</option>
                                    ))}
                                </select>
                            </Tooltip>
                        </div>
                        <div className="form-group">
                            <Tooltip text={t(`tooltip.archetype_${(character.demeanor || '').toLowerCase().replace(/\s+/g, '_')}`) || t('tooltip.demeanor')}>
                                <label>{t('label.demeanor')}</label>
                                <select name="demeanor" value={character.demeanor || ''} onChange={handleChange}>
                                    <option value="">{t('placeholder.select_demeanor')}</option>
                                    {ARCHETYPES.map(arch => (
                                        <option key={arch} value={arch}>{t(`archetype.${(arch || '').toLowerCase().replace(/\s+/g, '_')}`)}</option>
                                    ))}
                                </select>
                            </Tooltip>
                        </div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.concept')}>
                                <label>{t('label.concept')}</label>
                                <input type="text" name="concept" value={character.concept || ''} onChange={handleChange} placeholder={t('placeholder.concept')} />
                            </Tooltip>
                        </div>
                    </div>

                    {/* Column 3: Background */}
                    <div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.clan')}>
                                <label>{t('label.clan')}</label>
                                <select name="clan" value={character.clan || ''} onChange={handleChange} required>
                                    <option value="">{t('placeholder.select_clan')}</option>
                                    {CLANS.map(c => (
                                        <option key={c.name} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </Tooltip>
                        </div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.generation')}>
                                <label>{t('label.generation')}</label>
                                <input type="number" name="generation" value={character.generation || 13} onChange={handleChange} />
                            </Tooltip>
                        </div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.sire')}>
                                <label>{t('label.sire')}</label>
                                <input type="text" name="sire" value={character.sire || ''} onChange={handleChange} placeholder={t('placeholder.sire')} />
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

                <AttributesSection
                    attributes={character.attributes}
                    onChange={handleAttributeChange}
                    t={t}
                />

                <AbilitiesSection
                    abilities={character.abilities}
                    onChange={handleAbilityChange}
                    t={t}
                />

                <DisciplinesSection
                    disciplines={character.disciplines}
                    onUpdate={handleDisciplineUpdate}
                    onAdd={addDiscipline}
                    onRemove={removeDiscipline}
                    availableDisciplines={allDisciplines}
                    clanDisciplines={getClanDisciplines()}
                    t={t}
                />

                <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

                <EssenceSection
                    willpower={character.willpower}
                    humanity={character.humanity}
                    health={character.health}
                    bloodPool={character.bloodPool}
                    onChange={handleSimpleChange}
                    t={t}
                />

                <button type="submit" style={{ marginTop: '2rem', width: '100%' }}>
                    {initialCharacter ? (t('action.update') || 'Update') : t('action.embrace')}
                </button>
            </form>
        </div>
    );
};

export default CharacterForm;
