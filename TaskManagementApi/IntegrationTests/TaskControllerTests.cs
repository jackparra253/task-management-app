using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace TaskManagementApi.IntegrationTests
{
    public class TaskControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public TaskControllerTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public void GetTasks_ReturnsSuccessStatusCode()
        {
            // Arrange
            var client = _factory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + GetValidToken());

            // Act
            var response = client.GetAsync("/api/tasks").Result;

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public void CreateTask_ReturnsCreatedStatusCode()
        {
            // Arrange
            var client = _factory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + GetValidToken());
            var newTask = new
            {
                Title = "Test Task",
                Description = "This is a test task",
                DueDate = DateTime.Now.AddDays(7),
                Status = "pending"
            };

            // Act
            var response = client.PostAsJsonAsync("/api/tasks", newTask).Result;

            // Assert
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }

        private string GetValidToken()
        {
            // Implement this method to return a valid JWT token for testing
            // You might want to create a helper method or use a test user
            return "your_valid_jwt_token_here";
        }
    }
}