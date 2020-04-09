using UNITE.DataTypes.Objects.Others;
using UNITE.DataTypes.Peticiones.Responses;
using System.Web.Http;
using UNITE.BusinessLayer;
using UNITE.DataTypes.Peticiones.Requests;
using UNITE.WebApi.Utility;

namespace UNITE.WebApi.Controllers
{
    [Authorize]
    [Atributos.ExcepcionAtributo]
    public class MovimientoController : ApiController
    {
        #region VENTA RAPIDA

        [HttpPost()]
        [Route(Constants.RoutesApi.INSERTAR_VENTA_RAPIDA)]
        public IHttpActionResult InsertarVentaRapida(VentaRapidaRequest request)
        {
            Response<int> response;

            response = MovimientoLogic.InsertarVentaRapida(request);

            return Ok(response);
        }

        #endregion
    }
}
