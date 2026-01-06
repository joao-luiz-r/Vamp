import React from 'react';
import AbilityInput from '../AbilityInput';
import { STANDARD_ABILITIES } from '../../constants/vtmRules';

const AbilitiesSection = ({ abilities, onChange, t }) => {

    const renderColumn = (titleKey, category, abilityList) => (
        <div>
            <h4>{t(titleKey)}</h4>
            {abilityList.map(ability => {
                const key = ability.toLowerCase().replace(/\s+/g, '_');
                return (
                    <AbilityInput
                        key={ability}
                        category={category}
                        ability={t(`ability.${key}`)}
                        value={abilities[category]?.[ability] || 0}
                        onChange={(val) => onChange(category, ability, val)}
                        description={t(`desc.${key}`)}
                        abilityName={key}
                    />
                );
            })}
        </div>
    );

    return (
        <div>
            <h3>{t('label.abilities')}</h3>
            <div className="attributes-grid">
                {renderColumn('label.talents', 'talents', STANDARD_ABILITIES.talents)}
                {renderColumn('label.skills', 'skills', STANDARD_ABILITIES.skills)}
                {renderColumn('label.knowledges', 'knowledges', STANDARD_ABILITIES.knowledges)}
            </div>
        </div>
    );
};

export default AbilitiesSection;
