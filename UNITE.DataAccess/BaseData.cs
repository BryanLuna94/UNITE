using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using UNITE.DataAccess.Connection;
using UNITE.DataTypes.Objects.Filters;
using UNITE.DataTypes.Objects.Lists;
using UNITE.Utility;

namespace UNITE.DataAccess
{
    public class BaseData
    {
        public static List<BaseList> ListProductosAutocomplete(ProductoFilter filter)
        {
            List<BaseList> List = new List<BaseList>();
            using (var con = GetConnection.UNITE())
            {
                bool openConn = (con.State == ConnectionState.Open);
                if (!openConn) { con.Open(); }

                using (var cmd = new SqlCommand("usp_Producto_Autocomplete", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@pIdEmpresa", SqlDbType.VarChar).Value = filter.IdEmpresa;
                    cmd.Parameters.Add("@pTipo", SqlDbType.TinyInt).Value = filter.Tipo;
                    cmd.Parameters.Add("@pDescripcion", SqlDbType.VarChar).Value = filter.Descripcion ?? string.Empty;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            string descripcion = DataReader.GetStringValue(dr, "Descripcion");
                            string precio = DataReader.GetDecimalValue(dr, "Precio").ToString("#.#0");

                            List.Add(new BaseList
                            {
                                Codigo = DataReader.GetStringValue(dr, "IdProducto"),
                                Descripcion = string.Format("{0} - S/. {1}", descripcion, precio)
                            });
                        }

                        dr.Close();
                    }
                    cmd.Dispose();
                }

                if (con.State == ConnectionState.Open) { con.Close(); }
            }

            return List;
        }
    }
}
