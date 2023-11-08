
using Microsoft.EntityFrameworkCore;

using QuezalliApi.Models;

using QuezalliApi.Models.WarhouseModels;

 

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();



// Add database context configuration

var connectionString = builder.Configuration.GetConnectionString("Quetzalli");

builder.Services.AddDbContext<QuetzalliDBContext>(options =>

    options.UseSqlServer(connectionString));



// Add database context configuration

var connectionStringWarhouse = builder.Configuration.GetConnectionString("Warehouse");

builder.Services.AddDbContext<WarehouseDBContext>(options =>

    options.UseSqlServer(connectionStringWarhouse));





// Enable CORS (permitir solicitudes desde cualquier origen)

builder.Services.AddCors(options =>

{

    options.AddDefaultPolicy(builder =>

    {

        builder.AllowAnyOrigin()

               .AllowAnyMethod()

               .AllowAnyHeader();

    });

});



var app = builder.Build();



// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())

{

    app.UseSwagger();

    app.UseSwaggerUI();

}



app.UseHttpsRedirection();



// Habilitar CORS en el pipeline de solicitudes.

app.UseCors();



app.UseAuthorization();



app.MapControllers();



app.Run();
