using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UNITE.Web.Controllers
{
    public class MovimientoController : Controller
    {
        // GET: Movimiento
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult VentaRapida()
        {
            return View();
        }
    }
}