import React, { useState, useEffect } from 'react';
import CharacterForm from './components/CharacterForm';
import CharacterSheet from './components/CharacterSheet';
import { characterService } from './services/characterService';
import VampireLogo from './components/VampireLogo';
import { useLocalization } from './context/LocalizationContext';
import { useToast } from './context/ToastContext';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useLocalization();
  const { showToast } = useToast() || {};

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const data = await characterService.getAll();
      setCharacters(data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleCharacterCreated = (newCharacter) => {
    setCharacters([...characters, newCharacter]);
    setSelectedCharacter(newCharacter);
    setIsEditing(false);
  };

  const handleCharacterUpdated = async (updatedCharacter) => {
    await fetchCharacters();
    setSelectedCharacter(updatedCharacter);
    setIsEditing(false);
  };

  const handleDeleteCharacter = async () => {
    if (!selectedCharacter) return;
    const confirmMessage = t('action.confirm_delete') || 'Are you sure you want to delete this Kindred?';
    if (window.confirm(confirmMessage)) {
      try {
        await characterService.delete(selectedCharacter.id);
        const updatedList = characters.filter(c => c.id !== selectedCharacter.id);
        setCharacters(updatedList);
        setSelectedCharacter(null);
        setIsEditing(false);
        if (showToast) showToast(t('action.deleted') || 'Character deleted.', 'error');
      } catch (err) {
        console.error('Error deleting character:', err);
        if (showToast) showToast(t('action.error') || 'Error deleting character.', 'error');
      }
    }
  };

  const handleEditCharacter = () => {
    setIsEditing(true);
  };

  const handleSelectCharacter = (id) => {
    const char = characters.find(c => c.id === id);
    setSelectedCharacter(char || null);
    setIsEditing(false);
  };

  const handleNewCharacter = () => {
    setSelectedCharacter(null);
    setIsEditing(false);
  };

  return (
    <div className="app-container">
      {/* Fixed Header */}
      <header className="fixed-header">
        <div className="logo-container">
          <VampireLogo />
        </div>

        <div className="title-container">
          <h1 style={{
            fontFamily: 'Cinzel',
            fontSize: '1.8rem',
            margin: 0,
            color: '#4a0404',
            textShadow: `
              0 0 15px rgba(139, 0, 0, 0.7),
              0 0 30px rgba(139, 0, 0, 0.4),
              1px 1px 2px rgba(0, 0, 0, 0.3)
            `,
            letterSpacing: '4px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #4a0404, #8b0000, #4a0404)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Vampire Archives
          </h1>
        </div>

        <div className="controls-container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="selection-group" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(0,0,0,0.4)',
            padding: '4px 12px',
            borderRadius: '8px',
            border: '1px solid #444',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
          }}>
            <span style={{ fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>
              {t('header.archives')}
            </span>
            <select
              value={selectedCharacter?.id || ''}
              onChange={(e) => {
                const id = parseInt(e.target.value);
                handleSelectCharacter(id);
              }}
              style={{
                padding: '6px',
                borderRadius: '4px',
                background: 'transparent',
                color: '#ddd',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                minWidth: '160px',
                fontFamily: 'inherit'
              }}
            >
              <option value="" style={{ background: '#1a1a1a' }}>
                {characters.length > 0 ? t('placeholder.select_character') : (t('label.empty') || '-- Empty --')}
              </option>
              {characters.map(char => (
                <option key={char.id} value={char.id} style={{ background: '#1a1a1a' }}>
                  {char.name || 'Unnamed'}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleNewCharacter}
            className="btn-new"
            style={{
              background: 'linear-gradient(135deg, #4a0000 0%, #2a0000 100%)',
              color: '#fff',
              border: '1px solid #700',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(139,0,0,0.3)';
              e.currentTarget.style.border = '1px solid #a00';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.4)';
              e.currentTarget.style.border = '1px solid #700';
            }}
          >
            <span style={{ fontSize: '1.1rem', lineHeight: 0, marginTop: '-2px' }}>+</span>
            {t('action.new')}
          </button>

          <div style={{ height: '24px', width: '1px', background: 'linear-gradient(to bottom, transparent, #444, transparent)', margin: '0 0.5rem' }}></div>

          <LanguageSwitcher />
        </div>
      </header>

      {/* Content Area with Top Padding for Header */}
      <div className="main-content">
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          {selectedCharacter ? (
            isEditing ? (
              <CharacterForm
                onCharacterCreated={handleCharacterUpdated}
                initialCharacter={selectedCharacter}
              />
            ) : (
              <CharacterSheet
                character={selectedCharacter}
                onEdit={handleEditCharacter}
                onDelete={handleDeleteCharacter}
              />
            )
          ) : (
            <CharacterForm onCharacterCreated={handleCharacterCreated} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
