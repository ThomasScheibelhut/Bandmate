using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bandmate.Models;

namespace Bandmate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusiciansController : ControllerBase
    {
        private readonly CCIPContext _context;

        public MusiciansController(CCIPContext context)
        {
            _context = context;
        }

        // GET: api/Musicians
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Musicians>>> GetMusicians()
        {
            var musicians = await _context.Musicians.Include(x => x.Genres).ToListAsync();

            return musicians;
        }

        // GET: api/Musicians/City/Memphis
        [HttpGet("City/{city}")]
        public async Task<ActionResult<IEnumerable<Musicians>>> GetMusiciansByCity(string city)
        {
            return await _context.Musicians.Where(x => x.City == city).ToListAsync();
        }

        // GET: api/Musicians/Genre/Metal
        [HttpGet("genre/{genre}")]
        public async Task<ActionResult<IEnumerable<Musicians>>> GetMusiciansByGenre(string genre)
        {
            return await _context.Musicians.Include(x => x.Genres).Where(y=> y.Genres.Any(z=> z.Name == genre)).ToListAsync();
        }

        // GET: api/Musicians/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Musicians>> GetMusicians(Guid id)
        {
            var musicians = await _context.Musicians
                .Include(x => x.Genres)
                .Include(x => x.Instruments)
                .Include(x => x.SocialMedia)
                .FirstOrDefaultAsync(i => i.MusicianId == id);

            if (musicians == null)
            {
                return NotFound();
            }

            return musicians;
        }

        // PUT: api/Musicians/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMusicians(Guid id, Musicians musicians)
        {
            if (id != musicians.MusicianId)
            {
                return BadRequest();
            }

            _context.Entry(musicians).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MusiciansExists(id))
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

        // POST: api/Musicians
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Musicians>> PostMusicians(Musicians musicians)
        {
            _context.Musicians.Add(musicians);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMusicians", new { id = musicians.MusicianId }, musicians);
        }

        // DELETE: api/Musicians/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Musicians>> DeleteMusicians(Guid id)
        {
            var musicians = await _context.Musicians.FindAsync(id);
            if (musicians == null)
            {
                return NotFound();
            }

            _context.Musicians.Remove(musicians);
            await _context.SaveChangesAsync();

            return musicians;
        }

        private bool MusiciansExists(Guid id)
        {
            return _context.Musicians.Any(e => e.MusicianId == id);
        }
    }
}
