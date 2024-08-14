using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace back.Models
{
    public class BlockedStock
    {
        [Key]
        public Guid Id { get; set; } // Guid for database ID
        public string BlockedStockID { get; set; } = string.Empty; // Additional ID from Excel file
        public string PnPlant { get; set; } = string.Empty; // Column for `pn-plant`
        public string Team { get; set; } = string.Empty; // Column for `Team`
        public int BlockedSinceDays { get; set; } // Column for `Blocked Since (Days)`
       public string ComponentOrFG { get; set; } = string.Empty; // Column for `Component /FG`
       public string TradeInterco { get; set; } = string.Empty;// Column for `Trade/Interco`
    }
}