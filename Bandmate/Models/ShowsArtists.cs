using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bandmate.Models
{
    [Table("shows_artists")]
    public partial class ShowsArtists
    {
        [Column("show_id")]
        public Guid ShowId { get; set; }
        [Column("artist_id")]
        public Guid ArtistId { get; set; }

        [ForeignKey(nameof(ArtistId))]
        public virtual Artists Artist { get; set; }
        [ForeignKey(nameof(ShowId))]
        public virtual Shows Show { get; set; }
    }
}
