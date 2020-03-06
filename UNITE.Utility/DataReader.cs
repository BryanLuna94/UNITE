using System;
using System.Data;

namespace UNITE.Utility
{
    public class DataReader
    {
        public static object GetObjectValue(IDataReader dr, string column)
        {
            try
            {
                var obj = dr[column];
                return (obj == DBNull.Value) ? null : obj;
            }
            catch { return null; }
        }
        public static string GetStringValue(IDataReader dr, string column)
        {
            try
            {
                var obj = GetObjectValue(dr, column);
                return (obj == null) ? string.Empty : obj.ToString().Trim();
            }
            catch { return string.Empty; }
        }
        public static float GetRealValue(IDataReader dr, string column)
        {
            try
            {
                var obj = GetObjectValue(dr, column);
                if (obj == null) return Convert.ToSingle(obj);
                return Convert.ToSingle(obj);
            }
            catch { return 0; }
        }
        public static double GetFloatValue(IDataReader dr, string column)
        {
            try
            {
                var obj = GetObjectValue(dr, column);
                if (obj == null) return Convert.ToDouble(obj);
                return Convert.ToDouble(obj);
            }
            catch { return 0; }
        }
        public static decimal GetDecimalValue(IDataReader dr, string column)
        {
            try
            {
                var obj = GetObjectValue(dr, column);
                if (obj == null) return Convert.ToDecimal(0);
                return Convert.ToDecimal(obj);
            }
            catch { return Convert.ToDecimal(0); }
        }
        public static Int64 GetBigIntValue(IDataReader dr, string column)
        {
            try
            {
                var obj = GetObjectValue(dr, column);
                if (obj == null) return Convert.ToInt64(0);
                return Convert.ToInt64(obj);
            }
            catch { return Convert.ToInt64(0); }
        }
        public static Int32 GetIntValue(IDataReader dr, string column)
        {
            try
            {
                var obj = GetObjectValue(dr, column);
                if (obj == null) return Convert.ToInt32(0);
                return Convert.ToInt32(obj);
            }
            catch { return Convert.ToInt32(0); }
        }
        public static Int16 GetSmallIntValue(IDataReader dr, string column)
        {
            try
            {
                var obj = GetObjectValue(dr, column);
                if (obj == null) return Convert.ToInt16(0);
                return Convert.ToInt16(obj);
            }
            catch { return Convert.ToInt16(0); }
        }
        public static byte GetTinyIntValue(IDataReader dr, string column)
        {
            try
            {
                var obj = GetObjectValue(dr, column);
                if (obj == null) return Convert.ToByte(0);
                return Convert.ToByte(obj);
            }
            catch { return Convert.ToByte(0); }
        }
        public static DateTime? GetDateTimeValue(IDataReader dr, string column)
        {
            try
            {
                var obj = dr[column];
                if (obj == DBNull.Value || obj == null) { return null; }
                else { return Convert.ToDateTime(obj); }
            }
            catch { return null; }
        }
        public static bool GetBooleanValue(IDataReader dr, string column)
        {
            try
            {
                var obj = GetObjectValue(dr, column);
                if (obj == null) return false;
                return Convert.ToBoolean(obj);
            }
            catch { return false; }
        }
        public static long GetLongValue(IDataReader dr, string column)
        {
            try
            {
                var obj = GetObjectValue(dr, column);
                if (obj == null) return Convert.ToInt64(0);
                return Convert.ToInt64(obj);
            }
            catch { return Convert.ToInt64(0); }
        }
        public static short GetShortValue(IDataReader dr, string column)
        {
            try
            {
                var obj = GetObjectValue(dr, column);
                if (obj == null) return Convert.ToInt16(0);
                return Convert.ToInt16(obj);
            }
            catch { return Convert.ToInt16(0); }
        }
    }
}
