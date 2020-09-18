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
    public class VenuesController : ControllerBase
    {
        private readonly CCIPContext _context;

        public VenuesController(CCIPContext context)
        {
            _context = context;
        }

        // GET: api/Venues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Venues>>> GetVenues()
        {
            return await _context.Venues.ToListAsync();
        }

        // GET: api/Venues/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Venues>> GetVenues(Guid id)
        {
            var venues = await _context.Venues
                .Include(x => x.Shows)
                .FirstOrDefaultAsync(i => i.VenueId == id); ;

            if (venues == null)
            {
                return NotFound();
            }

            return venues;
        }

        // PUT: api/Venues/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVenues(Guid id, Venues venues)
        {
            if (id != venues.VenueId)
            {
                return BadRequest();
            }

            _context.Entry(venues).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VenuesExists(id))
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

        // POST: api/Venues
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Venues>> PostVenues(Venues venues)
        {
            _context.Venues.Add(venues);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVenues", new { id = venues.VenueId }, venues);
        }

        // DELETE: api/Venues/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Venues>> DeleteVenues(Guid id)
        {
            var venues = await _context.Venues.FindAsync(id);
            if (venues == null)
            {
                return NotFound();
            }

            _context.Venues.Remove(venues);
            await _context.SaveChangesAsync();

            return venues;
        }

        private bool VenuesExists(Guid id)
        {
            return _context.Venues.Any(e => e.VenueId == id);
        }
    }
}
