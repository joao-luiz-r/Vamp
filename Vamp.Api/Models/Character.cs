using System.Collections.Generic;

namespace Vamp.Api.Models
{
    public class Character
    {
        public int Id { get; set; }
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
        public int Generation { get; set; } = 13;
        public string Sire { get; set; } = string.Empty;

        public Attributes Attributes { get; set; } = new Attributes();
        public Abilities Abilities { get; set; } = new Abilities();
        public List<Discipline> Disciplines { get; set; } = new List<Discipline>();

        // New Essence fields
        public int Willpower { get; set; } = 5;
        public int Humanity { get; set; } = 7;
        public int Health { get; set; } = 0; // 0 means no damage (Bruised)
        public int BloodPool { get; set; } = 10;
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
