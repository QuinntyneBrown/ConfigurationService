using MediatR;
using ConfigurationsService.Data;
using ConfigurationsService.Features.Core;
using System;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ConfigurationsService.Features.ConfigurationItemKeys
{
    public class RemoveConfigurationItemKeyCommand
    {
        public class Request : BaseRequest, IRequest<Response>
        {
            public int Id { get; set; }
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
                var configurationItemKey = await _context.ConfigurationItemKeys.SingleAsync(x=>x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                configurationItemKey.IsDeleted = true;
                await _context.SaveChangesAsync();
                _bus.Publish(new RemovedConfigurationItemKeyMessage(request.Id, request.CorrelationId, request.TenantUniqueId));
                return new Response();
            }

            private readonly ConfigurationsServiceContext _context;
            private readonly IEventBus _bus;
        }
    }
}
