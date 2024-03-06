﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Encounters.Core.Domain.RepositoryInterfaces
{
    public interface IUserExperienceRepository
    {
        UserExperience GetByUserId(long userId);
        UserExperience Create(UserExperience userExperience);
    }
}
