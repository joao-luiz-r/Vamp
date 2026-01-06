using System.Text.Json;
using Vamp.Api.Models;

namespace Vamp.Api.Services
{
    public class JsonStorageService
    {
        private readonly string _filePath;
        private readonly object _lock = new object();

        public JsonStorageService(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "characters.json");
            EnsureFileExists();
        }

        private void EnsureFileExists()
        {
            if (!File.Exists(_filePath))
            {
                var initialData = new CharacterStorage
                {
                    NextId = 1,
                    Characters = new List<Character>()
                };
                WriteStorage(initialData);
            }
        }

        public CharacterStorage ReadStorage()
        {
            lock (_lock)
            {
                try
                {
                    var options = new JsonSerializerOptions 
                    { 
                        PropertyNameCaseInsensitive = true,
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase 
                    };
                    var json = File.ReadAllText(_filePath);
                    return JsonSerializer.Deserialize<CharacterStorage>(json, options) 
                        ?? new CharacterStorage { NextId = 1, Characters = new List<Character>() };
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"Error reading characters.json: {ex.Message}");
                    return new CharacterStorage { NextId = 1, Characters = new List<Character>() };
                }
            }
        }

        public void WriteStorage(CharacterStorage storage)
        {
            lock (_lock)
            {
                try
                {
                    var options = new JsonSerializerOptions 
                    { 
                        WriteIndented = true,
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase 
                    };
                    var json = JsonSerializer.Serialize(storage, options);
                    File.WriteAllText(_filePath, json);
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"Error writing characters.json: {ex.Message}");
                    throw;
                }
            }
        }

        public class CharacterStorage
        {
            public int NextId { get; set; }
            public List<Character> Characters { get; set; } = new List<Character>();
        }
    }
}
