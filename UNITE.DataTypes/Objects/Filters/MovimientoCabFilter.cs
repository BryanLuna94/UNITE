namespace UNITE.DataTypes.Objects.Filters
{
    public class MovimientoCabFilter
    {
		public int IdEmpresa { get; set; }
		public string FechaMovimientoInicio { get; set; }
		public string FechaMovimientoFin { get; set; }
		public string Serie { get; set; }
		public string Numero { get; set; }
		public byte TipoMovimiento { get; set; }
		public short IdEstado { get; set; }
	}
}
