import Tooltip from './Tooltip';
import DotsInput from './DotsInput';
import { useLocalization } from '../context/LocalizationContext';

const AttributeInput = ({ label, value, onChange, description, attributeName, min = 1, max = 5 }) => {
    const { t } = useLocalization();
    const id = `attr-${label.toLowerCase()}`;

    // Generate DOT tooltips for each level up to max
    const dotDescriptions = attributeName
        ? Array.from({ length: max }, (_, i) => t(`dot.${attributeName}.${i + 1}`))
        : [];

    return (
        <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tooltip text={description || `The ${label} of the Kindred.`}>
                <label htmlFor={id} style={{ margin: 0, cursor: 'help', width: '100px' }}>
                    {label}
                </label>
            </Tooltip>
            <DotsInput value={value} onChange={onChange} max={max} dotDescriptions={dotDescriptions} />
        </div>
    );
};

export default AttributeInput;
