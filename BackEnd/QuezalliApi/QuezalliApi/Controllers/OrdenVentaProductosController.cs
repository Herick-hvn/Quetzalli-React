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
    public class OrdenVentaProductosController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public OrdenVentaProductosController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/OrdenVentaProductos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrdenVentaProducto>>> GetOrdenVentaProductos()
        {
          if (_context.OrdenVentaProductos == null)
          {
              return NotFound();
          }
            return await _context.OrdenVentaProductos.ToListAsync();
        }

        // GET: api/OrdenVentaProductos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrdenVentaProducto>> GetOrdenVentaProducto(int id)
        {
          if (_context.OrdenVentaProductos == null)
          {
              return NotFound();
          }
            var ordenVentaProducto = await _context.OrdenVentaProductos.FindAsync(id);

            if (ordenVentaProducto == null)
            {
                return NotFound();
            }

            return ordenVentaProducto;
        }

        // PUT: api/OrdenVentaProductos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrdenVentaProducto(int id, OrdenVentaProducto ordenVentaProducto)
        {
            if (id != ordenVentaProducto.IdordenVentaProducto)
            {
                return BadRequest();
            }

            _context.Entry(ordenVentaProducto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdenVentaProductoExists(id))
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

        // POST: api/OrdenVentaProductos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrdenVentaProducto>> PostOrdenVentaProducto(OrdenVentaProducto ordenVentaProducto)
        {
          if (_context.OrdenVentaProductos == null)
          {
              return Problem("Entity set 'QuetzalliDBContext.OrdenVentaProductos'  is null.");
          }
            _context.OrdenVentaProductos.Add(ordenVentaProducto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrdenVentaProducto", new { id = ordenVentaProducto.IdordenVentaProducto }, ordenVentaProducto);
        }

        // DELETE: api/OrdenVentaProductos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrdenVentaProducto(int id)
        {
            if (_context.OrdenVentaProductos == null)
            {
                return NotFound();
            }
            var ordenVentaProducto = await _context.OrdenVentaProductos.FindAsync(id);
            if (ordenVentaProducto == null)
            {
                return NotFound();
            }

            _context.OrdenVentaProductos.Remove(ordenVentaProducto);
            await _context.SaveChangesAsync();

            return NoContent();
        } 

        private bool OrdenVentaProductoExists(int id)
        {
            return (_context.OrdenVentaProductos?.Any(e => e.IdordenVentaProducto == id)).GetValueOrDefault();
        }
    }
}
