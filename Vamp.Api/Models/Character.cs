using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Vamp.Api.Models
{
    public class Character
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Character name is required.")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string Name { get; set; } = string.Empty;

        public string Player { get; set; } = string.Empty;
        public string Chronicle { get; set; } = string.Empty;
        public string Language { get; set; } = "En-Us";
        
        // Essence
        public string Nature { get; set; } = string.Empty;
        public string Demeanor { get; set; } = string.Empty;
        public string Concept { get; set; } = string.Empty;
        
        // Clan info
        public string Clan { get; set; } = string.Empty;

        [Range(4, 16, ErrorMessage = "Generation must be between 4 and 16.")]
        public int Generation { get; set; } = 13;

        public string Sire { get; set; } = string.Empty;

        public Attributes Attributes { get; set; } = new Attributes();
        public Abilities Abilities { get; set; } = new Abilities();
        public List<Discipline> Disciplines { get; set; } = new List<Discipline>();
        public Virtues Virtues { get; set; } = new Virtues();
        public Dictionary<string, int> Backgrounds { get; set; } = new Dictionary<string, int>();

        // New Essence fields
        [Range(0, 10, ErrorMessage = "Willpower must be between 0 and 10.")]
        public int Willpower { get; set; } = 5;

        [Range(0, 10, ErrorMessage = "Humanity must be between 0 and 10.")]
        public int Humanity { get; set; } = 7;

        [Range(-1, 6, ErrorMessage = "Health level must be between -1 and 6.")]
        public int Health { get; set; } = -1; // -1 means OK (No damage)

        [Range(0, 50, ErrorMessage = "Blood pool must be between 0 and 50.")]
        public int BloodPool { get; set; } = 10;

        // Morality Path (V20) - Humanity is the default; other Paths may be chosen
        public string Path { get; set; } = "Humanity";

        // Experience Points (V20)
        [Range(0, 10000, ErrorMessage = "Experience must be between 0 and 10000.")]
        public int Experience { get; set; } = 0;

        // Merits & Flaws (V20)
        public List<MeritFlaw> Merits { get; set; } = new List<MeritFlaw>();
        public List<MeritFlaw> Flaws { get; set; } = new List<MeritFlaw>();

        // Other Traits (V20) - free-form traits with a rating
        public List<OtherTrait> OtherTraits { get; set; } = new List<OtherTrait>();

        // Narrative / sheet extras
        public string Weakness { get; set; } = string.Empty;
        public string Possessions { get; set; } = string.Empty;
        public string History { get; set; } = string.Empty;
        public string Prelude { get; set; } = string.Empty;
    }

    public class MeritFlaw
    {
        public string Name { get; set; } = string.Empty;
        public int Cost { get; set; } = 0;
    }

    public class OtherTrait
    {
        public string Name { get; set; } = string.Empty;
        public int Value { get; set; } = 0;
    }

    public class Virtues
    {
        [Range(0, 5, ErrorMessage = "Conscience must be between 0 and 5.")]
        public int Conscience { get; set; } = 3;

        [Range(0, 5, ErrorMessage = "Self-Control must be between 0 and 5.")]
        public int SelfControl { get; set; } = 3;

        [Range(0, 5, ErrorMessage = "Courage must be between 0 and 5.")]
        public int Courage { get; set; } = 3;
    }

    public class Attributes
    {
        public int Strength { get; set; } = 1;
        public int Dexterity { get; set; } = 1;
        public int Stamina { get; set; } = 1;

        public int Charisma { get; set; } = 1;
        public int Manipulation { get; set; } = 1;
        public int Appearance { get; set; } = 1;

        public int Perception { get; set; } = 1;
        public int Intelligence { get; set; } = 1;
        public int Wits { get; set; } = 1;
    }

    public class Abilities
    {
        public Dictionary<string, int> Talents { get; set; } = new Dictionary<string, int>();
        public Dictionary<string, int> Skills { get; set; } = new Dictionary<string, int>();
        public Dictionary<string, int> Knowledges { get; set; } = new Dictionary<string, int>();
    }

    public class Discipline
    {
        public string Name { get; set; } = string.Empty;
        public int Level { get; set; } = 1;
    }
}
