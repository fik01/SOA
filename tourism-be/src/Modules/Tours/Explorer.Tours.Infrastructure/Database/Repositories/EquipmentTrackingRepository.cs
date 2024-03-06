using Explorer.BuildingBlocks.Core.Domain;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;
using FluentResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Infrastructure.Database.Repositories
{
    public class EquipmentTrackingRepository :  IEquipmentTrackingRepository
    {
        private readonly ToursContext _dbContext;
        private readonly DbSet<EquipmentTracking> _dbSet;
        public EquipmentTrackingRepository(ToursContext dbContext) {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<EquipmentTracking>();
        }
        public EquipmentTracking GetByTouristId(long id)
        {
            return _dbContext.EquipmentTrackings.FirstOrDefault(et => et.TouristId == id);
        }

        public EquipmentTracking Update(EquipmentTracking entity)
        {
            try
            {
                _dbContext.Update(entity);
                _dbContext.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }
            return entity;
        }
        public EquipmentTracking Create(EquipmentTracking entity)
        {
            _dbSet.Add(entity);
            _dbContext.SaveChanges();
            return entity;
        }
    }
}
