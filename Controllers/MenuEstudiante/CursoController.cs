﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CursosOnlineAPI.Controllers.MenuEstudiante
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("permitir")]
    public class CursoController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var cursos = (from d in db.Cursos.Where(p => p.Estado == true)
                                select d).ToList();

                return Ok(cursos);
            }

        }
    }
}