using System.Data;
using System.Data.SqlClient;
using UNITE.DataAccess.Connection;
using UNITE.DataTypes.Objects.Entities;
using UNITE.Utility;

namespace UNITE.DataAccess
{
    public static class UsuarioData
    {
        public static Usuario Login(string Acceso, string Clave)
        {
            using (var con = GetConnection.UNITE())
            {
                bool openConn = (con.State == ConnectionState.Open);
                if (!openConn) { con.Open(); }

                using (var cmd = new SqlCommand("usp_Usuario_Login", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@pAcceso", SqlDbType.VarChar).Value = Acceso;
                    cmd.Parameters.Add("@pClave", SqlDbType.VarChar).Value = Clave;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            return new Usuario
                            {
                                IdUsuario = DataReader.GetShortValue(dr, "IdUsuario"),
                                Nombre = DataReader.GetStringValue(dr, "Nombre"),
                                Acceso = DataReader.GetStringValue(dr, "Acceso"),
                                IdEmpresa = DataReader.GetShortValue(dr, "IdEmpresa")
                            };
                        }

                        dr.Close();
                    }
                    cmd.Dispose();
                }

                if (con.State == ConnectionState.Open) { con.Close(); }
            }

            return null;
        }
    }
}
