using System;
using UNITE.DataAccess;
using UNITE.DataTypes.Objects.Entities;
using UNITE.DataTypes.Objects.Others;
using UNITE.DataTypes.Peticiones.Requests;
using UNITE.DataTypes.Peticiones.Responses;
using UNITE.Utility;

namespace UNITE.BusinessLayer
{
    public static class UsuarioLogic
    {
        public static Response<LoginResponse> Login(LoginRequest request)
        {
            Response<LoginResponse> response;
            Usuario objUsuario;

            objUsuario = UsuarioData.Login(request.Acceso, request.Clave);

            response = new Response<LoginResponse>
            {
                EsCorrecto = true,
                Valor = new LoginResponse
                {
                    Usuario = objUsuario
                },
                Mensaje = "OK"
            };

            return response;
        }
    }
}
