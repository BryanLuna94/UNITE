using UNITE.DataTypes.Objects.Entities;
using UNITE.DataTypes.Objects.Filters;

namespace UNITE.DataTypes.Peticiones.Requests
{
    public class MovimientoRequest
    {
        public MovimientoCabFilter Filtro { get; set; }
        public MovimientoCab MovimientoCab { get; set; }
    }
}
