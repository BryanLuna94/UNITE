using System.Collections.Generic;
using UNITE.DataAccess;
using UNITE.DataTypes.Objects.Filters;
using UNITE.DataTypes.Objects.Lists;
using UNITE.DataTypes.Objects.Others;
using UNITE.DataTypes.Peticiones.Requests;
using UNITE.DataTypes.Peticiones.Responses;
using UNITE.Utility;


namespace UNITE.BusinessLayer
{
    public static class BaseLogic
    {
        public static Response<BaseResponse> ListProductosAutocomplete(ProductoRequest request)
        {
            Response<BaseResponse> response;
            ProductoFilter filter;
            List<BaseList> list;

            //filter = request.Filter;
            list = BaseData.ListProductosAutocomplete(request);

            response = new Response<BaseResponse>
            {
                EsCorrecto = true,
                Valor = new BaseResponse { List = list },
                Mensaje = "OK"
            };

            return response;
        }
    }
}
