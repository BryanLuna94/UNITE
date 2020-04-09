using UNITE.DataTypes.Objects.Others;
using UNITE.DataTypes.Peticiones.Responses;
using System.Web.Http;
using UNITE.BusinessLayer;
using UNITE.DataTypes.Peticiones.Requests;
using UNITE.WebApi.Utility;

namespace UNITE.WebApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/base")]
    public class BaseController : ApiController
    {
        #region "Atributos Generales"
        //public string UserEdit
        //{
        //    get { return ((string[])Request.Headers.GetValues("UserEdit"))[0]; }
        //}

        public string Token
        {
            get { return Request.Headers.Authorization.Scheme; }
        }

        #endregion

        [HttpGet()]
        [Route("listproductosautocomplete")]
        [Atributos.ExcepcionAtributo]
        public IHttpActionResult ListProductosAutocomplete(string value)
        {
            var idEmpresa = Functions.GetIdEmpresaByToken(Token);

            var request = new ProductoRequest
            {
                Descripcion = value,
                IdEmpresa = idEmpresa,
                Tipo = 1
            };

            Response<BaseResponse> response = BaseLogic.ListProductosAutocomplete(request);
            return Ok(response);
        }
    }
}
