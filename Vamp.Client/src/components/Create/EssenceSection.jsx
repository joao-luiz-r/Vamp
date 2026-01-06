import React from 'react';
import AttributeInput from '../AttributeInput';
import Tooltip from '../Tooltip';

const EssenceSection = ({ willpower, humanity, health, bloodPool, onChange, t }) => {
    const healthLevels = [0, 1, 2, 3, 4, 5, 6];

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

                <AttributeInput
                    label={t('label.blood_pool')}
                    value={bloodPool}
                    onChange={(val) => onChange('bloodPool', val)}
                    description={t('desc.blood_pool')}
                    attributeName="blood_pool"
                    max={10}
                />
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
                                    backgroundColor: level <= health ? '#8b0000' : 'transparent',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    fontSize: '10px'
                                }}>
                                    {level <= health && 'X'}
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
