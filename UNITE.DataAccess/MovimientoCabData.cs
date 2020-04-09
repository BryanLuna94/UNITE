using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using UNITE.DataAccess.Connection;
using UNITE.DataTypes.Objects.Entities;
using UNITE.DataTypes.Objects.Filters;
using UNITE.DataTypes.Objects.Lists;
using UNITE.Utility;

namespace UNITE.DataAccess
{
    public static class MovimientoCabData
    {
        public static List<MovimientoCabList> Listar(MovimientoCabFilter objFiltro)
        {
            List<MovimientoCabList> List = new List<MovimientoCabList>();

            using (var con = GetConnection.UNITE())
            {
                using (var cmd = new SqlCommand("usp_MovimientoCab_List", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@pIdEmpresa", SqlDbType.Int).Value = objFiltro.IdEmpresa;
                    cmd.Parameters.Add("@pFechaMovimientoInicio", SqlDbType.VarChar).Value = objFiltro.FechaMovimientoInicio;
                    cmd.Parameters.Add("@pFechaMovimientoFin", SqlDbType.VarChar).Value = objFiltro.FechaMovimientoFin;
                    cmd.Parameters.Add("@pSerie", SqlDbType.VarChar).Value = objFiltro.Serie;
                    cmd.Parameters.Add("@pNumero", SqlDbType.VarChar).Value = objFiltro.Numero;
                    cmd.Parameters.Add("@pTipoMovimiento", SqlDbType.TinyInt).Value = objFiltro.TipoMovimiento;
                    cmd.Parameters.Add("@pIdEstado", SqlDbType.SmallInt).Value = objFiltro.IdEstado;
                    bool openConn = (con.State == ConnectionState.Open);
                    if (!openConn) { con.Open(); }

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            List.Add(new MovimientoCabList
                            {
                                IdEstado = DataReader.GetSmallIntValue(dr, "IdEstado"),
                                IdMovimiento = DataReader.GetIntValue(dr, "IdMovimiento"),
                                Empresa = DataReader.GetStringValue(dr, "Empresa"),
                                FechaMovimientoStr = DataReader.GetStringValue(dr, "FechaMovimientoStr"),
                                FechaRegistro = DataReader.GetDateTimeValue(dr, "FechaRegistro").Value,
                                IdEmpresa = DataReader.GetIntValue(dr, "IdEmpresa"),
                                IdEmpresaMovimiento = DataReader.GetIntValue(dr, "IdEmpresaMovimiento"),
                                IdTipoMovimiento = DataReader.GetTinyIntValue(dr, "IdTipoMovimiento"),
                                IdUsuarioRegistro = DataReader.GetIntValue(dr, "IdUsuarioRegistro"),
                                Numero = DataReader.GetStringValue(dr, "Numero"),
                                Serie = DataReader.GetStringValue(dr, "Serie"),
                                Total = DataReader.GetDecimalValue(dr, "Total")
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

        public static int Insertar(MovimientoCab objEntidad)
        {
            int nuevoId = 0;

            using (SqlConnection con = GetConnection.UNITE())
            {
                bool openConn = (con.State == ConnectionState.Open);
                if (!openConn) { con.Open(); }

                using (SqlCommand cmd = new SqlCommand("Usp_Tb_Informe_Insert", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@pIdEmpresaMovimiento", SqlDbType.Int).Value = objEntidad.IdEmpresaMovimiento;
                    cmd.Parameters.Add("@pFechaMovimiento", SqlDbType.Date).Value = objEntidad.FechaMovimiento;
                    cmd.Parameters.Add("@pSerie", SqlDbType.VarChar).Value = objEntidad.Serie;
                    cmd.Parameters.Add("@pNumero", SqlDbType.VarChar).Value = objEntidad.Numero;
                    cmd.Parameters.Add("@pTotal", SqlDbType.Decimal).Value = objEntidad.Total;
                    cmd.Parameters.Add("@pIdUsuarioRegistro", SqlDbType.Real).Value = objEntidad.IdUsuarioRegistro;
                    cmd.Parameters.Add("@pFechaRegistro", SqlDbType.Real).Value = objEntidad.FechaRegistro;
                    cmd.Parameters.Add("@pIdEstado", SqlDbType.Real).Value = objEntidad.IdEstado;
                    cmd.Parameters.Add("@pIdEmpresa", SqlDbType.Real).Value = objEntidad.IdEmpresa;
                    cmd.Parameters.Add("@pIdTipoMovimiento", SqlDbType.TinyInt).Value = objEntidad.IdTipoMovimiento;
                    cmd.Parameters.Add("@pIdMovimiento", SqlDbType.TinyInt).Value = 0;
                    cmd.Parameters["@pIdMovimiento"].Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
                    nuevoId = Functions.Check.Int32(cmd.Parameters["@pIdMovimiento"].Value);
                }

                if (con.State == ConnectionState.Open) { con.Close(); }
            }

            return nuevoId;
        }

        public static void Actualizar(MovimientoCab objEntidad)
        {
            using (SqlConnection con = GetConnection.UNITE())
            {
                bool openConn = (con.State == ConnectionState.Open);
                if (!openConn) { con.Open(); }

                using (SqlCommand cmd = new SqlCommand("usp_MovimientoCab_Update", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@pIdMovimiento", SqlDbType.TinyInt).Value = objEntidad.IdMovimiento;
                    cmd.Parameters.Add("@pIdEmpresaMovimiento", SqlDbType.Int).Value = objEntidad.IdEmpresaMovimiento;
                    cmd.Parameters.Add("@pFechaMovimiento", SqlDbType.Date).Value = objEntidad.FechaMovimiento;
                    cmd.Parameters.Add("@pSerie", SqlDbType.VarChar).Value = objEntidad.Serie;
                    cmd.Parameters.Add("@pNumero", SqlDbType.VarChar).Value = objEntidad.Numero;
                    cmd.ExecuteNonQuery();
                }

                if (con.State == ConnectionState.Open) { con.Close(); }
            }
        }

        public static void ActualizarEstado(int idMovimiento, short idEstado)
        {
            using (SqlConnection con = GetConnection.UNITE())
            {
                bool openConn = (con.State == ConnectionState.Open);
                if (!openConn) { con.Open(); }

                using (SqlCommand cmd = new SqlCommand("usp_MovimientoCab_UpdateEstado", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@pIdMovimiento", SqlDbType.Int).Value = idMovimiento;
                    cmd.Parameters.Add("@pIdEstado", SqlDbType.SmallInt).Value = idEstado;
                    cmd.ExecuteNonQuery();
                }

                if (con.State == ConnectionState.Open) { con.Close(); }
            }
        }

        public static void ActualizarTotal(int idMovimiento, decimal total)
        {
            using (SqlConnection con = GetConnection.UNITE())
            {
                bool openConn = (con.State == ConnectionState.Open);
                if (!openConn) { con.Open(); }

                using (SqlCommand cmd = new SqlCommand("usp_MovimientoCab_UpdateTotal", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@pIdMovimiento", SqlDbType.Int).Value = idMovimiento;
                    cmd.Parameters.Add("@pTotal", SqlDbType.Decimal).Value = total;
                    cmd.ExecuteNonQuery();
                }

                if (con.State == ConnectionState.Open) { con.Close(); }
            }
        }
    }
}
