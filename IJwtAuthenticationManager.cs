using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CursosOnlineAPI.Models;

/*
    Desarrollador: Rogelio Raúl Castañeda Flores 
*/

namespace CursosOnlineAPI
{
    public interface IJwtAuthenticationManager
    {
        string Authenticate(Usuario usuario);
    }
}
