﻿using Owin;
using System.Web.Http;
using Microsoft.Owin;
using Unity.WebApi;
using Microsoft.Practices.Unity;
using ConfigurationsService.Features.Core;
using Microsoft.ServiceBus.Messaging;

using static Newtonsoft.Json.JsonConvert;
using Newtonsoft.Json.Linq;
using System;
using Newtonsoft.Json;
using Microsoft.AspNet.SignalR;

[assembly: OwinStartup(typeof(ConfigurationsService.Startup))]

namespace ConfigurationsService
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            GlobalConfiguration.Configure(config =>
            {
                var container = UnityConfiguration.GetContainer();
                config.DependencyResolver = new UnityDependencyResolver(container);
                ApiConfiguration.Install(config, app);

                var client = SubscriptionClient.CreateFromConnectionString(CoreConfiguration.Config.EventQueueConnectionString, CoreConfiguration.Config.TopicName, CoreConfiguration.Config.SubscriptionName);

                client.OnMessage(message =>
                {
                    try
                    {
                        var messageBody = ((BrokeredMessage)message).GetBody<string>();
                        var messageBodyObject = DeserializeObject<JObject>(messageBody, new JsonSerializerSettings
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Serialize,
                            PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                            TypeNameHandling = TypeNameHandling.All
                        });

                        GlobalHost.ConnectionManager.GetHubContext<EventHub>().Clients.All.events(messageBodyObject);
                    }
                    catch (Exception exception)
                    {
                        throw exception;
                    }
                });
            });
        }
    }
}