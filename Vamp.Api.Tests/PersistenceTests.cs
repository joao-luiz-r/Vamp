using System;
using System.Text.Json;
using Xunit;
using Vamp.Api.Services;
using Vamp.Api.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Moq;

namespace Vamp.Api.Tests
{
    public class PersistenceTests : IDisposable
    {
        private readonly string _testRootPath;
        private readonly string _jsonFilePath;
        private readonly JsonStorageService _service;

        public PersistenceTests()
        {
            // Criar um diretório temporário real para o teste
            _testRootPath = Path.Combine(Path.GetTempPath(), "VampRealTests_" + Guid.NewGuid().ToString());
            Directory.CreateDirectory(_testRootPath);
            _jsonFilePath = Path.Combine(_testRootPath, "characters.json");

            // Ainda precisamos passar o ambiente para o serviço, mas agora ele apontará para uma pasta real
            var mockEnv = new Mock<IWebHostEnvironment>();
            mockEnv.Setup(m => m.ContentRootPath).Returns(_testRootPath);
            
            _service = new JsonStorageService(mockEnv.Object);
        }

        [Fact]
        public void CharacterPersistence_ShouldSaveAndReadRealJsonFile()
        {
            // Arrange
            var character = new Character
            {
                Name = "Integration Test Vampire",
                Willpower = 9,
                Humanity = 3,
                Health = 2, // Wounded
                BloodPool = 15,
                Attributes = new Attributes { Strength = 5 },
                Clan = "Gangrel"
            };
            
            var storage = new JsonStorageService.CharacterStorage();
            storage.Characters.Add(character);
            storage.NextId = 10;

            // Act
            var options = new JsonSerializerOptions 
            { 
                WriteIndented = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase 
            };
            _service.WriteStorage(storage);

            // Assert - Verificar se o arquivo foi criado fisicamente
            Assert.True(File.Exists(_jsonFilePath), "O arquivo JSON deveria ter sido criado fisicamente.");

            // Act - Ler do arquivo que acabamos de gravar
            var result = _service.ReadStorage();

            // Assert - Validar integridade dos dados
            Assert.Single(result.Characters);
            var saved = result.Characters[0];
            Assert.Equal("Integration Test Vampire", saved.Name);
            Assert.Equal(9, saved.Willpower);
            Assert.Equal(3, saved.Humanity);
            Assert.Equal(2, saved.Health);
            Assert.Equal(15, saved.BloodPool);
            Assert.Equal(5, saved.Attributes.Strength);
            Assert.Equal(10, result.NextId);
        }

        [Fact]
        public void ReadStorage_ShouldRecoverFromCorruptedJson()
        {
            // Arrange
            File.WriteAllText(_jsonFilePath, "INVALID JSON CONTENT");

            // Act
            var result = _service.ReadStorage();

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result.Characters);
            Assert.Equal(1, result.NextId);
        }

        public void Dispose()
        {
            if (Directory.Exists(_testRootPath))
            {
                Directory.Delete(_testRootPath, true);
            }
        }
    }
}
