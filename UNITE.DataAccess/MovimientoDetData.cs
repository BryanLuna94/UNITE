using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using UNITE.DataAccess.Connection;
using UNITE.DataTypes.Objects.Entities;
using UNITE.DataTypes.Objects.Lists;
using UNITE.Utility;

namespace UNITE.DataAccess
{
    public static class MovimientoDetData
    {
        public static List<MovimientoDetList> ListMovimientoDet(int idMovimientoCab)
        {
            List<MovimientoDetList> List = new List<MovimientoDetList>();

            using (var con = GetConnection.UNITE())
            {
                using (var cmd = new SqlCommand("usp_MovimientoDet_List", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@pIdMovimientoCab", SqlDbType.Int).Value = idMovimientoCab;
                    bool openConn = (con.State == ConnectionState.Open);
                    if (!openConn) { con.Open(); }

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            List.Add(new MovimientoDetList
                            {
                                IdMovimientoDet = DataReader.GetIntValue(dr, "IdMovimientoDet"),
                                Importe = DataReader.GetDecimalValue(dr, "Importe"),
                                PrecioConDscto = DataReader.GetDecimalValue(dr, "PrecioConDscto"),
                                PrecioUnit = DataReader.GetDecimalValue(dr, "PrecioUnit"),
                                Cantidad = DataReader.GetIntValue(dr, "Cantidad"),
                                IdProducto = DataReader.GetIntValue(dr, "IdProducto"),
                                Producto = DataReader.GetStringValue(dr, "Producto")
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

        public static void Insertar(MovimientoDet objEntidad)
        {
            using (SqlConnection con = GetConnection.UNITE())
            {
                bool openConn = (con.State == ConnectionState.Open);
                if (!openConn) { con.Open(); }

                using (SqlCommand cmd = new SqlCommand("usp_MovimientoDet_Insert", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@pIdMovimientoCab", SqlDbType.Int).Value = objEntidad.IdMovimientoCab;
                    cmd.Parameters.Add("@pIdProducto", SqlDbType.Int).Value = objEntidad.IdProducto;
                    cmd.Parameters.Add("@pCantidad", SqlDbType.Int).Value = objEntidad.Cantidad;
                    cmd.Parameters.Add("@pPrecioUnit", SqlDbType.Decimal).Value = objEntidad.PrecioUnit;
                    cmd.Parameters.Add("@pPrecioConDscto", SqlDbType.Decimal).Value = objEntidad.PrecioConDscto;
                    cmd.Parameters.Add("@pImporte", SqlDbType.Decimal).Value = objEntidad.Importe;
                    cmd.ExecuteNonQuery();
                }

                if (con.State == ConnectionState.Open) { con.Close(); }
            }
        }

        public static void Actualizar(MovimientoDet objEntidad)
        {
            using (SqlConnection con = GetConnection.UNITE())
            {
                bool openConn = (con.State == ConnectionState.Open);
                if (!openConn) { con.Open(); }

                using (SqlCommand cmd = new SqlCommand("usp_MovimientoDet_Update", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@pIdMovimientoDet", SqlDbType.Int).Value = objEntidad.IdMovimientoDet;
                    cmd.Parameters.Add("@pIdProducto", SqlDbType.Int).Value = objEntidad.IdProducto;
                    cmd.Parameters.Add("@pCantidad", SqlDbType.Int).Value = objEntidad.Cantidad;
                    cmd.Parameters.Add("@pPrecioUnit", SqlDbType.Decimal).Value = objEntidad.PrecioUnit;
                    cmd.Parameters.Add("@pPrecioConDscto", SqlDbType.Decimal).Value = objEntidad.PrecioConDscto;
                    cmd.Parameters.Add("@pImporte", SqlDbType.Decimal).Value = objEntidad.Importe;
                    cmd.ExecuteNonQuery();
                }

                if (con.State == ConnectionState.Open) { con.Close(); }
            }
        }

        public static void Eliminar(int idMovimientoDet)
        {
            using (SqlConnection con = GetConnection.UNITE())
            {
                bool openConn = (con.State == ConnectionState.Open);
                if (!openConn) { con.Open(); }

                using (SqlCommand cmd = new SqlCommand("usp_MovimientoDet_Delete", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@pIdMovimientoDet", SqlDbType.Int).Value = idMovimientoDet;
                    cmd.ExecuteNonQuery();
                }

                if (con.State == ConnectionState.Open) { con.Close(); }
            }
        }

    }
}
