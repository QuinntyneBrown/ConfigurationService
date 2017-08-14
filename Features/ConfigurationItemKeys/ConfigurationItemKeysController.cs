using MediatR;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ConfigurationsService.Features.Core;

namespace ConfigurationsService.Features.ConfigurationItemKeys
{
    [Authorize]
    [RoutePrefix("api/configurationItemKeys")]
    public class ConfigurationItemKeyController : ApiController
    {
        public ConfigurationItemKeyController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateConfigurationItemKeyCommand.Response))]
        public async Task<IHttpActionResult> Add(AddOrUpdateConfigurationItemKeyCommand.Request request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateConfigurationItemKeyCommand.Response))]
        public async Task<IHttpActionResult> Update(AddOrUpdateConfigurationItemKeyCommand.Request request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetConfigurationItemKeysQuery.Response))]
        public async Task<IHttpActionResult> Get()
        {
            var request = new GetConfigurationItemKeysQuery.Request();
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetConfigurationItemKeyByIdQuery.Response))]
        public async Task<IHttpActionResult> GetById([FromUri]GetConfigurationItemKeyByIdQuery.Request request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveConfigurationItemKeyCommand.Response))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveConfigurationItemKeyCommand.Request request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        protected readonly IMediator _mediator;
    }
}
