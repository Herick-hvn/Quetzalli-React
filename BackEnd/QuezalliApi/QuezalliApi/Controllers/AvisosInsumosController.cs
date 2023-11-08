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
    public class AvisosInsumosController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public AvisosInsumosController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/AvisosInsumos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AvisosInsumo>>> GetAvisosInsumos()
        {
          if (_context.AvisosInsumos == null)
          {
              return NotFound();
          }
            return await _context.AvisosInsumos.ToListAsync();
        }

        // GET: api/AvisosInsumos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AvisosInsumo>> GetAvisosInsumo(int id)
        {
          if (_context.AvisosInsumos == null)
          {
              return NotFound();
          }
            var avisosInsumo = await _context.AvisosInsumos.FindAsync(id);

            if (avisosInsumo == null)
            {
                return NotFound();
            }

            return avisosInsumo;
        }

        // PUT: api/AvisosInsumos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAvisosInsumo(int id, AvisosInsumo avisosInsumo)
        {
            if (id != avisosInsumo.IdavisosProductos)
            {
                return BadRequest();
            }

            _context.Entry(avisosInsumo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AvisosInsumoExists(id))
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

        // POST: api/AvisosInsumos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AvisosInsumo>> PostAvisosInsumo(AvisosInsumo avisosInsumo)
        {
          if (_context.AvisosInsumos == null)
          {
              return Problem("Entity set 'QuetzalliDBContext.AvisosInsumos'  is null.");
          }
            _context.AvisosInsumos.Add(avisosInsumo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAvisosInsumo", new { id = avisosInsumo.IdavisosProductos }, avisosInsumo);
        }

        // DELETE: api/AvisosInsumos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAvisosInsumo(int id)
        {
            if (_context.AvisosInsumos == null)
            {
                return NotFound();
            }
            var avisosInsumo = await _context.AvisosInsumos.FindAsync(id);
            if (avisosInsumo == null)
            {
                return NotFound();
            }

            _context.AvisosInsumos.Remove(avisosInsumo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AvisosInsumoExists(int id)
        {
            return (_context.AvisosInsumos?.Any(e => e.IdavisosProductos == id)).GetValueOrDefault();
        }
    }
}
