namespace ConfigurationsService.Migrations
{
    using Data;
    using Data.Helpers;
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<ConfigurationsServiceContext >
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ConfigurationsServiceContext  context)
        {
            TenantConfiguration.Seed(context);
            RoleConfiguration.Seed(context);
            UserConfiguration.Seed(context);
        }
    }

    public class DbConfiguration : System.Data.Entity.DbConfiguration
    {
        public DbConfiguration()
        {
            AddInterceptor(new SoftDeleteInterceptor());
        }
    }
}
