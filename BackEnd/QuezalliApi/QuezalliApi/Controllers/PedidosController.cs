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
    public class PedidosController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public PedidosController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/Pedidos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidos()
        {
          if (_context.Pedidos == null)
          {
              return NotFound();
          }
            return await _context.Pedidos.ToListAsync();
        }

        // GET: api/Pedidos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pedido>> GetPedido(int id)
        {
          if (_context.Pedidos == null)
          {
              return NotFound();
          }
            var pedido = await _context.Pedidos.FindAsync(id);

            if (pedido == null)
            {
                return NotFound();
            }

            return pedido;
        }

        // PUT: api/Pedidos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPedido(int id, Pedido pedido)
        {
            if (id != pedido.IdPedidos)
            {
                return BadRequest();
            }

            _context.Entry(pedido).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PedidoExists(id))
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
        // POST: api/Pedidos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Pedido>> PostPedido(Pedido pedido)
        {
            if (_context.Pedidos == null || _context.Carrito == null)
            {
                return Problem("Entity set 'QuetzalliDBContext.Pedidos' or 'QuetzalliDBContext.Carrito' is null.");
            }

            // Eliminar registros de Carrito con el mismo IdCliente que llega en el nuevo pedido
            var carritosCliente = _context.Carrito.Where(c => c.IdCliente == pedido.IdCliente);
            _context.Carrito.RemoveRange(carritosCliente);

            // Agregar el nuevo pedido
            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPedido", new { id = pedido.IdPedidos }, pedido);
        }


        // DELETE: api/Pedidos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePedido(int id)
        {
            if (_context.Pedidos == null)
            {
                return NotFound();
            }
            var pedido = await _context.Pedidos.FindAsync(id);
            if (pedido == null)
            {
                return NotFound();
            }

            _context.Pedidos.Remove(pedido);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("informacion/{idPedido}")]
        public IActionResult ObtenerInformacionPedido(int idPedido)
        {
            var informacionPedido = _context.Pedidos
                .Where(p => p.IdPedidos == idPedido)
                .Select(p => new
                {
                    Cliente = _context.Personas
                        .Where(persona => persona.IdUsuario == p.IdCliente)
                        .Select(persona => new
                        {
                            Nombre = persona.Nombre,
                            Correo = _context.Users
                                .Where(user => user.Id == persona.IdUsuario)
                                .Select(user => user.Email)
                                .FirstOrDefault(),
                            Telefono = persona.Telefono
                        })
                        .FirstOrDefault(),

                    Pedido = new
                    {
                        Total = p.total,
                        Estatus = p.Estatus
                    },

                    Productos = _context.PedidoProductos
                        .Where(pp => pp.IdPedidos == idPedido)
                        .Select(pp => new
                        {
                            Producto = _context.Productos
                                .Where(producto => producto.Idproductos == pp.IdProducto)
                                .Select(producto => new
                                {
                                    Foto = producto.Foto,
                                    Observaciones = producto.Observaciones,
                                    Nombre = producto.NombreProducto,
                                    Descripcion = producto.Descripcion,
                                    PrecioVenta = producto.PrecioVenta
                                })
                                .FirstOrDefault(),

                            Cantidad = pp.Cantidad
                        })
                        .ToList()
                })
                .FirstOrDefault();

            if (informacionPedido == null)
            {
                return NotFound(); // Si no se encontró el pedido, devolver un 404
            }

            return Ok(informacionPedido); // Devolver la información encontrada en formato JSON
        }


        private bool PedidoExists(int id)
        {
            return (_context.Pedidos?.Any(e => e.IdPedidos == id)).GetValueOrDefault();
        }
    }
}
