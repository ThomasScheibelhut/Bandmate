using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bandmate.Models
{
    [Table("releases")]
    public partial class Releases
    {
        [Key]
        [Column("release_id")]
        public Guid ReleaseId { get; set; }
        [Column("artist_id")]
        public Guid ArtistId { get; set; }
        [Required]
        [Column("name")]
        public string Name { get; set; }
        [Column("songs")]
        public string Songs { get; set; }
        [Column("release_date", TypeName = "date")]
        public DateTime? ReleaseDate { get; set; }
        [Column("cover")]
        public string Cover { get; set; }

        [ForeignKey(nameof(ArtistId))]
        [InverseProperty(nameof(Artists.Releases))]
        public virtual Artists Artist { get; set; }
    }
}
