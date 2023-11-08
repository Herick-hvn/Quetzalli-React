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
    public class AvisosProductosController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public AvisosProductosController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/AvisosProductos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AvisosProducto>>> GetAvisosProductos()
        {
          if (_context.AvisosProductos == null)
          {
              return NotFound();
          }
            return await _context.AvisosProductos.ToListAsync();
        }

        // GET: api/AvisosProductos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AvisosProducto>> GetAvisosProducto(int id)
        {
          if (_context.AvisosProductos == null)
          {
              return NotFound();
          }
            var avisosProducto = await _context.AvisosProductos.FindAsync(id);

            if (avisosProducto == null)
            {
                return NotFound();
            }

            return avisosProducto;
        }

        // PUT: api/AvisosProductos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAvisosProducto(int id, AvisosProducto avisosProducto)
        {
            if (id != avisosProducto.IdavisosProductos)
            {
                return BadRequest();
            }

            _context.Entry(avisosProducto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AvisosProductoExists(id))
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

        // POST: api/AvisosProductos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AvisosProducto>> PostAvisosProducto(AvisosProducto avisosProducto)
        {
          if (_context.AvisosProductos == null)
          {
              return Problem("Entity set 'QuetzalliDBContext.AvisosProductos'  is null.");
          }
            _context.AvisosProductos.Add(avisosProducto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAvisosProducto", new { id = avisosProducto.IdavisosProductos }, avisosProducto);
        }

        // DELETE: api/AvisosProductos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAvisosProducto(int id)
        {
            if (_context.AvisosProductos == null)
            {
                return NotFound();
            }
            var avisosProducto = await _context.AvisosProductos.FindAsync(id);
            if (avisosProducto == null)
            {
                return NotFound();
            }

            _context.AvisosProductos.Remove(avisosProducto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AvisosProductoExists(int id)
        {
            return (_context.AvisosProductos?.Any(e => e.IdavisosProductos == id)).GetValueOrDefault();
        }
    }
}
