using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bandmate.Models
{
    [Table("artists_musicians")]
    public partial class ArtistsMusicians
    {
        [Key]
        [Column("artist_id")]
        public Guid ArtistId { get; set; }
        [Key]
        [Column("musician_id")]
        public Guid MusicianId { get; set; }

        [ForeignKey(nameof(ArtistId))]
        [InverseProperty(nameof(Artists.ArtistsMusicians))]
        public virtual Artists Artist { get; set; }
        [ForeignKey(nameof(MusicianId))]
        [InverseProperty(nameof(Musicians.ArtistsMusicians))]
        public virtual Musicians Musician { get; set; }
    }
}
