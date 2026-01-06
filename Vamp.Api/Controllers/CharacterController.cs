using Microsoft.AspNetCore.Mvc;
using Vamp.Api.Models;
using Vamp.Api.Services;

namespace Vamp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : ControllerBase
    {
        private readonly JsonStorageService _storage;

        public CharacterController(JsonStorageService storage)
        {
            _storage = storage;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var data = _storage.ReadStorage();
            return Ok(data.Characters);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var data = _storage.ReadStorage();
            var character = data.Characters.FirstOrDefault(c => c.Id == id);
            
            if (character == null)
                return NotFound();
            
            return Ok(character);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Character character)
        {
            var data = _storage.ReadStorage();
            
            character.Id = data.NextId++;
            data.Characters.Add(character);
            
            _storage.WriteStorage(data);
            
            return CreatedAtAction(nameof(GetById), new { id = character.Id }, character);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Character updatedCharacter)
        {
            var data = _storage.ReadStorage();
            var index = data.Characters.FindIndex(c => c.Id == id);
            
            if (index == -1)
                return NotFound();
            
            updatedCharacter.Id = id;
            data.Characters[index] = updatedCharacter;
            
            _storage.WriteStorage(data);
            
            return Ok(updatedCharacter);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var data = _storage.ReadStorage();
            var character = data.Characters.FirstOrDefault(c => c.Id == id);
            
            if (character == null)
                return NotFound();
            
            data.Characters.Remove(character);
            _storage.WriteStorage(data);
            
            return NoContent();
        }
    }
}
