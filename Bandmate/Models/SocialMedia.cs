using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bandmate.Models
{
    [Table("social_media")]
    public partial class SocialMedia
    {
        [Key]
        [Column("social_media_id")]
        public Guid SocialMediaId { get; set; }
        [Column("user_id")]
        public Guid UserId { get; set; }
        [Required]
        [Column("app_name")]
        [StringLength(50)]
        public string AppName { get; set; }
        [Required]
        [Column("account")]
        [StringLength(50)]
        public string Account { get; set; }

        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Artists.SocialMedia))]
        public virtual Artists User { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Musicians.SocialMedia))]
        public virtual Musicians UserNavigation { get; set; }
    }
}
