using ConfigurationsService.Features.ConfigurationItemKeys;
using ConfigurationsService.Model;

namespace ConfigurationsService.Features.ConfigurationItems
{
    public class ConfigurationItemApiModel
    {        
        public int Id { get; set; }
        public int? TenantId { get; set; }
        public string Value { get; set; }        
        public int? ConfigurationItemKeyId { get; set; }
        public ConfigurationItemKeyApiModel ConfigurationItemKey { get; set; }

        public static TModel FromConfigurationItem<TModel>(ConfigurationItem configurationItem) where
            TModel : ConfigurationItemApiModel, new()
        {
            var model = new TModel();
            model.Id = configurationItem.Id;
            model.TenantId = configurationItem.TenantId;
            model.Value = configurationItem.Value;
            model.ConfigurationItemKeyId = configurationItem.ConfigurationItemKeyId;
            model.ConfigurationItemKey = ConfigurationItemKeyApiModel.FromConfigurationItemKey(configurationItem.ConfigurationItemKey);
            return model;
        }

        public static ConfigurationItemApiModel FromConfigurationItem(ConfigurationItem configurationItem)
            => FromConfigurationItem<ConfigurationItemApiModel>(configurationItem);

    }
}
