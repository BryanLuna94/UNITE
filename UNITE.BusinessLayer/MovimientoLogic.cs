using System.Collections.Generic;
using UNITE.DataAccess;
using UNITE.DataTypes.Objects.Entities;
using UNITE.DataTypes.Objects.Filters;
using UNITE.DataTypes.Objects.Lists;
using UNITE.DataTypes.Objects.Others;
using UNITE.DataTypes.Peticiones.Requests;
using UNITE.DataTypes.Peticiones.Responses;
using UNITE.BusinessLayer.Utility;

namespace UNITE.BusinessLayer
{
    public static class MovimientoLogic
    {
        #region CABECERA

        public static Response<MovimientoResponse> ListarMovimientoCab(MovimientoRequest request)
        {
            Response<MovimientoResponse> response;
            List<MovimientoCabList> lista;
            MovimientoCabFilter filtro;

            filtro = request.Filtro;
            lista = MovimientoCabData.Listar(filtro);

            response = new Response<MovimientoResponse>
            {
                EsCorrecto = true,
                Valor = new MovimientoResponse { Lista = lista },
                Mensaje = "OK"
            };

            return response;
        }

        #region VENTA RAPIDA

        public static Response<int> InsertarVentaRapida(VentaRapidaRequest request)
        {
            Response<int> response;
            int nuevoId;

            if (request.ListaDet.Count == 0)
            {
                return new Response<int> { EsCorrecto = false, Mensaje = Constants.RespuestasResponse.DEBE_LLENAR_DETALLE_MOV };
            }

            nuevoId = MovimientoCabData.Insertar(request.MovimientoCab);

            foreach (var item in request.ListaDet)
            {
                item.IdMovimientoCab = nuevoId;
                MovimientoDetData.Insertar(item);
            }

            response = new Response<int>
            {
                EsCorrecto = true,
                Valor = nuevoId,
                Mensaje = Constants.RespuestasResponse.OK
            };

            return response;
        }

        #endregion



        //public static void Actualizar(MovimientoRequest request)
        //{
        //    Response<int> response;
        //    int nuevoId;
        //    MovimientoCab objMovimiento;

        //    objMovimiento = request.MovimientoCab;
        //    nuevoId = MovimientoCabData.Insertar(objMovimiento);

        //    response = new Response<int>
        //    {
        //        EsCorrecto = true,
        //        Valor = nuevoId,
        //        Mensaje = "OK"
        //    };

        //    return response;
        //}

        //public static void ActualizarEstado(int idMovimiento, short idEstado)
        //{
        //    using (SqlConnection con = GetConnection.UNITE())
        //    {
        //        bool openConn = (con.State == ConnectionState.Open);
        //        if (!openConn) { con.Open(); }

        //        using (SqlCommand cmd = new SqlCommand("usp_MovimientoCab_UpdateEstado", con))
        //        {
        //            cmd.CommandType = CommandType.StoredProcedure;
        //            cmd.Parameters.Add("@pIdMovimiento", SqlDbType.Int).Value = idMovimiento;
        //            cmd.Parameters.Add("@pIdEstado", SqlDbType.SmallInt).Value = idEstado;
        //            cmd.ExecuteNonQuery();
        //        }

        //        if (con.State == ConnectionState.Open) { con.Close(); }
        //    }
        //}

        //public static void ActualizarTotal(int idMovimiento, decimal total)
        //{
        //    using (SqlConnection con = GetConnection.UNITE())
        //    {
        //        bool openConn = (con.State == ConnectionState.Open);
        //        if (!openConn) { con.Open(); }

        //        using (SqlCommand cmd = new SqlCommand("usp_MovimientoCab_UpdateTotal", con))
        //        {
        //            cmd.CommandType = CommandType.StoredProcedure;
        //            cmd.Parameters.Add("@pIdMovimiento", SqlDbType.Int).Value = idMovimiento;
        //            cmd.Parameters.Add("@pTotal", SqlDbType.Decimal).Value = total;
        //            cmd.ExecuteNonQuery();
        //        }

        //        if (con.State == ConnectionState.Open) { con.Close(); }
        //    }
        //}

        #endregion
    }
}
