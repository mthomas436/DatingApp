﻿using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface iUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<MemberDto>> GetUsersAsync();
        Task<MemberDto> GetUserByIdAsync(int id);
        Task<MemberDto> GetUserByUserNameAsync(string username);

        Task<bool> UpdateUserAsync(string username, MemberUdateDto updatedUser);

    }
}
