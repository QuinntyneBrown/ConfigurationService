using ConfigurationsService.Features.Core;
using System;

namespace ConfigurationsService.Features.ConfigurationItemKeys
{
    public class RemovedConfigurationItemKeyMessage : BaseEventBusMessage
    {
        public RemovedConfigurationItemKeyMessage(int configurationItemKeyId, Guid correlationId, Guid tenantId)
        {
            Payload = new { Id = configurationItemKeyId, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = ConfigurationItemKeysEventBusMessages.RemovedConfigurationItemKeyMessage;        
    }
}
