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
    public class CarritoController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public CarritoController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/Carritoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carrito>>> GetCarrito()
        {
            if (_context.Carrito == null)
            {
                return NotFound();
            }
            return await _context.Carrito.ToListAsync();
        }
        // GET: api/Carrito/clienteId
        [HttpGet("{clienteId}")]
        public async Task<ActionResult<IEnumerable<Carrito>>> GetCarrito(int clienteId)
        {
            var carritos = await _context.Carrito
                                    .Where(c => c.IdCliente == clienteId)
                                    .ToListAsync();

            if (carritos == null || !carritos.Any())
            {
                return NotFound();
            }

            return carritos;
        }

        // PUT: api/Carrito/clienteId/productoId
        [HttpPut("{clienteId}/{productoId}")]
        public async Task<IActionResult> PutCarrito(int clienteId, int productoId, [FromBody] int nuevaCantidad)
        {
            var existingCarrito = await _context.Carrito.FirstOrDefaultAsync(c => c.IdCliente == clienteId && c.IdProducto == productoId);

            if (existingCarrito == null)
            {
                return NotFound();
            }

            existingCarrito.Cantidad = nuevaCantidad; // Actualizar solo la cantidad

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarritoExists(clienteId, productoId))
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

        private bool CarritoExists(int idCliente, int idProducto)
        {
            return (_context.Carrito?.Any(e => e.IdCliente == idCliente && e.IdProducto == idProducto)).GetValueOrDefault();
        }



        // POST: api/Carrito
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Carrito>> PostCarrito(Carrito carrito)
        {
            if (_context.Carrito == null)
            {
                return Problem("Entity set 'QuetzalliDBContext.Carrito'  is null.");
            }
            _context.Carrito.Add(carrito);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarrito", new { id = carrito.IdCarrito }, carrito);
        }



        // DELETE: api/Carrito/clienteId/productoId
        [HttpDelete("{clienteId}/{productoId}")]
        public async Task<IActionResult> DeleteCarrito(int clienteId, int productoId)
        {
            var carrito = await _context.Carrito.FirstOrDefaultAsync(c => c.IdCliente == clienteId && c.IdProducto == productoId);

            if (carrito == null)
            {
                return NotFound();
            }

            _context.Carrito.Remove(carrito);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool CarritoExists(int id)
        {
            return (_context.Carrito?.Any(e => e.IdCarrito == id)).GetValueOrDefault();
        }
    }
}
