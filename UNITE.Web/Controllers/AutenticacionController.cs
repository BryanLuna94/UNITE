using System.Web.Mvc;

namespace UNITE.Web.Controllers
{
    public class AutenticacionController : Controller
    {
        // GET: Autenticacion
        public ActionResult Login()
        {
            return View();
        }
    }
}