using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bandmate.Models
{
    [Table("artists_musicians")]
    public partial class ArtistsMusicians
    {
        [Column("artist_id")]
        public Guid ArtistId { get; set; }
        [Column("musician_id")]
        public Guid MusicianId { get; set; }
    }
}
