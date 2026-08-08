import React from 'react';
import { useLocalization } from '../context/LocalizationContext';
import Tooltip from './Tooltip';
import DotsInput from './DotsInput';
import { bloodPoolByGeneration } from '../constants/vtmRules';

const AttributeBlock = ({ labelKey, label, value, max = 5, attributeName }) => {
    const { t } = useLocalization();
    const displayText = labelKey ? t(labelKey) : label;
    const description = labelKey ? t(`desc.${labelKey.split('.')[1]}`) : (t(`desc.${label.toLowerCase().replace(/\s+/g, '_')}`) || '');

    // Generate DOT tooltips for each level
    const dotDescriptions = attributeName
        ? Array.from({ length: max }, (_, i) => t(`dot.${attributeName}.${i + 1}`))
        : (label ? Array.from({ length: max }, (_, i) => t(`dot.${label.toLowerCase().replace(/\s+/g, '_')}.${i + 1}`)) : []);

    return (
        <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tooltip text={description}>
                    <span style={{ fontSize: '0.9rem', fontVariant: 'small-caps', cursor: 'help' }}>
                        {displayText}
                    </span>
                </Tooltip>
                <DotsInput value={value} max={max} onChange={() => { }} dotDescriptions={dotDescriptions} />
            </div>
        </div>
    );
};

