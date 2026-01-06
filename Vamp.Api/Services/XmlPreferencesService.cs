using System.Xml.Linq;
using System.IO;

namespace Vamp.Api.Services
{
    public class XmlPreferencesService : IPreferencesService
    {
        private const string FilePath = "user_preferences.xml";
        private const string RootElement = "UserPreferences";
        private const string LanguageElement = "Language";

        public string GetLanguage()
        {
            if (!File.Exists(FilePath))
            {
                return "en"; // Default
            }

            try
            {
                var doc = XDocument.Load(FilePath);
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
            if (File.Exists(FilePath))
            {
                doc = XDocument.Load(FilePath);
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

            doc.Save(FilePath);
        }
    }
}
