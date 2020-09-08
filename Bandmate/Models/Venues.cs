using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bandmate.Models
{
    [Table("venues")]
    public partial class Venues
    {
        public Venues()
        {
            Shows = new HashSet<Shows>();
        }

        [Key]
        [Column("venue_id")]
        public Guid VenueId { get; set; }
        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [Column("address")]
        public string Address { get; set; }
        [Required]
        [Column("city")]
        [StringLength(50)]
        public string City { get; set; }
        [Required]
        [Column("state")]
        [StringLength(2)]
        public string State { get; set; }
        [Required]
        [Column("zip")]
        [StringLength(10)]
        public string Zip { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("creation_date", TypeName = "datetime")]
        public DateTime? CreationDate { get; set; }
        [Column("profile_picture")]
        public string ProfilePicture { get; set; }

        [InverseProperty("Venue")]
        public virtual ICollection<Shows> Shows { get; set; }
    }
}
