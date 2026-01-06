import React from 'react';
import AttributeInput from '../AttributeInput';

const AttributesSection = ({ attributes, onChange, t }) => {
    const renderColumn = (titleKey, attrs) => (
        <div>
            <h4>{t(titleKey)}</h4>
            {attrs.map(attr => (
                <AttributeInput
                    key={attr}
                    label={t(`attr.${attr.toLowerCase()}`)}
                    value={attributes[attr.toLowerCase()]}
                    onChange={(val) => onChange(attr.toLowerCase(), val)}
                    description={t(`desc.${attr.toLowerCase()}`)}
                    attributeName={attr.toLowerCase()}
                />
            ))}
        </div>
    );

    return (
        <div>
            <h3>{t('label.attributes')}</h3>
            <div className="attributes-grid">
                {renderColumn('label.physical', ['Strength', 'Dexterity', 'Stamina'])}
                {renderColumn('label.social', ['Charisma', 'Manipulation', 'Appearance'])}
                {renderColumn('label.mental', ['Perception', 'Intelligence', 'Wits'])}
            </div>
        </div>
    );
};

export default AttributesSection;
