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
    public class ShowsController : ControllerBase
    {
        private readonly CCIPContext _context;

        public ShowsController(CCIPContext context)
        {
            _context = context;
        }

        // GET: api/Shows
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shows>>> GetShows()
        {
            return await _context.Shows.ToListAsync();
        }

        // GET: api/Shows/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Shows>> GetShows(Guid id)
        {
            var shows = await _context.Shows.FindAsync(id);

            if (shows == null)
            {
                return NotFound();
            }

            return shows;
        }

        // PUT: api/Shows/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShows(Guid id, Shows shows)
        {
            if (id != shows.ShowId)
            {
                return BadRequest();
            }

            _context.Entry(shows).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShowsExists(id))
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

        // POST: api/Shows
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Shows>> PostShows(Shows shows)
        {
            _context.Shows.Add(shows);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShows", new { id = shows.ShowId }, shows);
        }

        // DELETE: api/Shows/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Shows>> DeleteShows(Guid id)
        {
            var shows = await _context.Shows.FindAsync(id);
            if (shows == null)
            {
                return NotFound();
            }

            _context.Shows.Remove(shows);
            await _context.SaveChangesAsync();

            return shows;
        }

        private bool ShowsExists(Guid id)
        {
            return _context.Shows.Any(e => e.ShowId == id);
        }
    }
}
