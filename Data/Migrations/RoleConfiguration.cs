using System.Data.Entity.Migrations;
using ConfigurationsService.Data;
using ConfigurationsService.Model;
using ConfigurationsService.Features.Users;

namespace ConfigurationsService.Migrations
{
    public class RoleConfiguration
    {
        public static void Seed(ConfigurationsServiceContext  context) {

            context.Roles.AddOrUpdate(x => x.Name, new Role()
            {
                Name = Roles.SYSTEM
            });

            context.Roles.AddOrUpdate(x => x.Name, new Role()
            {
                Name = Roles.ACCOUNT_HOLDER
            });

            context.Roles.AddOrUpdate(x => x.Name, new Role()
            {
                Name = Roles.DEVELOPMENT
            });

            context.SaveChanges();
        }
    }
}
