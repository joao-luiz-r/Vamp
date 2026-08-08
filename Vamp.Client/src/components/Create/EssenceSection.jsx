import React from 'react';
import AttributeInput from '../AttributeInput';
import Tooltip from '../Tooltip';
import { bloodPoolByGeneration } from '../../constants/vtmRules';

const EssenceSection = ({ willpower, humanity, health, bloodPool, generation, onChange, t }) => {
    const healthLevels = [-1, 0, 1, 2, 3, 4, 5, 6];
    const bloodPoolMax = bloodPoolByGeneration(generation);

    return (
        <div className="essence-section" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <AttributeInput
                    label={t('label.willpower')}
                    value={willpower}
                    onChange={(val) => onChange('willpower', val)}
                    description={t('desc.willpower')}
                    attributeName="willpower"
                    max={10}
                />

                <AttributeInput
                    label={t('label.humanity')}
                    value={humanity}
                    onChange={(val) => onChange('humanity', val)}
                    description={t('desc.humanity')}
                    attributeName="humanity"
                    max={10}
                />

                <div className="form-group">
                    <Tooltip text={t('desc.blood_pool')}>
                        <label style={{ cursor: 'help' }}>{t('label.blood_pool')}</label>
                    </Tooltip>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontVariant: 'small-caps', fontWeight: 'bold', fontSize: '0.85rem' }}>
                            {t('label.current')}:
                        </span>
                        <input
                            type="number"
                            min={0}
                            max={bloodPoolMax}
                            value={bloodPool ?? 0}
                            onChange={(e) => onChange('bloodPool', parseInt(e.target.value) || 0)}
                            aria-label={t('label.blood_pool')}
                            style={{ maxWidth: '80px' }}
                        />
                        <span style={{ fontVariant: 'small-caps', fontWeight: 'bold', fontSize: '0.85rem' }}>
                            {t('label.max')}: {bloodPoolMax}
                        </span>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 style={{ marginTop: 0, textAlign: 'center' }}>{t('label.health')}</h3>
                <Tooltip text={t('desc.health')}>
                    <div className="health-track" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {healthLevels.map((level) => (
                            <div
                                key={level}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '5px 10px',
                                    backgroundColor: health === level ? 'rgba(139, 0, 0, 0.2)' : 'transparent',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => onChange('health', level)}
                            >
                                <span style={{ fontSize: '0.9rem' }}>{t(`health.level.${level}`)}</span>
                                <div style={{
                                    width: '15px',
                                    height: '15px',
                                    border: '1px solid #333',
                                    backgroundColor: level === health ? '#8b0000' : 'transparent',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    fontSize: '10px'
                                }}>
                                    {level === health && 'X'}
                                </div>
                            </div>
                        ))}
                    </div>
                </Tooltip>
            </div>
        </div>
    );
};

export default EssenceSection;
