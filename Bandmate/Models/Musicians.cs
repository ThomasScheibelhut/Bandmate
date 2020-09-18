using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bandmate.Models
{
    [Table("musicians")]
    public partial class Musicians
    {
        public Musicians()
        {
            ArtistsMusicians = new HashSet<ArtistsMusicians>();
            Genres = new HashSet<Genres>();
            Instruments = new HashSet<Instruments>();
            SocialMedia = new HashSet<SocialMedia>();
        }

        [Key]
        [Column("musician_id")]
        public Guid MusicianId { get; set; }
        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [Column("city")]
        public string City { get; set; }
        [Required]
        [Column("state")]
        [StringLength(50)]
        public string State { get; set; }
        [Required]
        [Column("zip")]
        [StringLength(10)]
        public string Zip { get; set; }
        [Column("creation_date", TypeName = "datetime")]
        public DateTime CreationDate { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("profile_picture")]
        public string ProfilePicture { get; set; }
        [Column("open_to_gigs")]
        public bool OpenToGigs { get; set; }
        [Column("open_to_recording")]
        public bool OpenToRecording { get; set; }
        [Column("open_to_joining_bands")]
        public bool OpenToJoiningBands { get; set; }
        [Column("login")]
        [StringLength(15)]
        public string Login { get; set; }

        [InverseProperty("Musician")]
        public virtual ICollection<ArtistsMusicians> ArtistsMusicians { get; set; }
        [InverseProperty("Musician")]
        public virtual ICollection<Genres> Genres { get; set; }
        [InverseProperty("Musician")]
        public virtual ICollection<Instruments> Instruments { get; set; }
        [InverseProperty("UserNavigation")]
        public virtual ICollection<SocialMedia> SocialMedia { get; set; }
    }
}
