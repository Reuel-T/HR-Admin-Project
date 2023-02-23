using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Hr_API.Models;

public partial class HrAdminContext : DbContext
{
    public HrAdminContext()
    {
    }

    public HrAdminContext(DbContextOptions<HrAdminContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<DepartmentEmployee> DepartmentEmployees { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=CHRIS;Initial Catalog=HR-ADMIN;Trusted_Connection=True;Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("PK__Departme__B2079BCDD41290D7");

            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.DepartmentName)
                .HasMaxLength(64)
                .IsUnicode(false);
        });

        modelBuilder.Entity<DepartmentEmployee>(entity =>
        {
            entity.HasKey(e => e.DepartmentEmployeeId).HasName("PK__Departme__CA3A39034BACE055");

            entity.Property(e => e.DepartmentEmployeeId).HasColumnName("DepartmentEmployeeID");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

            entity.HasOne(d => d.Department).WithMany(p => p.DepartmentEmployees)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Departmen__Depar__3D5E1FD2");

            entity.HasOne(d => d.Employee).WithMany(p => p.DepartmentEmployees)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FK__Departmen__Emplo__3C69FB99");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__7AD04FF14B198029");

            entity.HasIndex(e => e.EmployeeEmailAddress, "UQ__Employee__EA4E01BAAF6D5C33").IsUnique();

            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.EmployeeEmailAddress)
                .HasMaxLength(64)
                .IsUnicode(false);
            entity.Property(e => e.EmployeeFirstName)
                .HasMaxLength(64)
                .IsUnicode(false);
            entity.Property(e => e.EmployeePassword)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EmployeeSurname)
                .HasMaxLength(64)
                .IsUnicode(false);
            entity.Property(e => e.EmployeeTelephoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.ManagerId).HasColumnName("ManagerID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
