using JBLV.Log;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace UNITE.Utility
{
    public static class Functions
    {
        public static class Check
        {
            private static DateTime fechaValidar;

            public static short Int16(object entero)
            {
                if (entero == null || entero == DBNull.Value)
                {
                    return 0;
                }
                else
                {
                    return Convert.ToInt16(entero);
                }
            }

            public static short? Int16Null(object entero)
            {
                if (entero == null || entero == DBNull.Value)
                {
                    return null;
                }
                else
                {
                    return Convert.ToInt16(entero);
                }
            }

            public static int Int32(object entero)
            {
                if (entero == null || entero == DBNull.Value)
                {
                    return 0;
                }
                else
                {
                    if (entero.ToString() == "")
                    {
                        return 0;
                    }
                    else
                    {
                        return Convert.ToInt32(entero);
                    }
                }
            }

            public static int? Int32Null(object entero)
            {
                if (entero == null || entero == DBNull.Value)
                {
                    return null;
                }
                else
                {
                    return Convert.ToInt32(entero);
                }
            }

            public static string FechaCorta(object fecha)
            {
                string resultado;

                if (fecha == null || fecha == DBNull.Value)
                {
                    resultado = "";
                }
                else
                {
                    if (!DateTime.TryParse(fecha.ToString(), out fechaValidar))
                    {
                        resultado = "";
                    }
                    else
                    {
                        resultado = Convert.ToDateTime(fecha).ToString("dd/MM/yyyy");
                    }
                }
                return resultado;
            }

            public static string FechaLarga(object fecha, int horasSumar = 0)
            {
                string resultado;

                if (fecha == null || fecha == DBNull.Value)
                {
                    resultado = "";
                }
                else
                {
                    if (!DateTime.TryParse(fecha.ToString(), out fechaValidar))
                    {
                        resultado = "";
                    }
                    else
                    {
                        resultado = Convert.ToDateTime(fecha).AddHours(horasSumar).ToString("dd/MM/yyyy HH:mm:ss");
                    }
                }
                return resultado;
            }

            public static string Cadena(object cadena)
            {
                string resultado;

                resultado = (cadena == null) ? "" : cadena.ToString();

                return resultado;
            }

            public static DateTime? Datetime(object fecha)
            {
                DateTime? resultado;

                if (fecha == null || fecha == DBNull.Value)
                {
                    resultado = null;
                }
                else
                {
                    resultado = Convert.ToDateTime(fecha);
                }

                return resultado;
            }

            public static decimal Decimal(object numero)
            {
                if (numero == null || numero == DBNull.Value)
                {
                    return 0;
                }
                else
                {
                    return Convert.ToDecimal(numero);
                }
            }

            public static bool Bool(object valor)
            {
                if (valor == null || valor == DBNull.Value)
                {
                    return false;
                }
                else
                {
                    if (valor.ToString() == "" || valor.ToString() == "0")
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
            }
        }
    }
}
