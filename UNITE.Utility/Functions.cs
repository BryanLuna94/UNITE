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
        public static string MessageError(Exception ex)
        {
            Log.RegistrarLog(NivelLog.Error, ex);
            return ex.Message;
        }
    }
}
