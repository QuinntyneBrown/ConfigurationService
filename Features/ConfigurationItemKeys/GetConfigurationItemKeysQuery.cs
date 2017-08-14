using MediatR;
using ConfigurationsService.Data;
using ConfigurationsService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace ConfigurationsService.Features.ConfigurationItemKeys
{
    public class GetConfigurationItemKeysQuery
    {
        public class Request : IRequest<Response> { 
            public Guid TenantUniqueId { get; set; }       
        }

        public class Response
        {
            public ICollection<ConfigurationItemKeyApiModel> ConfigurationItemKeys { get; set; } = new HashSet<ConfigurationItemKeyApiModel>();
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
                var configurationItemKeys = await _context.ConfigurationItemKeys
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId )
                    .ToListAsync();

                return new Response()
                {
                    ConfigurationItemKeys = configurationItemKeys.Select(x => ConfigurationItemKeyApiModel.FromConfigurationItemKey(x)).ToList()
                };
            }

            private readonly ConfigurationsServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
