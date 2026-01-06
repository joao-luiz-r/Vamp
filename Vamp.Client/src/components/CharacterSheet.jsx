import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

const CharacterSheet = ({ character, onEdit }) => {
    const { t } = useLocalization();

    if (!character) return null;

    const renderDots = (value, max = 5) => {
        const dots = [];
        for (let i = 0; i < max; i++) {
            dots.push(
                <div key={i} className={`dot ${i < value ? 'filled' : ''}`}></div>
            );
        }
        return <div className="dots-container">{dots}</div>;
    };

    const AttributeBlock = ({ labelKey, label, value, max = 5 }) => {
        const displayText = labelKey ? t(labelKey) : label;
        return (
            <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {displayText && <span style={{ fontSize: '0.9rem', fontVariant: 'small-caps' }}>{displayText}</span>}
                    {renderDots(value, max)}
                </div>
            </div>
        );
    };

    return (
        <div className="card" style={{ position: 'relative' }}>
            <button
                onClick={onEdit}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(139, 0, 0, 0.1)',
                    color: '#8b0000',
                    border: '1px solid #8b0000',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'Cinzel',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.background = '#8b0000';
                    e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 0, 0, 0.1)';
                    e.currentTarget.style.color = '#8b0000';
                }}
            >
                {t('action.edit') || 'EDIT'}
            </button>
            <br />
            <h1 style={{ textAlign: 'center', fontFamily: 'Cinzel', border: 'none', fontSize: '3rem' }}>{t('header.title')}</h1>
            <h3 style={{ textAlign: 'center', border: 'none', marginTop: '-1rem', letterSpacing: '8px' }}>{t('header.subtitle')}</h3>
            <br />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', borderBottom: '1px solid #444', paddingBottom: '1rem', marginBottom: '1rem' }}>
                {/* Identity Column */}
                <div>
                    <p><strong>{t('label.name')}:</strong> {character.name}</p>
                    <p><strong>{t('label.player')}:</strong> {character.player || '-'}</p>
                    <p><strong>{t('label.chronicle')}:</strong> {character.chronicle || '-'}</p>
                </div>
                {/* Personality Column */}
                <div>
                    <p><strong>{t('label.nature')}:</strong> {character.nature ? (t(`archetype.${(character.nature || '').toLowerCase().replace(/\s+/g, '_')}`) || character.nature) : '-'}</p>
                    <p><strong>{t('label.demeanor')}:</strong> {character.demeanor ? (t(`archetype.${(character.demeanor || '').toLowerCase().replace(/\s+/g, '_')}`) || character.demeanor) : '-'}</p>
                    <p><strong>{t('label.concept')}:</strong> {character.concept || '-'}</p>
                </div>
                {/* Background Column */}
                <div>
                    <p><strong>{t('label.clan')}:</strong> {character.clan || '-'}</p>
                    <p><strong>{t('label.generation')}:</strong> {character.generation || '-'}</p>
                    <p><strong>{t('label.sire')}:</strong> {character.sire || '-'}</p>
                </div>
            </div>

            <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

            <div className="attributes-grid">
                <div>
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.physical')}</h3>
                    <AttributeBlock labelKey="attr.strength" value={character.attributes?.strength || 1} />
                    <AttributeBlock labelKey="attr.dexterity" value={character.attributes?.dexterity || 1} />
                    <AttributeBlock labelKey="attr.stamina" value={character.attributes?.stamina || 1} />
                </div>
                <div>
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.social')}</h3>
                    <AttributeBlock labelKey="attr.charisma" value={character.attributes?.charisma || 1} />
                    <AttributeBlock labelKey="attr.manipulation" value={character.attributes?.manipulation || 1} />
                    <AttributeBlock labelKey="attr.appearance" value={character.attributes?.appearance || 1} />
                </div>
                <div>
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.mental')}</h3>
                    <AttributeBlock labelKey="attr.perception" value={character.attributes?.perception || 1} />
                    <AttributeBlock labelKey="attr.intelligence" value={character.attributes?.intelligence || 1} />
                    <AttributeBlock labelKey="attr.wits" value={character.attributes?.wits || 1} />
                </div>
            </div>

            <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

            <div className="attributes-grid">
                <div>
                    <h4 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.talents')}</h4>
                    {Object.entries(character.abilities?.talents || {}).map(([name, val]) => (
                        <AttributeBlock key={name} label={name} value={val} />
                    ))}
                </div>
                <div>
                    <h4 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.skills')}</h4>
                    {Object.entries(character.abilities?.skills || {}).map(([name, val]) => (
                        <AttributeBlock key={name} label={name} value={val} />
                    ))}
                </div>
                <div>
                    <h4 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.knowledges')}</h4>
                    {Object.entries(character.abilities?.knowledges || {}).map(([name, val]) => (
                        <AttributeBlock key={name} label={name} value={val} />
                    ))}
                </div>
            </div>

            <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

            <div className="attributes-grid">
                <div>
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.disciplines')}</h3>
                    {(character.disciplines || []).map((disc, i) => (
                        <AttributeBlock key={i} label={disc.name} value={disc.level} />
                    ))}
                </div>
                <div>
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>OUTROS</h3>
                </div>
                <div>
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>VANTAGENS</h3>
                </div>
            </div>

            <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.willpower')}</h3>
                        <AttributeBlock value={character.willpower ?? 5} max={10} />
                    </div>
                    <div>
                        <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.humanity')}</h3>
                        <AttributeBlock value={character.humanity ?? 7} max={10} />
                    </div>
                    <div>
                        <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.blood_pool')}</h3>
                        <AttributeBlock value={character.bloodPool ?? 10} max={10} />
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem', textAlign: 'center' }}>{t('label.health')}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {[-1, 0, 1, 2, 3, 4, 5, 6].map(level => (
                            <div key={level} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '5px 10px',
                                backgroundColor: (character.health ?? -1) === level ? 'rgba(139, 0, 0, 0.15)' : 'transparent',
                                border: '1px solid #444',
                                borderRadius: '4px'
                            }}>
                                <span style={{ fontSize: '0.9rem' }}>{t(`health.level.${level}`)}</span>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '1px solid #666',
                                    backgroundColor: level === (character.health ?? -1) ? '#8b0000' : 'transparent',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>
                                    {level === (character.health ?? -1) && 'X'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterSheet;
