using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;
using UNITE.WebApi.Utility;

namespace UNITE.WebApi
{
    public class Atributos
    {
        public class ExcepcionAtributo : ExceptionFilterAttribute
        {
            public override void OnException(HttpActionExecutedContext context)
            {
                Functions.MessageError(context.Exception);
                if (context.Exception is NotImplementedException)
                {
                    context.Response = new HttpResponseMessage(HttpStatusCode.NotImplemented);
                }
                context.Response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }
    }
}