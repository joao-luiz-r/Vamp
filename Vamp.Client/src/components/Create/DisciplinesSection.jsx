import React from 'react';
import Tooltip from '../Tooltip';
import DotsInput from '../DotsInput';

const DisciplinesSection = ({ disciplines, onUpdate, onAdd, onRemove, availableDisciplines, clanDisciplines, t }) => {
    return (
        <div className="form-group">
            <h3>{t('label.disciplines')}</h3>
            {disciplines.map((disc, index) => {
                const discKey = disc.name ? disc.name.toLowerCase() : null;
                const dotDescriptions = Array.from({ length: 5 }, (_, i) => discKey ? t(`dot.${discKey}.${i + 1}`) : t(`dot.discipline.${i + 1}`));

                return (
                    <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Tooltip text={disc.name ? t(`desc.${discKey}`) : t('tooltip.discipline_name')}>
                                <select
                                    value={disc.name}
                                    onChange={(e) => onUpdate(index, 'name', e.target.value)}
                                    aria-label="Discipline Name"
                                >
                                    <option value="">{t('placeholder.select_discipline')}</option>
                                    {availableDisciplines.map(d => (
                                        <option
                                            key={d}
                                            value={d}
                                            title={t(`desc.${d.toLowerCase()}`)}
                                            style={{ fontWeight: clanDisciplines.includes(d) ? 'bold' : 'normal' }}
                                        >
                                            {t(`discipline.${d.toLowerCase()}`) || d} {clanDisciplines.includes(d) ? '*' : ''}
                                        </option>
                                    ))}
                                </select>
                            </Tooltip>
                        </div>
                        <div style={{ minWidth: '100px', display: 'flex', justifyContent: 'flex-end' }}>
                            <DotsInput
                                value={disc.level}
                                onChange={(val) => onUpdate(index, 'level', parseInt(val))}
                                dotDescriptions={dotDescriptions}
                            />
                        </div>
                        <button type="button" onClick={() => onRemove(index)} style={{ padding: '0.5rem', background: '#500' }}>X</button>
                    </div>
                );
            })}
            <button type="button" onClick={onAdd} style={{ width: '100%', background: '#333' }}>{t('action.add_discipline')}</button>
        </div>
    );
};

export default DisciplinesSection;
