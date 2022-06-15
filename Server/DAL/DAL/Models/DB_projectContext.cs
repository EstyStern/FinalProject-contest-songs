using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace DAL.Models
{
    public partial class DB_projectContext : DbContext
    {
        public DB_projectContext()
        {
        }

        public DB_projectContext(DbContextOptions<DB_projectContext> options)
            : base(options)
        {
        }

        public virtual DbSet<JudgForPlanTbl> JudgForPlanTbls { get; set; }
        public virtual DbSet<JudgeTbl> JudgeTbls { get; set; }
        public virtual DbSet<MessageTbl> MessageTbls { get; set; }
        public virtual DbSet<PlanTbl> PlanTbls { get; set; }
        public virtual DbSet<RatingTbl> RatingTbls { get; set; }
        public virtual DbSet<SingerTbl> SingerTbls { get; set; }
        public virtual DbSet<SongTbl> SongTbls { get; set; }
        public virtual DbSet<StepInPlanTbl> StepInPlanTbls { get; set; }
        public virtual DbSet<TypePlanTbl> TypePlanTbls { get; set; }
        public virtual DbSet<UserTbl> UserTbls { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-42NCSL4\\SQLEXPRESS;Database=DB_project;Trusted_Connection=True;");
                //services.AddDbContext<DB_projectContext>(option => option.UseSqlServer("Server=DESKTOP-42NCSL4\\SQLEXPRESS;Database=DB_project;Trusted_Connection=True;"));

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Hebrew_CI_AS");

            modelBuilder.Entity<JudgForPlanTbl>(entity =>
            {
                entity.HasKey(e => e.JudgForPlanId);

                entity.ToTable("JudgForPlanTbl");

                entity.HasOne(d => d.Plan)
                    .WithMany(p => p.JudgForPlanTbls)
                    .HasForeignKey(d => d.PlanId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_JudgForPlanTbl_PlanTbl");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.JudgForPlanTbls)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_JudgForPlanTbl_UserTbl");
            });

            modelBuilder.Entity<JudgeTbl>(entity =>
            {
                entity.HasKey(e => e.JudgeId);

                entity.ToTable("JudgeTbl");

                entity.Property(e => e.JudgePic)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.JudgeResume)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.JudgeType)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.JudgeTbls)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_JudgeTbl_UserTbl");
            });

            modelBuilder.Entity<MessageTbl>(entity =>
            {
                entity.HasKey(e => e.MessageId);

                entity.ToTable("MessageTbl");

                entity.Property(e => e.MessageDate).HasColumnType("datetime");

                entity.Property(e => e.MessageValue)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.MessageTbls)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MessageTbl_UserTbl");
            });

            modelBuilder.Entity<PlanTbl>(entity =>
            {
                entity.HasKey(e => e.PlanId);

                entity.ToTable("PlanTbl");

                entity.Property(e => e.Pic)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PlanName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PlanStartDate).HasColumnType("datetime");

                entity.HasOne(d => d.TypePlan)
                    .WithMany(p => p.PlanTbls)
                    .HasForeignKey(d => d.TypePlanId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PlanTbl_TypePlanTbl");
            });

            modelBuilder.Entity<RatingTbl>(entity =>
            {
                entity.HasKey(e => e.RatingId);

                entity.ToTable("RatingTbl");

                entity.Property(e => e.RatingExplanation).IsUnicode(false);

                entity.HasOne(d => d.Song)
                    .WithMany(p => p.RatingTbls)
                    .HasForeignKey(d => d.SongId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RatingTbl_SongTbl");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.RatingTbls)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RatingTbl_UserTbl");
            });

            modelBuilder.Entity<SingerTbl>(entity =>
            {
                entity.HasKey(e => e.SingerId);

                entity.ToTable("SingerTbl");

                entity.Property(e => e.SingerCancalingReason).IsUnicode(false);

                entity.Property(e => e.SingerImg)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SingerResume)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SingerStatus)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.SingerTbls)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SingerTbl_UserTbl");
            });

            modelBuilder.Entity<SongTbl>(entity =>
            {
                entity.HasKey(e => e.SongId);

                entity.ToTable("SongTbl");

                entity.Property(e => e.SongChoosingReason)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.SongComment).IsUnicode(false);

                entity.Property(e => e.SongComposer)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SongFile)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SongName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SongPrecessor)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SongStatus)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.StepInPlan)
                    .WithMany(p => p.SongTbls)
                    .HasForeignKey(d => d.StepInPlanId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SongTbl_StepInPlanTbl");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.SongTbls)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SongTbl_UserTbl");
            });

            modelBuilder.Entity<StepInPlanTbl>(entity =>
            {
                entity.HasKey(e => e.StepInPlanId);

                entity.ToTable("StepInPlanTbl");

                entity.Property(e => e.PlanId).HasColumnName("PlanID");

                entity.Property(e => e.StepInPlanEndDateToJudg).HasColumnType("datetime");

                entity.Property(e => e.StepInPlanEndDateToRating).HasColumnType("datetime");

                entity.Property(e => e.StepInPlanEndDateToUploadSong).HasColumnType("datetime");

                entity.Property(e => e.StepInPlanStartDate).HasColumnType("datetime");

                entity.HasOne(d => d.Plan)
                    .WithMany(p => p.StepInPlanTbls)
                    .HasForeignKey(d => d.PlanId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StepInPlanTbl_PlanTbl");
            });

            modelBuilder.Entity<TypePlanTbl>(entity =>
            {
                entity.HasKey(e => e.TypePlanId);

                entity.ToTable("TypePlanTbl");

                entity.Property(e => e.TypePlanName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserTbl>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("UserTbl");

                entity.Property(e => e.UserBirthDate).HasColumnType("date");

                entity.Property(e => e.UserCity)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserEmail)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserFirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserGender)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UserGenre)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UserLastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserPass)
                    .IsRequired()
                    .HasMaxLength(9)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
