using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Models;

namespace back.Services
{
    public interface IBlockedStockService
    {
        Task<IEnumerable<BlockedStock>> GetBlockedStockDataAsync();
        Task AddBlockedStockDataAsync(IEnumerable<BlockedStock> blockedStockData);
        Task DeleteAllBlockedStockDataAsync();

    }
}