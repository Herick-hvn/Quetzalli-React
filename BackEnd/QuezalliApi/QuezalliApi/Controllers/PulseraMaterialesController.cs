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
    public class PulseraMaterialesController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public PulseraMaterialesController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/PulseraMateriales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PulseraMaterial>>> GetPulseraMateriales()
        {
          if (_context.PulseraMateriales == null)
          {
              return NotFound();
          }
            return await _context.PulseraMateriales.ToListAsync();
        }

        // GET: api/PulseraMateriales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PulseraMaterial>> GetPulseraMaterial(int id)
        {
          if (_context.PulseraMateriales == null)
          {
              return NotFound();
          }
            var pulseraMaterial = await _context.PulseraMateriales.FindAsync(id);

            if (pulseraMaterial == null)
            {
                return NotFound();
            }

            return pulseraMaterial;
        }

        // PUT: api/PulseraMateriales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPulseraMaterial(int id, PulseraMaterial pulseraMaterial)
        {
            if (id != pulseraMaterial.IdPulseraMaterial)
            {
                return BadRequest();
            }

            _context.Entry(pulseraMaterial).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PulseraMaterialExists(id))
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

        // POST: api/PulseraMateriales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PulseraMaterial>> PostPulseraMaterial(PulseraMaterial pulseraMaterial)
        {
          if (_context.PulseraMateriales == null)
          {
              return Problem("Entity set 'QuetzalliDBContext.PulseraMateriales'  is null.");
          }
            _context.PulseraMateriales.Add(pulseraMaterial);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPulseraMaterial", new { id = pulseraMaterial.IdPulseraMaterial }, pulseraMaterial);
        }

        // DELETE: api/PulseraMateriales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePulseraMaterial(int id)
        {
            if (_context.PulseraMateriales == null)
            {
                return NotFound();
            }
            var pulseraMaterial = await _context.PulseraMateriales.FindAsync(id);
            if (pulseraMaterial == null)
            {
                return NotFound();
            }

            _context.PulseraMateriales.Remove(pulseraMaterial);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PulseraMaterialExists(int id)
        {
            return (_context.PulseraMateriales?.Any(e => e.IdPulseraMaterial == id)).GetValueOrDefault();
        }
    }
}
