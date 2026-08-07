using System.Text.Json;
using Vamp.Api.Models;

namespace Vamp.Api.Services
{
    public class JsonStorageService
    {
        private readonly string _filePath;
        private readonly object _lock = new object();

        public JsonStorageService(string? overridePath = null)
        {
            _filePath = overridePath ?? Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "characters.json");
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
                    if (!File.Exists(_filePath))
                    {
                        return new CharacterStorage { NextId = 1, Characters = new List<Character>() };
                    }

                    var options = new JsonSerializerOptions 
                    { 
                        PropertyNameCaseInsensitive = true,
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase 
                    };
                    var json = File.ReadAllText(_filePath);
                    var result = JsonSerializer.Deserialize<CharacterStorage>(json, options);
                    return result ?? new CharacterStorage { NextId = 1, Characters = new List<Character>() };
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"Error reading characters.json: {ex.Message}");
                    // Preserve corrupt file as .bak for recovery before resetting
                    try
                    {
                        var bakPath = _filePath + ".corrupt." + DateTime.UtcNow.Ticks + ".bak";
                        if (File.Exists(_filePath))
                        {
                            File.Copy(_filePath, bakPath, overwrite: true);
                            Console.Error.WriteLine($"Corrupt storage file backed up to {bakPath}");
                        }
                    }
                    catch (Exception bakEx)
                    {
                        Console.Error.WriteLine($"Failed to backup corrupt file: {bakEx.Message}");
                    }

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
                    var tempPath = _filePath + ".tmp";
                    File.WriteAllText(tempPath, json);
                    File.Move(tempPath, _filePath, overwrite: true);
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
