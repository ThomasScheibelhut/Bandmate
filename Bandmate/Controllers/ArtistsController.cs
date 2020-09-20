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
    public class ArtistsController : ControllerBase
    {
        private readonly CCIPContext _context;

        public ArtistsController(CCIPContext context)
        {
            _context = context;
        }

        // GET: api/Artists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artists>>> GetArtists()
        {
            return await _context.Artists.ToListAsync();
        }
        
        // GET: api/Artists/City/Memphis
        [HttpGet("City/{city}")]
        public async Task<ActionResult<IEnumerable<Artists>>> GetArtistsByCity(string city)
        {
            return await _context.Artists.Include(x => x.Genres).Where(x => x.City == city).ToListAsync();
        }
        
        // GET: api/Artists/Genre/Metal
        [HttpGet("genre/{genre}")]
        public async Task<ActionResult<IEnumerable<Artists>>> GetArtistsByGenre(string genre)
        {
            return await _context.Artists.Include(x => x.Genres).Where(y => y.Genres.Any(z => z.Name == genre)).ToListAsync();
        }

        // GET: api/Artists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Artists>> GetArtists(Guid id)
        {
            var artists = await _context.Artists
                .Include(x => x.ArtistsMusicians)
                .ThenInclude(y => y.Musician)
                .FirstOrDefaultAsync(i => i.ArtistId == id);

            if (artists == null)
            {
                return NotFound();
            }

            return artists;
        }
        
        // PUT: api/Artists/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtists(Guid id, Artists artists)
        {
            if (id != artists.ArtistId)
            {
                return BadRequest();
            }

            _context.Entry(artists).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtistsExists(id))
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

        // POST: api/Artists
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Artists>> PostArtists(Artists artists)
        {
            _context.Artists.Add(artists);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtists", new { id = artists.ArtistId }, artists);
        }

        // DELETE: api/Artists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Artists>> DeleteArtists(Guid id)
        {
            var artists = await _context.Artists.FindAsync(id);
            if (artists == null)
            {
                return NotFound();
            }

            _context.Artists.Remove(artists);
            await _context.SaveChangesAsync();

            return artists;
        }

        private bool ArtistsExists(Guid id)
        {
            return _context.Artists.Any(e => e.ArtistId == id);
        }
    }
}
