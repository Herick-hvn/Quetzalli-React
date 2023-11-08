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
    public class LibrorecetasController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public LibrorecetasController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/Librorecetas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Libroreceta>>> GetLibrorecetas()
        {
          if (_context.Librorecetas == null)
          {
              return NotFound();
          }
            return await _context.Librorecetas.ToListAsync();
        }

        // GET: api/Librorecetas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Libroreceta>> GetLibroreceta(int id)
        {
          if (_context.Librorecetas == null)
          {
              return NotFound();
          }
            var libroreceta = await _context.Librorecetas.FindAsync(id);

            if (libroreceta == null)
            {
                return NotFound();
            }

            return libroreceta;
        }

        // PUT: api/Librorecetas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibroreceta(int id, Libroreceta libroreceta)
        {
            if (id != libroreceta.IdlibroRecetas)
            {
                return BadRequest();
            }

            _context.Entry(libroreceta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LibrorecetaExists(id))
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

        // POST: api/Librorecetas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Libroreceta>> PostLibroreceta(Libroreceta libroreceta)
        {
          if (_context.Librorecetas == null)
          {
              return Problem("Entity set 'QuetzalliDBContext.Librorecetas'  is null.");
          }
            _context.Librorecetas.Add(libroreceta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLibroreceta", new { id = libroreceta.IdlibroRecetas }, libroreceta);
        }

        // DELETE: api/Librorecetas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibroreceta(int id)
        {
            if (_context.Librorecetas == null)
            {
                return NotFound();
            }
            var libroreceta = await _context.Librorecetas.FindAsync(id);
            if (libroreceta == null)
            {
                return NotFound();
            }

            _context.Librorecetas.Remove(libroreceta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LibrorecetaExists(int id)
        {
            return (_context.Librorecetas?.Any(e => e.IdlibroRecetas == id)).GetValueOrDefault();
        }
    }
}