const CharacterSheet = ({ character, onEdit, onDelete }) => {
    const { t } = useLocalization();

    if (!character) return null;

    return (
        <div className="card" style={{ position: 'relative' }}>
            <div className="sheet-actions" style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                display: 'flex',
                gap: '8px',
                zIndex: 10
            }}>
                <button
                    onClick={() => window.print()}
                    title={t('action.export_pdf')}
                    style={{
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
                    {t('action.export_pdf') || 'Export PDF'}
                </button>

                <button
                    onClick={onEdit}
                    style={{
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

                {onDelete && (
                    <button
                        onClick={onDelete}
                        style={{
                            background: 'rgba(75, 0, 0, 0.2)',
                            color: '#e63946',
                            border: '1px solid #700',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontFamily: 'Cinzel',
                            fontWeight: 'bold',
                            fontSize: '0.8rem',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = '#a00000';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(75, 0, 0, 0.2)';
                            e.currentTarget.style.color = '#e63946';
                        }}
                    >
                        {t('action.delete') || 'DELETE'}
                    </button>
                )}
            </div>
            <br />
            <h1 style={{ textAlign: 'center', fontFamily: 'Cinzel', border: 'none', fontSize: '3rem' }}>{t('header.title')}</h1>
            <h3 style={{ textAlign: 'center', border: 'none', marginTop: '-1rem', letterSpacing: '8px' }}>{t('header.subtitle')}</h3>
            <br />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', borderBottom: '1px solid #444', paddingBottom: '1rem', marginBottom: '1rem' }}>
                {/* Identity Column */}
                <div>
                    <Tooltip text={t('tooltip.name')}>
                        <p style={{ cursor: 'help' }}><strong>{t('label.name')}:</strong> {character.name}</p>
                    </Tooltip>
                    <Tooltip text={t('tooltip.player')}>
                        <p style={{ cursor: 'help' }}><strong>{t('label.player')}:</strong> {character.player || '-'}</p>
                    </Tooltip>
                    <Tooltip text={t('tooltip.chronicle')}>
                        <p style={{ cursor: 'help' }}><strong>{t('label.chronicle')}:</strong> {character.chronicle || '-'}</p>
                    </Tooltip>
                </div>
                {/* Personality Column */}
                <div>
                    <Tooltip text={t(`tooltip.archetype_${(character.nature || '').toLowerCase().replace(/\s+/g, '_')}`) || t('tooltip.nature')}>
                        <p style={{ cursor: 'help' }}><strong>{t('label.nature')}:</strong> {character.nature ? (t(`archetype.${(character.nature || '').toLowerCase().replace(/\s+/g, '_')}`) || character.nature) : '-'}</p>
                    </Tooltip>
                    <Tooltip text={t(`tooltip.archetype_${(character.demeanor || '').toLowerCase().replace(/\s+/g, '_')}`) || t('tooltip.demeanor')}>
                        <p style={{ cursor: 'help' }}><strong>{t('label.demeanor')}:</strong> {character.demeanor ? (t(`archetype.${(character.demeanor || '').toLowerCase().replace(/\s+/g, '_')}`) || character.demeanor) : '-'}</p>
                    </Tooltip>
                    <Tooltip text={t('tooltip.concept')}>
                        <p style={{ cursor: 'help' }}><strong>{t('label.concept')}:</strong> {character.concept || '-'}</p>
                    </Tooltip>
                </div>
                {/* Background Column */}
                <div>
                    <Tooltip text={t(`tooltip.clan_${(character.clan || '').toLowerCase()}`) || t('tooltip.clan')}>
                        <p style={{ cursor: 'help' }}><strong>{t('label.clan')}:</strong> {character.clan || '-'}</p>
                    </Tooltip>
                    <Tooltip text={t('tooltip.generation')}>
                        <p style={{ cursor: 'help' }}><strong>{t('label.generation')}:</strong> {character.generation || '-'}</p>
                    </Tooltip>
                    <Tooltip text={t('tooltip.sire')}>
                        <p style={{ cursor: 'help' }}><strong>{t('label.sire')}:</strong> {character.sire || '-'}</p>
                    </Tooltip>
                </div>
            </div>

            <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

            <div className="attributes-grid">
                <div>
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.physical')}</h3>
                    <AttributeBlock labelKey="attr.strength" value={character.attributes?.strength || 1} attributeName="strength" />
                    <AttributeBlock labelKey="attr.dexterity" value={character.attributes?.dexterity || 1} attributeName="dexterity" />
                    <AttributeBlock labelKey="attr.stamina" value={character.attributes?.stamina || 1} attributeName="stamina" />
                </div>
                <div>
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.social')}</h3>
                    <AttributeBlock labelKey="attr.charisma" value={character.attributes?.charisma || 1} attributeName="charisma" />
                    <AttributeBlock labelKey="attr.manipulation" value={character.attributes?.manipulation || 1} attributeName="manipulation" />
                    <AttributeBlock labelKey="attr.appearance" value={character.attributes?.appearance || 1} attributeName="appearance" />
                </div>
                <div>
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.mental')}</h3>
                    <AttributeBlock labelKey="attr.perception" value={character.attributes?.perception || 1} attributeName="perception" />
                    <AttributeBlock labelKey="attr.intelligence" value={character.attributes?.intelligence || 1} attributeName="intelligence" />
                    <AttributeBlock labelKey="attr.wits" value={character.attributes?.wits || 1} attributeName="wits" />
                </div>
            </div>

            <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

            <div className="attributes-grid">
                <div>
                    <h4 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.talents')}</h4>
                    {Object.entries(character.abilities?.talents || {}).map(([name, val]) => (
                        <AttributeBlock key={name} labelKey={`ability.${name.toLowerCase().replace(/\s+/g, '_')}`} label={name} value={val} />
                    ))}
                </div>
                <div>
                    <h4 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.skills')}</h4>
                    {Object.entries(character.abilities?.skills || {}).map(([name, val]) => (
                        <AttributeBlock key={name} labelKey={`ability.${name.toLowerCase().replace(/\s+/g, '_')}`} label={name} value={val} />
                    ))}
                </div>
                <div>
                    <h4 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.knowledges')}</h4>
                    {Object.entries(character.abilities?.knowledges || {}).map(([name, val]) => (
                        <AttributeBlock key={name} labelKey={`ability.${name.toLowerCase().replace(/\s+/g, '_')}`} label={name} value={val} />
                    ))}
                </div>
            </div>

            <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

            <div className="attributes-grid">
                <div>
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.disciplines')}</h3>
                    {(character.disciplines || []).map((disc, i) => (
                        <AttributeBlock
                            key={i}
                            labelKey={`discipline.${(disc.name || '').toLowerCase()}`}
                            label={disc.name}
                            value={disc.level}
                            attributeName={(disc.name || '').toLowerCase()}
                        />
                    ))}
                </div>
                <div>
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.virtues')}</h3>
                    <AttributeBlock labelKey="virtue.conscience" value={character.virtues?.conscience ?? 3} max={5} attributeName="conscience" />
                    <AttributeBlock labelKey="virtue.selfControl" value={character.virtues?.selfControl ?? 3} max={5} attributeName="selfControl" />
                    <AttributeBlock labelKey="virtue.courage" value={character.virtues?.courage ?? 3} max={5} attributeName="courage" />
                </div>
                <div>
                    <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.backgrounds')}</h3>
                    {Object.entries(character.backgrounds || {}).map(([name, val]) => (
                        <AttributeBlock key={name} label={t(`background.${name.toLowerCase().replace(/\s+/g, '_')}`) || name} value={val} />
                    ))}
                </div>
            </div>

            <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.willpower')}</h3>
                        <AttributeBlock labelKey="label.willpower" value={character.willpower ?? 5} max={10} attributeName="willpower" />
                    </div>
                    <div>
                        <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.humanity')}</h3>
                        <AttributeBlock labelKey="label.humanity" value={character.humanity ?? 7} max={10} attributeName="humanity" />
                    </div>
                    <div>
                        <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem' }}>{t('label.blood_pool')}</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>
                            <span><strong>{t('label.current')}:</strong> {character.bloodPool ?? 0}</span>
                            <span><strong>{t('label.max')}:</strong> {bloodPoolByGeneration(character.generation ?? 13)}</span>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <Tooltip text={t('desc.health')}>
                        <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem', textAlign: 'center', cursor: 'help' }}>{t('label.health')}</h3>
                    </Tooltip>
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

            <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

            <div className="attributes-grid">
                <div>
                    <Tooltip text={t('desc.merits_flaws')}>
                        <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem', cursor: 'help' }}>{t('label.merits')}</h3>
                    </Tooltip>
                    {(character.merits || []).map((m, i) => (
                        <p key={i} style={{ margin: '0.25rem 0' }}>
                            {m.name || '-'}{m.cost ? ` (${m.cost} ${t('label.pts')})` : ''}
                        </p>
                    ))}
                    {(!character.merits || character.merits.length === 0) && <p style={{ color: '#888', fontStyle: 'italic' }}>—</p>}
                </div>
                <div>
                    <Tooltip text={t('desc.merits_flaws')}>
                        <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem', cursor: 'help' }}>{t('label.flaws')}</h3>
                    </Tooltip>
                    {(character.flaws || []).map((f, i) => (
                        <p key={i} style={{ margin: '0.25rem 0' }}>
                            {f.name || '-'}{f.cost ? ` (${f.cost} ${t('label.pts')})` : ''}
                        </p>
                    ))}
                    {(!character.flaws || character.flaws.length === 0) && <p style={{ color: '#888', fontStyle: 'italic' }}>—</p>}
                </div>
            </div>

            <hr style={{ border: '2px solid #000', margin: '2rem 0' }} />

            <div className="attributes-grid">
                <div>
                    <Tooltip text={t('desc.weakness')}>
                        <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem', cursor: 'help' }}>{t('label.weakness')}</h3>
                    </Tooltip>
                    <p style={{ margin: 0, fontStyle: 'italic' }}>{character.weakness || '-'}</p>
                </div>
            </div>

            {(character.history || character.prelude) && (
                <>
                    <div style={{ marginTop: '2rem' }}>
                        <Tooltip text={t('desc.prelude')}>
                            <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem', cursor: 'help' }}>{t('label.prelude')}</h3>
                        </Tooltip>
                        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{character.prelude || '-'}</p>
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <Tooltip text={t('desc.history')}>
                            <h3 style={{ fontFamily: 'Cinzel', borderBottom: '1px solid #444', marginBottom: '1rem', cursor: 'help' }}>{t('label.history')}</h3>
                        </Tooltip>
                        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{character.history || '-'}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default CharacterSheet;
