using System.Net;
using System.Text.Json;

namespace EmployeeManagement.API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (UnauthorizedAccessException ex)
            {
                await HandleException(
                    context,
                    HttpStatusCode.Forbidden,
                    "Forbidden",
                    ex.Message);
            }
            catch (ArgumentException ex)
            {
                await HandleException(
                    context,
                    HttpStatusCode.BadRequest,
                    "Bad Request",
                    ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                await HandleException(
                    context,
                    HttpStatusCode.NotFound,
                    "Not Found",
                    ex.Message);
            }
            catch (Exception ex)
            {
                // Log the actual error on the server
                Console.WriteLine("====================================");
                Console.WriteLine("UNHANDLED EXCEPTION");
                Console.WriteLine($"Message: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                Console.WriteLine("====================================");

                await HandleException(
                    context,
                    HttpStatusCode.InternalServerError,
                    "Internal Server Error",
                    "An unexpected error occurred.");
            }
        }

        private static async Task HandleException(
            HttpContext context,
            HttpStatusCode statusCode,
            string error,
            string message)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            var response = new
            {
                success = false,
                statusCode = (int)statusCode,
                error = error,
                message = message,
                path = context.Request.Path.ToString(),
                timestamp = DateTime.UtcNow
            };

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(response));
        }
    }
}