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
        [Column("start_date", TypeName = "datetime")]
        public DateTime StartDate { get; set; }
        [Column("end_date", TypeName = "datetime")]
        public DateTime EndDate { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("age")]
        public short? Age { get; set; }
        [Column("title")]
        public string Title { get; set; }

        [ForeignKey(nameof(VenueId))]
        [InverseProperty(nameof(Venues.Shows))]
        public virtual Venues Venue { get; set; }
    }
}
