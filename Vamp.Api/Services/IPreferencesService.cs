namespace Vamp.Api.Services
{
    public interface IPreferencesService
    {
        string GetLanguage();
        void SetLanguage(string language);
    }
}
