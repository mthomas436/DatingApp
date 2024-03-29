﻿using API.DTOs;
using API.Entities;
using API.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace API.Data
{
    public class UserRepository : iUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<MemberDto> GetUserByIdAsync(int id)
        {
            var user = await _context.Users
                    .Include(p => p.Photos)
                    .SingleOrDefaultAsync(X => X.Id == id);
           
            var userToReturn = user.Adapt<MemberDto>();
            userToReturn.PhotoUrl = userToReturn.Photos.Where(x => x.IsMain == true).FirstOrDefault().Url;

            return userToReturn;
        }

        public async Task<MemberDto> GetUserByUserNameAsync(string username)
        {
            var user = await _context.Users
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);

            var userToReturn = user.Adapt<MemberDto>();
            userToReturn.PhotoUrl = userToReturn.Photos.Where(x => x.IsMain == true).FirstOrDefault().Url;

            return userToReturn;
 
        }

        public async Task<bool> UpdateUserAsync(string username, MemberUdateDto updatedUser)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);

            if (user == null) return false;


            user.Introduction = updatedUser.Introduction;
            user.LookingFor = updatedUser.LookingFor;
            user.Interests = updatedUser?.Interests;
            user.City = updatedUser?.City;
            user.Country = updatedUser?.Country;

            Update(user);

            await SaveAllAsync();
            return true;    
        }


        public async Task<IEnumerable<MemberDto>> GetUsersAsync()
        {
            var users = await _context.Users
                    .Include(p => p.Photos)
                    .ToListAsync();

            var usersToReturn =  users.Adapt<List<MemberDto>>();

            foreach(var user in usersToReturn)
            {
                user.PhotoUrl = user.Photos.Where(x => x.IsMain == true).FirstOrDefault().Url;
            }
            return usersToReturn;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State= EntityState.Modified;
        }
    }
}
