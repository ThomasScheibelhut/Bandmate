using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bandmate.Models
{
    [Table("genres")]
    public partial class Genres
    {
        [Key]
        [Column("genre_id")]
        public Guid GenreId { get; set; }
        [Column("artist_id")]
        public Guid ArtistId { get; set; }
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }

        [ForeignKey(nameof(ArtistId))]
        [InverseProperty(nameof(Artists.Genres))]
        public virtual Artists Artist { get; set; }
        [ForeignKey(nameof(ArtistId))]
        [InverseProperty(nameof(Musicians.Genres))]
        public virtual Musicians ArtistNavigation { get; set; }
    }
}
