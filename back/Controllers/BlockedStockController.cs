using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using back.Models;
using back.Services;
using OfficeOpenXml;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlockedStockController : ControllerBase
    {
        private readonly IBlockedStockService _blockedStockService;

        public BlockedStockController(IBlockedStockService blockedStockService)
        {
            _blockedStockService = blockedStockService;
        }

        // Endpoint to get all blocked stock data
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlockedStock>>> GetBlockedStockData()
        {
            try
            {
                var data = await _blockedStockService.GetBlockedStockDataAsync();
                return Ok(data);
            }
            catch (Exception ex)
            {
                // Log exception (not shown here)
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving blocked stock data");
            }
        }

        // Endpoint to import data from an Excel file
[HttpPost("import")]
public async Task<IActionResult> ImportBlockedStockData(IFormFile file)
{
    if (file == null || file.Length == 0)
    {
        return BadRequest("No file uploaded.");
    }

    try
    {
        using (var stream = new MemoryStream())
        {
            await file.CopyToAsync(stream);
            using (var package = new ExcelPackage(stream))
            {
                var worksheet = package.Workbook.Worksheets[0]; // Assumes data is in the first worksheet
                var rowCount = worksheet.Dimension?.Rows ?? 0;

                if (rowCount <= 3) // Ensure there are rows to process
                {
                    return BadRequest("No data found in the Excel file.");
                }

                var blockedStockList = new List<BlockedStock>();

                for (int row = 3; row <= rowCount; row++) // Assuming the first row is the header
                {
                    try
                    {
                        var blockedStockID = worksheet.Cells[row, 4].Text.Trim();
                        var pnPlant = worksheet.Cells[row, 2].Text.Trim();
                        var team = worksheet.Cells[row, 3].Text.Trim();
                        var blockedSinceDaysText = worksheet.Cells[row, 15].Text.Trim();
                        var componentOrFG = worksheet.Cells[row, 18].Text.Trim();
                        var tradeInterco = worksheet.Cells[row, 19].Text.Trim();

                        // Skip row if essential data is missing
                        if (string.IsNullOrEmpty(blockedStockID) || 
                            string.IsNullOrEmpty(pnPlant) ||
                            string.IsNullOrEmpty(team) ||
                            string.IsNullOrEmpty(componentOrFG) ||
                            string.IsNullOrEmpty(tradeInterco))
                        {
                            continue;
                        }

                        // Handle conversion with default values
                        if (!int.TryParse(blockedSinceDaysText, out int blockedSinceDays))
                        {
                            blockedSinceDays = 0; // or handle it as needed
                        }

                        var blockedStock = new BlockedStock
                        {
                            BlockedStockID = blockedStockID,
                            PnPlant = pnPlant,
                            Team = team,
                            BlockedSinceDays = blockedSinceDays,
                            ComponentOrFG = componentOrFG,
                            TradeInterco = tradeInterco
                        };

                        blockedStockList.Add(blockedStock);
                    }
                    catch (Exception ex)
                    {
                        // Log exception (not shown here)
                        return BadRequest($"Error processing row {row}: {ex.Message}");
                    }
                }

                await _blockedStockService.AddBlockedStockDataAsync(blockedStockList);
            }
        }

        return Ok("File imported successfully.");
    }
    catch (Exception ex)
    {
        // Log exception (not shown here)
        return StatusCode(StatusCodes.Status500InternalServerError, "Error importing file");
    }
}
[HttpDelete("delete-all")]
public async Task<IActionResult> DeleteAllBlockedStockData()
{
    try
    {
        await _blockedStockService.DeleteAllBlockedStockDataAsync();
        return Ok("All blocked stock data deleted successfully.");
    }
    catch (Exception ex)
    {
        // Log exception (not shown here)
        return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting blocked stock data");
    }
}
    }
}
