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
    public class WarehouseClientesController : ControllerBase
    {
        private readonly WarehouseDBContext _context;

        public WarehouseClientesController(WarehouseDBContext context)
        {
            _context = context;
        }

        // GET: api/WarehouseClientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WarehouseCliente>>> GetWarehouseCliente()
        {
          if (_context.WarehouseCliente == null)
          {
              return NotFound();
          }
            return await _context.WarehouseCliente.ToListAsync();
        }

        // GET: api/WarehouseClientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseCliente>> GetWarehouseCliente(int id)
        {
          if (_context.WarehouseCliente == null)
          {
              return NotFound();
          }
            var warehouseCliente = await _context.WarehouseCliente.FindAsync(id);

            if (warehouseCliente == null)
            {
                return NotFound();
            }

            return warehouseCliente;
        }

        // PUT: api/WarehouseClientes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWarehouseCliente(int id, WarehouseCliente warehouseCliente)
        {
            if (id != warehouseCliente.Id)
            {
                return BadRequest();
            }

            _context.Entry(warehouseCliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WarehouseClienteExists(id))
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

        // POST: api/WarehouseClientes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WarehouseCliente>> PostWarehouseCliente(WarehouseCliente warehouseCliente)
        {
          if (_context.WarehouseCliente == null)
          {
              return Problem("Entity set 'WarehouseDBContext.WarehouseCliente'  is null.");
          }
            _context.WarehouseCliente.Add(warehouseCliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWarehouseCliente", new { id = warehouseCliente.Id }, warehouseCliente);
        }

        // DELETE: api/WarehouseClientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWarehouseCliente(int id)
        {
            if (_context.WarehouseCliente == null)
            {
                return NotFound();
            }
            var warehouseCliente = await _context.WarehouseCliente.FindAsync(id);
            if (warehouseCliente == null)
            {
                return NotFound();
            }

            _context.WarehouseCliente.Remove(warehouseCliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WarehouseClienteExists(int id)
        {
            return (_context.WarehouseCliente?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
