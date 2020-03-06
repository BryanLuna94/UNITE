using System.Configuration;
using System.Data.SqlClient;

namespace UNITE.DataAccess.Connection
{
    public static class GetConnection
    {
        public static SqlConnection BDALMACEN()
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BDALMACEN"].ConnectionString);
            return con;
        }
    }
}
