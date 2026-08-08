import React from 'react';
import Tooltip from '../Tooltip';

const MeritsFlawsSection = ({ merits, flaws, onUpdate, onAdd, onRemove, t }) => {
    const renderColumn = (type, key) => {
        const items = type === 'merits' ? merits : flaws;
        return (
            <div>
                <h4>{t(`label.${key}`)}</h4>
                {items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                        <input
                            type="text"
                            value={item.name || ''}
                            onChange={(e) => onUpdate(type, index, 'name', e.target.value)}
                            placeholder={t(`placeholder.${type}_name`)}
                            style={{ flex: 2 }}
                        />
                        <input
                            type="number"
                            value={item.cost ?? 0}
                            onChange={(e) => onUpdate(type, index, 'cost', e.target.value)}
                            placeholder={t(`placeholder.${type}_cost`)}
                            style={{ flex: 1 }}
                        />
                        <button type="button" onClick={() => onRemove(type, index)} style={{ padding: '0.3rem 0.6rem', background: '#500' }}>X</button>
                    </div>
                ))}
                <button type="button" onClick={() => onAdd(type)} style={{ width: '100%', background: '#333' }}>
                    {t(`action.add_${type === 'merits' ? 'merit' : 'flaw'}`)}
                </button>
            </div>
        );
    };

    return (
        <div className="form-group">
            <Tooltip text={t('desc.merits_flaws')}>
                <h3 style={{ cursor: 'help' }}>{t('label.merits_flaws')}</h3>
            </Tooltip>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {renderColumn('merits', 'merits')}
                {renderColumn('flaws', 'flaws')}
            </div>
        </div>
    );
};

export default MeritsFlawsSection;
