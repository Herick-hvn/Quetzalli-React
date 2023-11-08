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
    public class AvisosController : ControllerBase
    {
        private readonly QuetzalliDBContext _context;

        public AvisosController(QuetzalliDBContext context)
        {
            _context = context;
        }

        // GET: api/Avisos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aviso>>> GetAvisos()
        {
          if (_context.Avisos == null)
          {
              return NotFound();
          }
            return await _context.Avisos.ToListAsync();
        }

        // GET: api/Avisos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Aviso>> GetAviso(int id)
        {
          if (_context.Avisos == null)
          {
              return NotFound();
          }
            var aviso = await _context.Avisos.FindAsync(id);

            if (aviso == null)
            {
                return NotFound();
            }

            return aviso;
        }

        // PUT: api/Avisos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAviso(int id, Aviso aviso)
        {
            if (id != aviso.Idavisos)
            {
                return BadRequest();
            }

            _context.Entry(aviso).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AvisoExists(id))
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

        // POST: api/Avisos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Aviso>> PostAviso(Aviso aviso)
        {
          if (_context.Avisos == null)
          {
              return Problem("Entity set 'QuetzalliDBContext.Avisos'  is null.");
          }
            _context.Avisos.Add(aviso);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAviso", new { id = aviso.Idavisos }, aviso);
        }

        // DELETE: api/Avisos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAviso(int id)
        {
            if (_context.Avisos == null)
            {
                return NotFound();
            }
            var aviso = await _context.Avisos.FindAsync(id);
            if (aviso == null)
            {
                return NotFound();
            }

            _context.Avisos.Remove(aviso);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AvisoExists(int id)
        {
            return (_context.Avisos?.Any(e => e.Idavisos == id)).GetValueOrDefault();
        }
    }
}
