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
    public class GetConfigurationItemKeyByIdQuery
    {
        public class Request : IRequest<Response> { 
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; }
        }

        public class Response
        {
            public ConfigurationItemKeyApiModel ConfigurationItemKey { get; set; } 
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
                return new Response()
                {
                    ConfigurationItemKey = ConfigurationItemKeyApiModel.FromConfigurationItemKey(await _context.ConfigurationItemKeys
                    .Include(x => x.Tenant)				
					.SingleAsync(x=>x.Id == request.Id &&  x.Tenant.UniqueId == request.TenantUniqueId))
                };
            }

            private readonly ConfigurationsServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
