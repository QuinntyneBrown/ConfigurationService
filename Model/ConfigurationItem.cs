using System;
using System.Collections.Generic;
using ConfigurationsService.Data.Helpers;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using static ConfigurationsService.Constants;

namespace ConfigurationsService.Model
{
    [SoftDelete("IsDeleted")]
    public class ConfigurationItem: ILoggable
    {
        public int Id { get; set; }
        
		[ForeignKey("Tenant")]
        public int? TenantId { get; set; }
        
        [ForeignKey("ConfigurationItemKey")]
        public int? ConfigurationItemKeyId { get; set; }
	   
		public string Value { get; set; }

        public ConfigurationItemKey ConfigurationItemKey { get; set; }

        public DateTime CreatedOn { get; set; }
        
		public DateTime LastModifiedOn { get; set; }
        
		public string CreatedBy { get; set; }
        
		public string LastModifiedBy { get; set; }
        
		public bool IsDeleted { get; set; }

        public virtual Tenant Tenant { get; set; }
    }
}
