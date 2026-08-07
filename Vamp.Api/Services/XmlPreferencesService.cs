using System.Xml.Linq;
using System.IO;

namespace Vamp.Api.Services
{
    public class XmlPreferencesService : IPreferencesService
    {
        private readonly string _filePath;
        private const string RootElement = "UserPreferences";
        private const string LanguageElement = "Language";

        public XmlPreferencesService(string? overridePath = null)
        {
            _filePath = overridePath ?? Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "user_preferences.xml");
        }

        public string GetLanguage()
        {
            if (!File.Exists(_filePath))
            {
                return "en"; // Default
            }

            try
            {
                var doc = XDocument.Load(_filePath);
                return doc.Root?.Element(LanguageElement)?.Value ?? "en";
            }
            catch
            {
                return "en";
            }
        }

        public void SetLanguage(string language)
        {
            XDocument doc;
            if (File.Exists(_filePath))
            {
                doc = XDocument.Load(_filePath);
            }
            else
            {
                doc = new XDocument(new XElement(RootElement));
            }

            if (doc.Root == null)
            {
                doc.Add(new XElement(RootElement));
            }

            var langElem = doc.Root.Element(LanguageElement);
            if (langElem == null)
            {
                doc.Root.Add(new XElement(LanguageElement, language));
            }
            else
            {
                langElem.Value = language;
            }

            doc.Save(_filePath);
        }
    }
}
