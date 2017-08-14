using MediatR;
using ConfigurationsService.Data;
using ConfigurationsService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace ConfigurationsService.Features.ConfigurationItems
{
    public class GetConfigurationItemsQuery
    {
        public class Request : IRequest<Response> { 
            public Guid TenantUniqueId { get; set; }       
        }

        public class Response
        {
            public ICollection<ConfigurationItemApiModel> ConfigurationItems { get; set; } = new HashSet<ConfigurationItemApiModel>();
        }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(ConfigurationsServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<Response> Handle(Request request)
            {
                var configurationItems = await _context.ConfigurationItems
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId )
                    .ToListAsync();

                return new Response()
                {
                    ConfigurationItems = configurationItems.Select(x => ConfigurationItemApiModel.FromConfigurationItem(x)).ToList()
                };
            }

            private readonly ConfigurationsServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
