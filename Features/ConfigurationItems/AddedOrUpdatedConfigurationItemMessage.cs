using ConfigurationsService.Model;
using ConfigurationsService.Features.Core;
using System;

namespace ConfigurationsService.Features.ConfigurationItems
{

    public class AddedOrUpdatedConfigurationItemMessage : BaseEventBusMessage
    {
        public AddedOrUpdatedConfigurationItemMessage(ConfigurationItem configurationItem, Guid correlationId, Guid tenantId)
        {
            Payload = new { Entity = configurationItem, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = ConfigurationItemsEventBusMessages.AddedOrUpdatedConfigurationItemMessage;        
    }
}
