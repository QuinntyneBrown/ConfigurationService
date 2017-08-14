using MediatR;
using ConfigurationsService.Data;
using ConfigurationsService.Model;
using ConfigurationsService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace ConfigurationsService.Features.ConfigurationItemKeys
{
    public class AddOrUpdateConfigurationItemKeyCommand
    {
        public class Request : BaseRequest, IRequest<Response>
        {
            public ConfigurationItemKeyApiModel ConfigurationItemKey { get; set; }
            public Guid TenantUniqueId { get; set; }
			public Guid CorrelationId { get; set; }
        }

        public class Response { }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(ConfigurationsServiceContext context, IEventBus bus)
            {
                _context = context;
                _bus = bus;
            }

            public async Task<Response> Handle(Request request)
            {
                var entity = await _context.ConfigurationItemKeys
                    .Include(x => x.Tenant)
                    .SingleOrDefaultAsync(x => x.Id == request.ConfigurationItemKey.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                
                if (entity == null) {
                    var tenant = await _context.Tenants.SingleAsync(x => x.UniqueId == request.TenantUniqueId);
                    _context.ConfigurationItemKeys.Add(entity = new ConfigurationItemKey() { TenantId = tenant.Id });
                }

                entity.Name = request.ConfigurationItemKey.Name;
                
                await _context.SaveChangesAsync();

                _bus.Publish(new AddedOrUpdatedConfigurationItemKeyMessage(entity, request.CorrelationId, request.TenantUniqueId));

                return new Response();
            }

            private readonly ConfigurationsServiceContext _context;
            private readonly IEventBus _bus;
        }
    }
}
