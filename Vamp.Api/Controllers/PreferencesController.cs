using Microsoft.AspNetCore.Mvc;
using Vamp.Api.Services;

namespace Vamp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PreferencesController : ControllerBase
    {
        private readonly IPreferencesService _preferencesService;

        public PreferencesController(IPreferencesService preferencesService)
        {
            _preferencesService = preferencesService;
        }

        [HttpGet("language")]
        public IActionResult GetLanguage()
        {
            var language = _preferencesService.GetLanguage();
            return Ok(new { language });
        }

        [HttpPost("language")]
        public IActionResult SetLanguage([FromBody] LanguageRequest request)
        {
            if (string.IsNullOrWhiteSpace(request?.Language))
            {
                return BadRequest("Language cannot be empty.");
            }

            _preferencesService.SetLanguage(request.Language);
            return Ok();
        }

        public class LanguageRequest
        {
            public string Language { get; set; } = string.Empty;
        }
    }
}
