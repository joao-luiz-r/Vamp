import Tooltip from './Tooltip';
import DotsInput from './DotsInput';
import { useLocalization } from '../context/LocalizationContext';

const AbilityInput = ({ category, ability, value, onChange, description, abilityName, min = 0, max = 5 }) => {
    const { t } = useLocalization();
    const safeId = `ability-${category}-${ability.replace(/\s+/g, '-')}`;

    // Generate DOT tooltips for each level
    const dotDescriptions = abilityName
        ? Array.from({ length: max }, (_, i) => t(`dot.${abilityName}.${i + 1}`))
        : [];

    return (
        <div className="form-group" style={{ marginBottom: '0.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tooltip text={description || `Proficiency in ${ability}.`}>
                <label htmlFor={safeId} style={{ fontSize: '0.9rem', margin: 0, cursor: 'help', width: '120px' }}>
                    {ability}
                </label>
            </Tooltip>
            <DotsInput value={value || 0} onChange={onChange} max={max} dotDescriptions={dotDescriptions} />
        </div>
    );
};

export default AbilityInput;
