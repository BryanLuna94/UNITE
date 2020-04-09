using UNITE.DataTypes.Objects.Entities;

namespace UNITE.DataTypes.Peticiones.Responses
{
    public class LoginResponse
    {
        public Usuario Usuario { get; set; }
        public string Token { get; set; }
    }
}
