# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

npm create vite@latest

cd projektnev
npm install
npm run dev




npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev


npm install react-router-dom


framework setup:

Microsoft.EntityFrameworkCore (8.0.20)
Microsoft.EntityFrameworkCore.Design (8.0.20)
Microsoft.EntityFrameworkCore.Tools (8.0.20)
MS SQL server esetén:
Microsoft.EntityFrameworkCore.SqlServer
SQLite esetében az SqlServer helyett:
Microsoft.EntityFrameworkCore.Sqlite
MySQL esetén:
MySql.EntityFrameworkCore (9.0.6)
Models osztályok kiegészítése (1-n):
namespace POOLCAR.Models
{
public class Car
{
[Key]
public int Id { get; set; }
public string Type { get; set; }
public string LicencePlate { get; set; }
public int NumberOfSeats { get; set; }
public DateTime Validity { get; set; }
public string EngineNumber { get; set; }
[JsonIgnore]
public List<PoolCarRegister>? PoolCarRegisters { get; set; } // Navigation property
}
}
using System.ComponentModel.DataAnnotations.Schema;
namespace POOLCAR.Models
{
public class PoolCarRegister
{
[Key]
public int Id { get; set; }
public DateTime StartDateTime { get; set; }
public DateTime EndDateTime { get; set; }
public int KmStart { get; set; }
public int KmEnd { get; set; }
public string DriverName { get; set; }
public int? CarId { get; set; }
[ForeignKey("CarId")]
[JsonIgnore]
public Car? Car { get; set; }
}
}
Ha kötelező megadni az idegen kulcsot, akkor így kell használni:
public int CarId { get; set; }
[ForeignKey("CarId")]
[JsonIgnore]
public Car Car { get; set; } = null!;
Context osztály létrehozása:
using Microsoft.EntityFrameworkCore;
using POOLCAR.Models;
namespace POOLCAR.Entity
{
public class PoolCarContext: DbContext
{
public PoolCarContext(DbContextOptions<PoolCarContext> options) : base(options)
{
}
public DbSet<Car> Cars { get; set; }
public DbSet<PoolCarRegister> PoolCarRegisters { get; set; }
}
}
appsettings.json:
"ConnectionStrings": {
"PoolCarContext": "Data Source=.;Initial Catalog=PoolCar; Integrated
Security=true;TrustServerCertificate=True;"
Ha SQLite, akkor:
" PoolCarContext ": "Data Source=SQLiteTodo.db"
},
Ha MySQL:
"ConnectionStrings": {
" PoolCarContext ": "server=localhost;port=3306;user=root;password=;database= PoolCar "
},
Program.cs fájban:
builder.Services.AddDbContext<PoolCarContext>(db => db.UseSqlServer(
builder.Configuration.GetConnectionString("PoolCarContext")));
Ha SQLite, akkor:
builder.Services.AddDbContext<PoolCarContext>(
db => db.UseSqlite(builder.Configuration.GetConnectionString("PoolCarContext")));
Ha mySQL:
builder.Services.AddDbContext<PoolCarContext>(options => {
options.UseMySQL(builder.Configuration.GetConnectionString("PoolCarContext"));
});
