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
    public class PedidoProductosController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public PedidoProductosController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/PedidoProductos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoProducto>>> GetPedidoProductos()
        {
          if (_context.PedidoProductos == null)
          {
              return NotFound();
          }
            return await _context.PedidoProductos.ToListAsync();
        }

        // GET: api/PedidoProductos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PedidoProducto>> GetPedidoProducto(int id)
        {
          if (_context.PedidoProductos == null)
          {
              return NotFound();
          }
            var pedidoProducto = await _context.PedidoProductos.FindAsync(id);

            if (pedidoProducto == null)
            {
                return NotFound();
            }

            return pedidoProducto;
        }

        // PUT: api/PedidoProductos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPedidoProducto(int id, PedidoProducto pedidoProducto)
        {
            if (id != pedidoProducto.IdpedidoProducto)
            {
                return BadRequest();
            }

            _context.Entry(pedidoProducto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PedidoProductoExists(id))
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

        // POST: api/PedidoProductos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PedidoProducto>> PostPedidoProducto(PedidoProducto pedidoProducto)
        {
          if (_context.PedidoProductos == null)
          {
              return Problem("Entity set 'QuetzalliDBContext.PedidoProductos'  is null.");
          }
            _context.PedidoProductos.Add(pedidoProducto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPedidoProducto", new { id = pedidoProducto.IdpedidoProducto }, pedidoProducto);
        }

        // DELETE: api/PedidoProductos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePedidoProducto(int id)
        {
            if (_context.PedidoProductos == null)
            {
                return NotFound();
            }
            var pedidoProducto = await _context.PedidoProductos.FindAsync(id);
            if (pedidoProducto == null)
            {
                return NotFound();
            }

            _context.PedidoProductos.Remove(pedidoProducto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PedidoProductoExists(int id)
        {
            return (_context.PedidoProductos?.Any(e => e.IdpedidoProducto == id)).GetValueOrDefault();
        }
    }
}
