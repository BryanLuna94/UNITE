using UNITE.DataTypes.Objects.Others;
using UNITE.DataTypes.Peticiones.Responses;
using System.Web.Http;
using UNITE.BusinessLayer;
using UNITE.DataTypes.Peticiones.Requests;

namespace UNITE.WebApi.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/Autenticacion")]
    public class AutenticacionController : ApiController
    {
        [HttpPost()]
        [Route("login")]
        [Atributos.ExcepcionAtributo]
        public IHttpActionResult Login(LoginRequest request)
        {
            Response<LoginResponse> response = UsuarioLogic.Login(request);
            if (response.Valor.Usuario != null)
            {
                var token = TokenGenerator.GenerateTokenJwt(response.Valor.Usuario.IdEmpresa.ToString(), request.Acceso);
                response.Valor.Token = token;
                return Ok(response);
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
