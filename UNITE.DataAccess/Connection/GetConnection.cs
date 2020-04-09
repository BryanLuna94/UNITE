using System.Configuration;
using System.Data.SqlClient;

namespace UNITE.DataAccess.Connection
{
    public static class GetConnection
    {
        public static SqlConnection UNITE()
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["UNITE"].ConnectionString);
            return con;
        }
    }
}
