using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bandmate.Models
{
    [Table("shows")]
    public partial class Shows
    {
        [Key]
        [Column("show_id")]
        public Guid ShowId { get; set; }
        [Column("venue_id")]
        public Guid VenueId { get; set; }
        [Column("creation_date", TypeName = "datetime")]
        public DateTime CreationDate { get; set; }
        [Column("start_time", TypeName = "datetime")]
        public DateTime StartTime { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("age")]
        public short? Age { get; set; }

        [ForeignKey(nameof(VenueId))]
        [InverseProperty(nameof(Venues.Shows))]
        public virtual Venues Venue { get; set; }
    }
}
