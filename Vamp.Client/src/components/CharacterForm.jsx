import React, { useState, useEffect } from 'react';
import { characterService } from '../services/characterService';
import { useLocalization } from '../context/LocalizationContext';
import { useToast } from '../context/ToastContext';
import { CLANS, DISCIPLINES, ARCHETYPES, CLAN_WEAKNESSES, CLAN_ATTRIBUTE_OVERRIDES, bloodPoolByGeneration } from '../constants/vtmRules';
import AttributesSection from './Create/AttributesSection';
import AbilitiesSection from './Create/AbilitiesSection';
import DisciplinesSection from './Create/DisciplinesSection';
import EssenceSection from './Create/EssenceSection';
import VirtuesBackgroundsSection from './Create/VirtuesBackgroundsSection';
import MeritsFlawsSection from './Create/MeritsFlawsSection';
import NotesSection from './Create/NotesSection';
import Tooltip from './Tooltip';

const CharacterForm = ({ onCharacterCreated, initialCharacter }) => {
    const { t, language } = useLocalization();
    const { showToast } = useToast() || {};
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
        virtues: { conscience: 3, selfControl: 3, courage: 3 },
        backgrounds: {},
        willpower: 5,
        humanity: 7,
        health: -1,
        bloodPool: 10,
        merits: [],
        flaws: [],
        otherTraits: [],
        weakness: '',
        possessions: '',
        history: '',
        prelude: ''
    });

    useEffect(() => {
        if (initialCharacter) {
            const override = CLAN_ATTRIBUTE_OVERRIDES[initialCharacter.clan];
            const baseAttributes = initialCharacter.attributes || {
                strength: 1, dexterity: 1, stamina: 1,
                charisma: 1, manipulation: 1, appearance: 1,
                perception: 1, intelligence: 1, wits: 1
            };
            const mergedAttributes = override
                ? { ...baseAttributes, [override.attribute]: override.value }
                : baseAttributes;

            setCharacter({
                ...initialCharacter,
                attributes: mergedAttributes,
                abilities: initialCharacter.abilities || {
                    talents: {},
                    skills: {},
                    knowledges: {}
                },
                disciplines: initialCharacter.disciplines || [],
                virtues: initialCharacter.virtues || { conscience: 3, selfControl: 3, courage: 3 },
                backgrounds: initialCharacter.backgrounds || {},
                willpower: (initialCharacter.willpower !== undefined && initialCharacter.willpower !== null) ? initialCharacter.willpower : 5,
                humanity: (initialCharacter.humanity !== undefined && initialCharacter.humanity !== null) ? initialCharacter.humanity : 7,
                health: (initialCharacter.health !== undefined && initialCharacter.health !== null) ? initialCharacter.health : -1,
                bloodPool: (initialCharacter.bloodPool !== undefined && initialCharacter.bloodPool !== null) ? initialCharacter.bloodPool : 10,
                merits: initialCharacter.merits || [],
                flaws: initialCharacter.flaws || [],
                otherTraits: initialCharacter.otherTraits || [],
                weakness: initialCharacter.weakness || '',
                possessions: initialCharacter.possessions || '',
                history: initialCharacter.history || '',
                prelude: initialCharacter.prelude || ''
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

    const handleGenerationChange = (e) => {
        const generation = parseInt(e.target.value) || 13;
        setCharacter(prev => ({
            ...prev,
            generation,
            bloodPool: bloodPoolByGeneration(generation)
        }));
    };

    const handleClanChange = (clan) => {
        setCharacter(prev => {
            const next = { ...prev, clan };
            const weaknessKey = CLAN_WEAKNESSES[clan];
            if (weaknessKey) {
                next.weakness = t(weaknessKey);
            }
            const override = CLAN_ATTRIBUTE_OVERRIDES[clan];
            if (override) {
                next.attributes = {
                    ...prev.attributes,
                    [override.attribute]: override.value
                };
            }
            const clanInfo = CLANS.find(c => c.name === clan);
            if (clanInfo && clanInfo.disciplines.length > 0) {
                next.disciplines = clanInfo.disciplines.map(name => ({ name, level: 0 }));
            } else {
                next.disciplines = [];
            }
            return next;
        });
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

    const handleVirtueChange = (virtue, value) => {
        const parsed = parseInt(value);
        setCharacter(prev => {
            const virtues = { ...prev.virtues, [virtue]: parsed };
            const next = { ...prev, virtues };
            if (virtue === 'courage') {
                next.willpower = parsed;
            }
            if (virtue === 'conscience' || virtue === 'selfControl') {
                next.humanity = Math.min(10, (virtues.conscience || 0) + (virtues.selfControl || 0));
            }
            return next;
        });
    };

    const handleBackgroundChange = (background, value) => {
        setCharacter(prev => ({
            ...prev,
            backgrounds: { ...prev.backgrounds, [background]: parseInt(value) }
        }));
    };

    const handleMeritFlawUpdate = (type, index, field, value) => {
        setCharacter(prev => ({
            ...prev,
            [type]: prev[type].map((item, i) => i === index
                ? { ...item, [field]: field === 'cost' ? parseInt(value) || 0 : value }
                : item)
        }));
    };

    const addMeritFlaw = (type) => {
        setCharacter(prev => ({
            ...prev,
            [type]: [...prev[type], { name: '', cost: 0 }]
        }));
    };

    const removeMeritFlaw = (type, index) => {
        setCharacter(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const charToSave = { ...character, language };
            let savedChar;

            if (initialCharacter?.id) {
                savedChar = await characterService.update(initialCharacter.id, charToSave);
                if (showToast) showToast(t('action.updated') || 'Character updated!', 'success');
            } else {
                savedChar = await characterService.create(charToSave);
                if (showToast) showToast(t('action.created') || 'Character created!', 'success');
            }

            onCharacterCreated(savedChar);
        } catch (error) {
            console.error('Error:', error);
            if (showToast) showToast(t('action.error') || 'An error occurred.', 'error');
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
                                <label htmlFor="char-name">{t('label.name')}</label>
                                <input id="char-name" type="text" name="name" value={character.name || ''} onChange={handleChange} placeholder={t('placeholder.name')} required />
                            </Tooltip>
                        </div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.player')}>
                                <label htmlFor="char-player">{t('label.player')}</label>
                                <input id="char-player" type="text" name="player" value={character.player || ''} onChange={handleChange} placeholder={t('placeholder.player')} />
                            </Tooltip>
                        </div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.chronicle')}>
                                <label htmlFor="char-chronicle">{t('label.chronicle')}</label>
                                <input id="char-chronicle" type="text" name="chronicle" value={character.chronicle || ''} onChange={handleChange} placeholder={t('placeholder.chronicle')} />
                            </Tooltip>
                        </div>
                    </div>

                    {/* Column 2: Personality */}
                    <div>
                        <div className="form-group">
                            <Tooltip text={t(`tooltip.archetype_${(character.nature || '').toLowerCase().replace(/\s+/g, '_')}`) || t('tooltip.nature')}>
                                <label htmlFor="char-nature">{t('label.nature')}</label>
                                <select id="char-nature" name="nature" value={character.nature || ''} onChange={handleChange}>
                                    <option value="">{t('placeholder.select_nature')}</option>
                                    {ARCHETYPES.map(arch => (
                                        <option key={arch} value={arch}>{t(`archetype.${(arch || '').toLowerCase().replace(/\s+/g, '_')}`)}</option>
                                    ))}
                                </select>
                            </Tooltip>
                        </div>
                        <div className="form-group">
                            <Tooltip text={t(`tooltip.archetype_${(character.demeanor || '').toLowerCase().replace(/\s+/g, '_')}`) || t('tooltip.demeanor')}>
                                <label htmlFor="char-demeanor">{t('label.demeanor')}</label>
                                <select id="char-demeanor" name="demeanor" value={character.demeanor || ''} onChange={handleChange}>
                                    <option value="">{t('placeholder.select_demeanor')}</option>
                                    {ARCHETYPES.map(arch => (
                                        <option key={arch} value={arch}>{t(`archetype.${(arch || '').toLowerCase().replace(/\s+/g, '_')}`)}</option>
                                    ))}
                                </select>
                            </Tooltip>
                        </div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.concept')}>
                                <label htmlFor="char-concept">{t('label.concept')}</label>
                                <input id="char-concept" type="text" name="concept" value={character.concept || ''} onChange={handleChange} placeholder={t('placeholder.concept')} />
                            </Tooltip>
                        </div>
                    </div>

                    {/* Column 3: Background */}
                    <div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.clan')}>
                                <label htmlFor="char-clan">{t('label.clan')}</label>
                                <select id="char-clan" name="clan" value={character.clan || ''} onChange={(e) => handleClanChange(e.target.value)} required>
                                    <option value="">{t('placeholder.select_clan')}</option>
                                    {CLANS.map(c => (
                                        <option key={c.name} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </Tooltip>
                            {character.clan && (
                                <div style={{
                                    marginTop: '8px',
                                    fontSize: '0.85rem',
                                    color: '#4a0404',
                                    padding: '8px',
                                    border: '1px dashed var(--accent-color)',
                                    backgroundColor: 'rgba(153, 0, 0, 0.05)',
                                    fontStyle: 'italic'
                                }}>
                                    {t(`tooltip.clan_${character.clan.toLowerCase()}`)}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.generation')}>
                                <label htmlFor="char-generation">{t('label.generation')}</label>
                                <input id="char-generation" type="number" name="generation" min={4} max={16} value={character.generation || 13} onChange={handleGenerationChange} />
                            </Tooltip>
                        </div>
                        <div className="form-group">
                            <Tooltip text={t('tooltip.sire')}>
                                <label htmlFor="char-sire">{t('label.sire')}</label>
                                <input id="char-sire" type="text" name="sire" value={character.sire || ''} onChange={handleChange} placeholder={t('placeholder.sire')} />
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

                <VirtuesBackgroundsSection
                    virtues={character.virtues}
                    backgrounds={character.backgrounds}
                    onVirtueChange={handleVirtueChange}
                    onBackgroundChange={handleBackgroundChange}
                    t={t}
                />

                <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

                <EssenceSection
                    willpower={character.willpower}
                    humanity={character.humanity}
                    health={character.health}
                    bloodPool={character.bloodPool}
                    generation={character.generation}
                    onChange={handleSimpleChange}
                    t={t}
                />

                <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

                <MeritsFlawsSection
                    merits={character.merits}
                    flaws={character.flaws}
                    onUpdate={handleMeritFlawUpdate}
                    onAdd={addMeritFlaw}
                    onRemove={removeMeritFlaw}
                    t={t}
                />

                <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

                <NotesSection
                    weakness={character.weakness}
                    history={character.history}
                    prelude={character.prelude}
                    onChange={handleSimpleChange}
                    t={t}
                />

                <button type="submit" style={{ marginTop: '2rem', width: '100%' }}>
                    {initialCharacter ? (t('action.update') || 'Update') : t('action.embrace')}
                </button>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
                    {t('sheet.points')}
                </p>
            </form>
        </div>
    );
};

export default CharacterForm;
