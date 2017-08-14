using ConfigurationsService.Features.Core;
using System;

namespace ConfigurationsService.Features.ConfigurationItems
{
    public class RemovedConfigurationItemMessage : BaseEventBusMessage
    {
        public RemovedConfigurationItemMessage(int configurationItemId, Guid correlationId, Guid tenantId)
        {
            Payload = new { Id = configurationItemId, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = ConfigurationItemsEventBusMessages.RemovedConfigurationItemMessage;        
    }
}
