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
    public class InsumosController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public InsumosController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/Insumos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Insumo>>> GetInsumos()
        {
          if (_context.Insumos == null)
          {
              return NotFound();
          }
            return await _context.Insumos.ToListAsync();
        }

        // GET: api/Insumos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Insumo>> GetInsumo(int id)
        {
          if (_context.Insumos == null)
          {
              return NotFound();
          }
            var insumo = await _context.Insumos.FindAsync(id);

            if (insumo == null)
            {
                return NotFound();
            }

            return insumo;
        }

        // PUT: api/Insumos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInsumo(int id, Insumo insumo)
        {
            if (id != insumo.Idinsumo)
            {
                return BadRequest();
            }

            _context.Entry(insumo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InsumoExists(id))
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

        // POST: api/Insumos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Insumo>> PostInsumo(Insumo insumo)
        {
          if (_context.Insumos == null)
          {
              return Problem("Entity set 'QuetzalliDBContext.Insumos'  is null.");
          }
            _context.Insumos.Add(insumo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInsumo", new { id = insumo.Idinsumo }, insumo);
        }

        // DELETE: api/Insumos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInsumo(int id)
        {
            if (_context.Insumos == null)
            {
                return NotFound();
            }
            var insumo = await _context.Insumos.FindAsync(id);
            if (insumo == null)
            {
                return NotFound();
            }

            insumo.Estatus = "0"; // Cambiar el estatus a "0" (inactivo)
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool InsumoExists(int id)
        {
            return (_context.Insumos?.Any(e => e.Idinsumo == id)).GetValueOrDefault();
        }
    }
}
