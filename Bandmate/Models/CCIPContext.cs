using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Bandmate.Models
{
    public partial class CCIPContext : DbContext
    {
        public CCIPContext()
        {
        }

        public CCIPContext(DbContextOptions<CCIPContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Articles> Articles { get; set; }
        public virtual DbSet<Artists> Artists { get; set; }
        public virtual DbSet<ArtistsMusicians> ArtistsMusicians { get; set; }
        public virtual DbSet<Genres> Genres { get; set; }
        public virtual DbSet<Instruments> Instruments { get; set; }
        public virtual DbSet<Musicians> Musicians { get; set; }
        public virtual DbSet<Releases> Releases { get; set; }
        public virtual DbSet<Shows> Shows { get; set; }
        public virtual DbSet<ShowsArtists> ShowsArtists { get; set; }
        public virtual DbSet<SocialMedia> SocialMedia { get; set; }
        public virtual DbSet<Venues> Venues { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Articles>(entity =>
            {
                entity.Property(e => e.ArticleId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.CreationDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Writer).IsFixedLength();
            });

            modelBuilder.Entity<Artists>(entity =>
            {
                entity.Property(e => e.ArtistId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.CreationDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.State).IsUnicode(false);

                entity.Property(e => e.Zip).IsFixedLength();
            });

            modelBuilder.Entity<ArtistsMusicians>(entity =>
            {
                entity.HasKey(e => new { e.ArtistId, e.MusicianId });

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.ArtistsMusicians)
                    .HasForeignKey(d => d.ArtistId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_artists_musicians_artists");

                entity.HasOne(d => d.Musician)
                    .WithMany(p => p.ArtistsMusicians)
                    .HasForeignKey(d => d.MusicianId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_artists_musicians_musicians");
            });

            modelBuilder.Entity<Genres>(entity =>
            {
                entity.Property(e => e.GenreId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.Genres)
                    .HasForeignKey(d => d.ArtistId)
                    .HasConstraintName("FK_genres_artists");

                entity.HasOne(d => d.Musician)
                    .WithMany(p => p.Genres)
                    .HasForeignKey(d => d.MusicianId)
                    .HasConstraintName("FK_genres_musicians");
            });

            modelBuilder.Entity<Instruments>(entity =>
            {
                entity.Property(e => e.InstrumentId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.Musician)
                    .WithMany(p => p.Instruments)
                    .HasForeignKey(d => d.MusicianId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_instruments_musicians");
            });

            modelBuilder.Entity<Musicians>(entity =>
            {
                entity.Property(e => e.MusicianId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.CreationDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Zip).IsFixedLength();
            });

            modelBuilder.Entity<Releases>(entity =>
            {
                entity.Property(e => e.ReleaseId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.Releases)
                    .HasForeignKey(d => d.ArtistId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_releases_artists");
            });

            modelBuilder.Entity<Shows>(entity =>
            {
                entity.Property(e => e.ShowId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.StartDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Title).IsUnicode(false);

                entity.HasOne(d => d.Venue)
                    .WithMany(p => p.Shows)
                    .HasForeignKey(d => d.VenueId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_shows_venues");
            });

            modelBuilder.Entity<ShowsArtists>(entity =>
            {
                entity.HasNoKey();

                entity.HasOne(d => d.Artist)
                    .WithMany()
                    .HasForeignKey(d => d.ArtistId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_shows_artists_artists");

                entity.HasOne(d => d.Show)
                    .WithMany()
                    .HasForeignKey(d => d.ShowId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_shows_artists_shows");
            });

            modelBuilder.Entity<SocialMedia>(entity =>
            {
                entity.Property(e => e.SocialMediaId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.SocialMedia)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_social_media_artists");

                entity.HasOne(d => d.UserNavigation)
                    .WithMany(p => p.SocialMedia)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_social_media_musicians");
            });

            modelBuilder.Entity<Venues>(entity =>
            {
                entity.Property(e => e.VenueId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.CreationDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.ProfilePicture).IsUnicode(false);

                entity.Property(e => e.State).IsUnicode(false);

                entity.Property(e => e.Zip).IsFixedLength();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
