using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
            return await _userRepository.GetUserByUserNameAsync(username);
        }

    }
}