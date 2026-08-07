using System.Xml.Linq;
using System.IO;

namespace Vamp.Api.Services
{
    public class XmlPreferencesService : IPreferencesService
    {
        private readonly string _filePath;
        private readonly object _lock = new object();
        private const string RootElement = "UserPreferences";
        private const string LanguageElement = "Language";

        public XmlPreferencesService(string? overridePath = null)
        {
            _filePath = overridePath ?? Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "user_preferences.xml");
        }

        public string GetLanguage()
        {
            lock (_lock)
            {
                if (!File.Exists(_filePath))
                {
                    return "En-Us";
                }

                try
                {
                    var doc = XDocument.Load(_filePath);
                    return doc.Root?.Element(LanguageElement)?.Value ?? "En-Us";
                }
                catch
                {
                    return "En-Us";
                }
            }
        }

        public void SetLanguage(string language)
        {
            lock (_lock)
            {
                XDocument doc;
                if (File.Exists(_filePath))
                {
                    try
                    {
                        doc = XDocument.Load(_filePath);
                    }
                    catch
                    {
                        doc = new XDocument(new XElement(RootElement));
                    }
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
}
