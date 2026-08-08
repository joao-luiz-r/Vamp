import React from 'react';
import AttributeInput from '../AttributeInput';
import AbilityInput from '../AbilityInput';
import { VIRTUES, BACKGROUNDS } from '../../constants/vtmRules';

const VirtuesBackgroundsSection = ({ virtues, backgrounds, onVirtueChange, onBackgroundChange, t }) => {
    return (
        <div className="attributes-grid">
            <div>
                <h3>{t('label.virtues')}</h3>
                {VIRTUES.map(virtue => (
                    <AttributeInput
                        key={virtue.key}
                        label={t(`virtue.${virtue.key}`)}
                        value={virtues?.[virtue.key] ?? 3}
                        onChange={(val) => onVirtueChange(virtue.key, val)}
                        description={t(`desc.${virtue.key}`)}
                        attributeName={virtue.key}
                    />
                ))}
            </div>

            <div>
                <h3>{t('label.backgrounds')}</h3>
                {BACKGROUNDS.map(background => {
                    const key = background.toLowerCase().replace(/\s+/g, '_');
                    return (
                        <AbilityInput
                            key={background}
                            category="backgrounds"
                            ability={t(`background.${key}`)}
                            value={backgrounds?.[background] || 0}
                            onChange={(val) => onBackgroundChange(background, val)}
                            description={t(`desc.${key}`)}
                            abilityName={key}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default VirtuesBackgroundsSection;
