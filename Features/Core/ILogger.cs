namespace ConfigurationsService.Features.Core
{
    public interface ILogger
    {
        void AddProvider(ILoggerProvider provider);
    }
}
