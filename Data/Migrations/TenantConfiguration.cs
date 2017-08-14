using System.Data.Entity.Migrations;
using ConfigurationsService.Data;
using ConfigurationsService.Model;
using System;

namespace ConfigurationsService.Migrations
{
    public class TenantConfiguration
    {
        public static void Seed(ConfigurationsServiceContext  context) {

            context.Tenants.AddOrUpdate(x => x.Name, new Tenant()
            {
                Name = "Default",
                UniqueId = new Guid("a280f345-4cc4-4460-8c82-93f253320d7a")
            });

            context.SaveChanges();
        }
    }
}
