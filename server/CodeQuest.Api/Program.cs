using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using CodeQuest.Api;
using CodeQuest.Api.Sandbox;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
});

builder.Services.AddSingleton<SecurityGuard>();
builder.Services.AddSingleton<CompilationService>();
builder.Services.AddSingleton<ProgramRunner>();
builder.Services.AddSingleton<SubmissionEvaluator>();

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? ["http://localhost:5173", "http://127.0.0.1:5173"];

builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy
    .WithOrigins(allowedOrigins)
    .AllowAnyHeader()
    .AllowAnyMethod()));

// Compiling and spawning processes is the expensive part of this API; cap how many submissions
// can be in flight so a burst of clicks cannot saturate the machine.
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddConcurrencyLimiter("execution", limiter =>
    {
        limiter.PermitLimit = Math.Max(2, Environment.ProcessorCount / 2);
        limiter.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiter.QueueLimit = 32;
    });
});

var app = builder.Build();

app.UseCors();
app.UseRateLimiter();

// The published frontend is copied into wwwroot; in dev it does not exist and Vite serves the app,
// so skipping the static file pipeline entirely keeps `dotnet run` output clean.
var servesFrontend = Directory.Exists(app.Environment.WebRootPath ?? string.Empty);
if (servesFrontend)
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
}

app.MapGet("/api/health", () => Results.Ok(new
{
    status = "ok",
    runtime = Environment.Version.ToString(),
    timestamp = DateTimeOffset.UtcNow,
}));

app.MapPost("/api/execute", async (
        [FromBody] ExecuteRequest request,
        SubmissionEvaluator evaluator,
        CancellationToken cancellationToken) =>
    Results.Ok(await evaluator.EvaluateAsync(request, cancellationToken)))
    .RequireRateLimiting("execution");

// Housekeeping: emitted assemblies pile up in the temp folder across sessions.
app.Services.GetRequiredService<CompilationService>().PruneCache(TimeSpan.FromDays(2));

if (servesFrontend)
{
    app.MapFallbackToFile("index.html");
}

app.Run();
