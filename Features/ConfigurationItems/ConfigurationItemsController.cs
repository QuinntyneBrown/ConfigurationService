using MediatR;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ConfigurationsService.Features.Core;

namespace ConfigurationsService.Features.ConfigurationItems
{
    [Authorize]
    [RoutePrefix("api/configurationItems")]
    public class ConfigurationItemController : ApiController
    {
        public ConfigurationItemController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateConfigurationItemCommand.Response))]
        public async Task<IHttpActionResult> Add(AddOrUpdateConfigurationItemCommand.Request request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateConfigurationItemCommand.Response))]
        public async Task<IHttpActionResult> Update(AddOrUpdateConfigurationItemCommand.Request request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetConfigurationItemsQuery.Response))]
        public async Task<IHttpActionResult> Get()
        {
            var request = new GetConfigurationItemsQuery.Request();
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetConfigurationItemByIdQuery.Response))]
        public async Task<IHttpActionResult> GetById([FromUri]GetConfigurationItemByIdQuery.Request request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveConfigurationItemCommand.Response))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveConfigurationItemCommand.Request request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        protected readonly IMediator _mediator;
    }
}
