using System.Collections.Generic;

namespace ConfigurationsService.Features.Core
{
    public interface ILoggerFactory
    {
        ILogger CreateLogger(string categoryName);

        List<ILoggerProvider> GetProviders();
    }
}
