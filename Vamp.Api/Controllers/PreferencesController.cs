using Microsoft.AspNetCore.Mvc;
using System.Xml.Serialization;
using Vamp.Api.Models;

namespace Vamp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PreferencesController : ControllerBase
    {
        private readonly string _filePath;

        public PreferencesController(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "preferences.xml");
        }

        [HttpGet("language")]
        public IActionResult GetLanguage()
        {
            if (!System.IO.File.Exists(_filePath))
            {
                return Ok(new { language = "En-Us" });
            }

            try
            {
                var serializer = new XmlSerializer(typeof(UserPreferences));
                using (var stream = new FileStream(_filePath, FileMode.Open))
                {
                    var prefs = (UserPreferences)serializer.Deserialize(stream);
                    return Ok(new { language = prefs.Language });
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error reading preferences: {ex.Message}");
                return Ok(new { language = "En-Us" });
            }
        }

        [HttpPost("language")]
        public IActionResult SetLanguage([FromBody] LanguageRequest request)
        {
            Console.WriteLine($"[PreferencesController] Received SetLanguage request: {request?.Language}");
            
            try
            {
                var prefs = new UserPreferences { Language = request.Language };
                var serializer = new XmlSerializer(typeof(UserPreferences));
                
                Console.WriteLine($"[PreferencesController] Saving to: {_filePath}");
                
                using (var stream = new FileStream(_filePath, FileMode.Create))
                {
                    serializer.Serialize(stream, prefs);
                }
                
                Console.WriteLine($"[PreferencesController] Successfully saved preferences");
                return Ok();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error saving preferences: {ex.Message}");
                Console.Error.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, "Internal server error");
            }
        }

        public class LanguageRequest
        {
            public string Language { get; set; }
        }
    }
}
