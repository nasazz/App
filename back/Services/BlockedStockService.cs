using System.Collections.Generic;
using System.Threading.Tasks;
using back.Data;
using back.Models;
using back.Services;
using Microsoft.EntityFrameworkCore;

namespace back.Services
{
    public class BlockedStockService : IBlockedStockService
    {
        private readonly ApplicationDbContext _context;

        public BlockedStockService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BlockedStock>> GetBlockedStockDataAsync()
        {
            return await _context.BlockedStocks.ToListAsync();
        }

        public async Task AddBlockedStockDataAsync(IEnumerable<BlockedStock> blockedStockData)
        {
            await _context.BlockedStocks.AddRangeAsync(blockedStockData);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAllBlockedStockDataAsync()
        {
            _context.BlockedStocks.RemoveRange(_context.BlockedStocks); // Removes all records
            await _context.SaveChangesAsync(); // Commits the changes to the database
        }
    }
}
