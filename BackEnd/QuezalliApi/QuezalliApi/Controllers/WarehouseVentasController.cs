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
    public class WarehouseVentasController : ControllerBase
    {
        private readonly WarehouseDBContext _context;

        public WarehouseVentasController(WarehouseDBContext context)
        {
            _context = context;
        }

        // GET: api/WarehouseVentas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WarehouseVenta>>> GetWarehouseVenta()
        {
          if (_context.WarehouseVenta == null)
          {
              return NotFound();
          }
            return await _context.WarehouseVenta.ToListAsync();
        }

        // GET: api/WarehouseVentas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseVenta>> GetWarehouseVenta(int id)
        {
          if (_context.WarehouseVenta == null)
          {
              return NotFound();
          }
            var warehouseVenta = await _context.WarehouseVenta.FindAsync(id);

            if (warehouseVenta == null)
            {
                return NotFound();
            }

            return warehouseVenta;
        }

        // PUT: api/WarehouseVentas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWarehouseVenta(int id, WarehouseVenta warehouseVenta)
        {
            if (id != warehouseVenta.IdVenta)
            {
                return BadRequest();
            }

            _context.Entry(warehouseVenta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WarehouseVentaExists(id))
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

        // POST: api/WarehouseVentas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WarehouseVenta>> PostWarehouseVenta(WarehouseVenta warehouseVenta)
        {
          if (_context.WarehouseVenta == null)
          {
              return Problem("Entity set 'WarehouseDBContext.WarehouseVenta'  is null.");
          }
            _context.WarehouseVenta.Add(warehouseVenta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWarehouseVenta", new { id = warehouseVenta.IdVenta }, warehouseVenta);
        }

        // DELETE: api/WarehouseVentas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWarehouseVenta(int id)
        {
            if (_context.WarehouseVenta == null)
            {
                return NotFound();
            }
            var warehouseVenta = await _context.WarehouseVenta.FindAsync(id);
            if (warehouseVenta == null)
            {
                return NotFound();
            }

            _context.WarehouseVenta.Remove(warehouseVenta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WarehouseVentaExists(int id)
        {
            return (_context.WarehouseVenta?.Any(e => e.IdVenta == id)).GetValueOrDefault();
        }
    }
}
