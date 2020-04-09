using JBLV.Log;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UNITE.WebApi.Utility
{
    public static class Functions
    {
        private static string DecryptToken(string Jwt)
        {
            var Handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var DecryptToken = Handler.ReadJwtToken(Jwt);
            return DecryptToken.Claims.ToList()[0].Value;
        }

        public static int GetIdEmpresaByToken(string token)
        {
            token = DecryptToken(token);
            var idEmpresa = token.Split('-')[0];
            return Convert.ToInt32(idEmpresa);
        }

        public static string MessageError(Exception ex)
        {
            Log.RegistrarLog(NivelLog.Error, ex);
            return ex.Message;
        }
    }
}