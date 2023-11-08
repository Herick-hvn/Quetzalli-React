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
    public class InsumoLotesController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public InsumoLotesController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/InsumoLotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InsumoLote>>> GetInsumoLotes()
        {
          if (_context.InsumoLotes == null)
          {
              return NotFound();
          }
            return await _context.InsumoLotes.ToListAsync();
        }

        // GET: api/InsumoLotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InsumoLote>> GetInsumoLote(int id)
        {
          if (_context.InsumoLotes == null)
          {
              return NotFound();
          }
            var insumoLote = await _context.InsumoLotes.FindAsync(id);

            if (insumoLote == null)
            {
                return NotFound();
            }

            return insumoLote;
        }

        // PUT: api/InsumoLotes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInsumoLote(int id, InsumoLote insumoLote)
        {
            if (id != insumoLote.IdproductoLote)
            {
                return BadRequest();
            }

            _context.Entry(insumoLote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InsumoLoteExists(id))
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

        // POST: api/InsumoLotes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InsumoLote>> PostInsumoLote(InsumoLote insumoLote)
        {
          if (_context.InsumoLotes == null)
          {
              return Problem("Entity set 'QuetzalliDBContext.InsumoLotes'  is null.");
          }
            _context.InsumoLotes.Add(insumoLote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInsumoLote", new { id = insumoLote.IdproductoLote }, insumoLote);
        }

        // DELETE: api/InsumoLotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInsumoLote(int id)
        {
            if (_context.InsumoLotes == null)
            {
                return NotFound();
            }
            var insumoLote = await _context.InsumoLotes.FindAsync(id);
            if (insumoLote == null)
            {
                return NotFound();
            }

            _context.InsumoLotes.Remove(insumoLote);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InsumoLoteExists(int id)
        {
            return (_context.InsumoLotes?.Any(e => e.IdproductoLote == id)).GetValueOrDefault();
        }
    }
}
