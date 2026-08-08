import React from 'react';
import Tooltip from '../Tooltip';

const textareaStyle = {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--border-color)',
    color: '#000',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    borderRadius: '2px',
    resize: 'vertical',
    minHeight: '60px'
};

const NotesSection = ({ weakness, history, prelude, onChange, t }) => {
    return (
        <div>
            <div>
                <Tooltip text={t('desc.weakness')}>
                    <label htmlFor="char-weakness" style={{ cursor: 'help' }}>{t('label.weakness')}</label>
                </Tooltip>
                <input
                    id="char-weakness"
                    type="text"
                    value={weakness || ''}
                    onChange={(e) => onChange('weakness', e.target.value)}
                    placeholder={t('placeholder.weakness')}
                    readOnly
                    title={t('tooltip.weakness_auto')}
                    style={{ color: '#8b0000', fontStyle: 'italic' }}
                />
            </div>

            <div style={{ marginTop: '2rem' }}>
                <Tooltip text={t('desc.prelude')}>
                    <h3 style={{ cursor: 'help' }}>{t('label.prelude')}</h3>
                </Tooltip>
                <textarea
                    value={prelude || ''}
                    onChange={(e) => onChange('prelude', e.target.value)}
                    placeholder={t('placeholder.prelude')}
                    style={textareaStyle}
                />
            </div>

            <div style={{ marginTop: '2rem' }}>
                <Tooltip text={t('desc.history')}>
                    <h3 style={{ cursor: 'help' }}>{t('label.history')}</h3>
                </Tooltip>
                <textarea
                    value={history || ''}
                    onChange={(e) => onChange('history', e.target.value)}
                    placeholder={t('placeholder.history')}
                    style={{ ...textareaStyle, minHeight: '90px' }}
                />
            </div>
        </div>
    );
};

export default NotesSection;
