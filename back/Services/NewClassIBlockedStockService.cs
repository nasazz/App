using System.Collections.Generic;
using System.Threading.Tasks;
using back.Models;



namespace back.Services
{
    public class NewClassIBlockedStockService
    {
            public interface IBlockedStockService
            {
                Task<IEnumerable<BlockedStock>> GetBlockedStockDataAsync();
                Task AddBlockedStockDataAsync(IEnumerable<BlockedStock> blockedStockData);
            }

    }
}