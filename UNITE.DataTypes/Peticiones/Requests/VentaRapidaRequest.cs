using System.Collections.Generic;
using UNITE.DataTypes.Objects.Entities;
using UNITE.DataTypes.Objects.Filters;

namespace UNITE.DataTypes.Peticiones.Requests
{
    public class VentaRapidaRequest
    {
        public MovimientoCab MovimientoCab { get; set; }
        public List<MovimientoDet> ListaDet { get; set; }
    }
}
