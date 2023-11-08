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
    public class WarehouseProductosController : ControllerBase
    {
        private readonly WarehouseDBContext _context;

        public WarehouseProductosController(WarehouseDBContext context)
        {
            _context = context;
        }

        // GET: api/WarehouseProductos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WarehouseProducto>>> GetWarehouseProducto()
        {
          if (_context.WarehouseProducto == null)
          {
              return NotFound();
          }
            return await _context.WarehouseProducto.ToListAsync();
        }

        // GET: api/WarehouseProductos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseProducto>> GetWarehouseProducto(int id)
        {
          if (_context.WarehouseProducto == null)
          {
              return NotFound();
          }
            var warehouseProducto = await _context.WarehouseProducto.FindAsync(id);

            if (warehouseProducto == null)
            {
                return NotFound();
            }

            return warehouseProducto;
        }

        // PUT: api/WarehouseProductos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWarehouseProducto(int id, WarehouseProducto warehouseProducto)
        {
            if (id != warehouseProducto.Id)
            {
                return BadRequest();
            }

            _context.Entry(warehouseProducto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WarehouseProductoExists(id))
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

        // POST: api/WarehouseProductos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WarehouseProducto>> PostWarehouseProducto(WarehouseProducto warehouseProducto)
        {
          if (_context.WarehouseProducto == null)
          {
              return Problem("Entity set 'WarehouseDBContext.WarehouseProducto'  is null.");
          }
            _context.WarehouseProducto.Add(warehouseProducto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWarehouseProducto", new { id = warehouseProducto.Id }, warehouseProducto);
        }

        // DELETE: api/WarehouseProductos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWarehouseProducto(int id)
        {
            if (_context.WarehouseProducto == null)
            {
                return NotFound();
            }
            var warehouseProducto = await _context.WarehouseProducto.FindAsync(id);
            if (warehouseProducto == null)
            {
                return NotFound();
            }

            _context.WarehouseProducto.Remove(warehouseProducto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WarehouseProductoExists(int id)
        {
            return (_context.WarehouseProducto?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
