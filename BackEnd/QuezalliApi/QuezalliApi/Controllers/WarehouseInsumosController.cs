using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuezalliApi.Models.WarhouseModels;

namespace QuezalliApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseInsumosController : ControllerBase
    {
        private readonly WarehouseDBContext _context;

        public WarehouseInsumosController(WarehouseDBContext context)
        {
            _context = context;
        }

        // GET: api/WarehouseInsumos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WarehouseInsumo>>> GetWarehouseInsumo()
        {
          if (_context.WarehouseInsumo == null)
          {
              return NotFound();
          }
            return await _context.WarehouseInsumo.ToListAsync();
        }

        // GET: api/WarehouseInsumos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseInsumo>> GetWarehouseInsumo(int id)
        {
          if (_context.WarehouseInsumo == null)
          {
              return NotFound();
          }
            var warehouseInsumo = await _context.WarehouseInsumo.FindAsync(id);

            if (warehouseInsumo == null)
            {
                return NotFound();
            }

            return warehouseInsumo;
        }

        // PUT: api/WarehouseInsumos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWarehouseInsumo(int id, WarehouseInsumo warehouseInsumo)
        {
            if (id != warehouseInsumo.Id)
            {
                return BadRequest();
            }

            _context.Entry(warehouseInsumo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WarehouseInsumoExists(id))
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

        // POST: api/WarehouseInsumos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WarehouseInsumo>> PostWarehouseInsumo(WarehouseInsumo warehouseInsumo)
        {
          if (_context.WarehouseInsumo == null)
          {
              return Problem("Entity set 'WarehouseDBContext.WarehouseInsumo'  is null.");
          }
            _context.WarehouseInsumo.Add(warehouseInsumo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWarehouseInsumo", new { id = warehouseInsumo.Id }, warehouseInsumo);
        }

        // DELETE: api/WarehouseInsumos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWarehouseInsumo(int id)
        {
            if (_context.WarehouseInsumo == null)
            {
                return NotFound();
            }
            var warehouseInsumo = await _context.WarehouseInsumo.FindAsync(id);
            if (warehouseInsumo == null)
            {
                return NotFound();
            }

            _context.WarehouseInsumo.Remove(warehouseInsumo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WarehouseInsumoExists(int id)
        {
            return (_context.WarehouseInsumo?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
