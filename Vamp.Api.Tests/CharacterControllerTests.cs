using System;
using System.Collections.Generic;
using Xunit;
using Moq;
using Vamp.Api.Controllers;
using Vamp.Api.Models;
using Vamp.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Vamp.Api.Tests
{
    public class CharacterControllerTests
    {
        [Fact]
        public void CreateCharacter_CallsRepositoryAdd()
        {
            // Arrange
            var mockRepo = new Mock<ICharacterRepository>();
            var controller = new CharacterController(mockRepo.Object);
            var newCharacter = new Character { Name = "Test Vampire", Clan = "Brujah" };

            // Act
            var result = controller.Post(newCharacter);

            // Assert
            var actionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            mockRepo.Verify(r => r.Add(It.IsAny<Character>()), Times.Once);
        }

        [Fact]
        public void GetAll_ReturnsListFromRepository()
        {
            // Arrange
            var mockRepo = new Mock<ICharacterRepository>();
            mockRepo.Setup(repo => repo.GetAll()).Returns(new List<Character> 
            { 
                new Character { Name = "Vamp 1" }, 
                new Character { Name = "Vamp 2" } 
            });
            var controller = new CharacterController(mockRepo.Object);

            // Act
            var result = controller.Get();

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var items = Assert.IsType<List<Character>>(actionResult.Value);
            Assert.Equal(2, items.Count);
        }
    }
}
