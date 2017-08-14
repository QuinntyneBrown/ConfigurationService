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
    public class RemoveConfigurationItemCommand
    {
        public class Request : BaseRequest, IRequest<Response>
        {
            public int Id { get; set; }
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
                var configurationItem = await _context.ConfigurationItems.SingleAsync(x=>x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                configurationItem.IsDeleted = true;
                await _context.SaveChangesAsync();
                _bus.Publish(new RemovedConfigurationItemMessage(request.Id, request.CorrelationId, request.TenantUniqueId));
                return new Response();
            }

            private readonly ConfigurationsServiceContext _context;
            private readonly IEventBus _bus;
        }
    }
}
