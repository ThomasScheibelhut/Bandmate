using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bandmate.Models
{
    [Table("instruments")]
    public partial class Instruments
    {
        [Key]
        [Column("instrument_id")]
        public Guid InstrumentId { get; set; }
        [Column("musician_id")]
        public Guid MusicianId { get; set; }
        [Required]
        [Column("type")]
        [StringLength(50)]
        public string Type { get; set; }
        [Required]
        [Column("family")]
        [StringLength(50)]
        public string Family { get; set; }

        [ForeignKey(nameof(MusicianId))]
        [InverseProperty(nameof(Musicians.Instruments))]
        public virtual Musicians Musician { get; set; }
    }
}
