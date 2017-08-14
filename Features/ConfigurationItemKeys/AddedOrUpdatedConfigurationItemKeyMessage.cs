using ConfigurationsService.Model;
using ConfigurationsService.Features.Core;
using System;

namespace ConfigurationsService.Features.ConfigurationItemKeys
{

    public class AddedOrUpdatedConfigurationItemKeyMessage : BaseEventBusMessage
    {
        public AddedOrUpdatedConfigurationItemKeyMessage(ConfigurationItemKey configurationItemKey, Guid correlationId, Guid tenantId)
        {
            Payload = new { Entity = configurationItemKey, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = ConfigurationItemKeysEventBusMessages.AddedOrUpdatedConfigurationItemKeyMessage;        
    }
}
