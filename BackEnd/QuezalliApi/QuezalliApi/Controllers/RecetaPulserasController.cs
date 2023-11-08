using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuezalliApi.Models;

namespace QuezalliApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecetaPulserasController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public RecetaPulserasController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/RecetaPulseras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecetaPulsera>>> GetNuevosModelos()
        {
          if (_context.NuevosModelos == null)
          {
              return NotFound();
          }
            return await _context.NuevosModelos.ToListAsync();
        }

        // GET: api/RecetaPulseras/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecetaPulsera>> GetRecetaPulsera(int id)
        {
          if (_context.NuevosModelos == null)
          {
              return NotFound();
          }
            var recetaPulsera = await _context.NuevosModelos.FindAsync(id);

            if (recetaPulsera == null)
            {
                return NotFound();
            }

            return recetaPulsera;
        }

        // PUT: api/RecetaPulseras/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecetaPulsera(int id, RecetaPulsera recetaPulsera)
        {
            if (id != recetaPulsera.IdRecetaPulsera)
            {
                return BadRequest();
            }

            _context.Entry(recetaPulsera).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecetaPulseraExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RecetaPulseras
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RecetaPulsera>> PostRecetaPulsera(RecetaPulsera recetaPulsera)
        {
          if (_context.NuevosModelos == null)
          {
              return Problem("Entity set 'QuetzalliDBContext.NuevosModelos'  is null.");
          }
            _context.NuevosModelos.Add(recetaPulsera);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecetaPulsera", new { id = recetaPulsera.IdRecetaPulsera }, recetaPulsera);
        }

        // DELETE: api/RecetaPulseras/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecetaPulsera(int id)
        {
            var recetaPulsera = await _context.NuevosModelos.FindAsync(id);
            if (recetaPulsera == null)
            {
                return NotFound();
            }

            recetaPulsera.Estatus = "0"; // Cambia el estatus a "0" en lugar de eliminar
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecetaPulseraExists(int id)
        {
            return (_context.NuevosModelos?.Any(e => e.IdRecetaPulsera == id)).GetValueOrDefault();
        }
    }
}
