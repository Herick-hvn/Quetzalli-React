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
    public class ProductoLotesController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public ProductoLotesController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/ProductoLotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoLote>>> GetProductoLotes()
        {
          if (_context.ProductoLotes == null)
          {
              return NotFound();
          }
            return await _context.ProductoLotes.ToListAsync();
        }

        // GET: api/ProductoLotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoLote>> GetProductoLote(int id)
        {
          if (_context.ProductoLotes == null)
          {
              return NotFound();
          }
            var productoLote = await _context.ProductoLotes.FindAsync(id);

            if (productoLote == null)
            {
                return NotFound();
            }

            return productoLote;
        }

        // PUT: api/ProductoLotes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductoLote(int id, ProductoLote productoLote)
        {
            if (id != productoLote.IdproductoLote)
            {
                return BadRequest();
            }

            _context.Entry(productoLote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoLoteExists(id))
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

        // POST: api/ProductoLotes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductoLote>> PostProductoLote(ProductoLote productoLote)
        {
          if (_context.ProductoLotes == null)
          {
              return Problem("Entity set 'QuetzalliDBContext.ProductoLotes'  is null.");
          }
            _context.ProductoLotes.Add(productoLote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductoLote", new { id = productoLote.IdproductoLote }, productoLote);
        }

        // DELETE: api/ProductoLotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductoLote(int id)
        {
            if (_context.ProductoLotes == null)
            {
                return NotFound();
            }
            var productoLote = await _context.ProductoLotes.FindAsync(id);
            if (productoLote == null)
            {
                return NotFound();
            }

            _context.ProductoLotes.Remove(productoLote);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductoLoteExists(int id)
        {
            return (_context.ProductoLotes?.Any(e => e.IdproductoLote == id)).GetValueOrDefault();
        }
    }
}
