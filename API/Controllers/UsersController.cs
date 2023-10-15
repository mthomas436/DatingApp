using API.DTOs;
using API.Entities;
using API.Interfaces;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly iUserRepository _userRepository;
        public UsersController(iUserRepository userRepository)
        {
            _userRepository = userRepository;
            
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            return Ok( await _userRepository.GetUsersAsync() );  
 
        }
        /*
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<MemberDto>> GetUser(int id)
        {
            return await _userRepository.GetUserByIdAsync(id);          
        }
        */

        [HttpGet("{username}")]
        [AllowAnonymous]
        public async Task<ActionResult<MemberDto>> GetUserByUserName(string username)
        {
            var user = await _userRepository.GetUserByUserNameAsync(username);
      
            return Ok(user);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUdateDto memberUdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
 
            if ( await _userRepository.UpdateUserAsync(username, memberUdateDto) )
            {
                return NoContent();
            }
 

            return BadRequest("Failed to update user");
 
        }

    }
}