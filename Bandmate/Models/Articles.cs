using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bandmate.Models
{
    [Table("articles")]
    public partial class Articles
    {
        [Key]
        [Column("article_id")]
        public Guid ArticleId { get; set; }
        [Required]
        [Column("title")]
        public string Title { get; set; }
        [Required]
        [Column("thumbnail")]
        public string Thumbnail { get; set; }
        [Required]
        [Column("body")]
        public string Body { get; set; }
        [Column("creation_date", TypeName = "datetime")]
        public DateTime CreationDate { get; set; }
        [Required]
        [Column("writer")]
        [StringLength(10)]
        public string Writer { get; set; }
    }
}
