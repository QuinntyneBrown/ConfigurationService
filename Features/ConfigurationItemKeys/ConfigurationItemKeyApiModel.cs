using ConfigurationsService.Model;

namespace ConfigurationsService.Features.ConfigurationItemKeys
{
    public class ConfigurationItemKeyApiModel
    {        
        public int Id { get; set; }
        public int? TenantId { get; set; }
        public string Name { get; set; }

        public static TModel FromConfigurationItemKey<TModel>(ConfigurationItemKey configurationItemKey) where
            TModel : ConfigurationItemKeyApiModel, new()
        {
            var model = new TModel();
            model.Id = configurationItemKey.Id;
            model.TenantId = configurationItemKey.TenantId;
            model.Name = configurationItemKey.Name;
            return model;
        }

        public static ConfigurationItemKeyApiModel FromConfigurationItemKey(ConfigurationItemKey configurationItemKey)
            => FromConfigurationItemKey<ConfigurationItemKeyApiModel>(configurationItemKey);

    }
}
