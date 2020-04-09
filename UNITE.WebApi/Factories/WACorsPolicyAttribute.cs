using System;
using System.Configuration;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace UNITE.WebApi.Factories
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
    public class WACorsPolicyAttribute : Attribute, ICorsPolicyProvider
    {
        private CorsPolicy _policy;

        public WACorsPolicyAttribute()
        {
            // Create a CORS policy.
            _policy = new CorsPolicy
            {
                AllowAnyMethod = true,
                AllowAnyHeader = true
            };

            _policy.Origins.Clear();
            ////
            var origins = ConfigurationManager.AppSettings["WA_ALLOWED_ORIGINS"].Split(',');

            foreach (var origin in origins)
            {
                _policy.Origins.Add(origin);
            }
            ///
        }

        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_policy);
        }
    }
}