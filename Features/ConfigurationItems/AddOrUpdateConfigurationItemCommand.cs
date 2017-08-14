using MediatR;
using ConfigurationsService.Data;
using ConfigurationsService.Model;
using ConfigurationsService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace ConfigurationsService.Features.ConfigurationItems
{
    public class AddOrUpdateConfigurationItemCommand
    {
        public class Request : BaseRequest, IRequest<Response>
        {
            public ConfigurationItemApiModel ConfigurationItem { get; set; }
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
                var entity = await _context.ConfigurationItems
                    .Include(x => x.Tenant)
                    .SingleOrDefaultAsync(x => x.Id == request.ConfigurationItem.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                
                if (entity == null) {
                    var tenant = await _context.Tenants.SingleAsync(x => x.UniqueId == request.TenantUniqueId);
                    _context.ConfigurationItems.Add(entity = new ConfigurationItem() { TenantId = tenant.Id });
                }

                entity.Value = request.ConfigurationItem.Value;
                
                await _context.SaveChangesAsync();

                _bus.Publish(new AddedOrUpdatedConfigurationItemMessage(entity, request.CorrelationId, request.TenantUniqueId));

                return new Response();
            }

            private readonly ConfigurationsServiceContext _context;
            private readonly IEventBus _bus;
        }
    }
}
