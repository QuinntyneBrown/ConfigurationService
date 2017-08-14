using Newtonsoft.Json.Linq;

namespace ConfigurationsService.Features.Core
{
    public interface IEventBusMessageHandler
    {
        void Handle(JObject message);
    }
}