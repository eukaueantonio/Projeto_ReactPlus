using Microsoft.AspNetCore.Mvc;
using Projeto_Event_Plus.Domains;
using Projeto_Event_Plus.Interfaces;

namespace Projeto_Event_Plus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class PresencaController : Controller
    {
        private readonly IPresencaEventosRepository _presencaEventosRepository;
        public PresencaController(IPresencaEventosRepository presencaEventosRepository)
        {
            _presencaEventosRepository = presencaEventosRepository;
        }

        //-----------------------------------------------------
        // Cadastrar Presenca Evento
        [HttpPost]
        public IActionResult Post(PresencaEvento evento)
        {
            try
            {
                _presencaEventosRepository.Inscrever(evento);

                return Created();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //-----------------------------------------------------
        // Listar Presenca Evento
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                List<PresencaEvento> listaDePresenca = _presencaEventosRepository.Listar();

                return Ok(listaDePresenca);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //-----------------------------------------------------
        // Deletar Presenca Evento
        [HttpDelete]
        public IActionResult Deletar(Guid id)
        {
            try
            {
                _presencaEventosRepository.Deletar(id);

                return NoContent();

            }
            catch (Exception)
            {
                throw;
            }
        }

        //-----------------------------------------------------
        // Atualizar Presenca Evento
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, PresencaEvento presencaEvento)
        {
            try
            {
                _presencaEventosRepository.Atualizar(id, presencaEvento);

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //-----------------------------------------------------
        // Buscar Por ID
        [HttpGet("BuscarPorId/{id}")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                PresencaEvento presencaBuscada = _presencaEventosRepository.BuscarPorID(id);

                return Ok(presencaBuscada);
            }
            catch (Exception)
            {
                throw;
            }

        }

        //-----------------------------------------------------
        // Listar Minhas Presenças
        [HttpGet("ListarMinhasPresencas/{id}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                List<PresencaEvento> listarMinhasPresencas = _presencaEventosRepository.ListarMinhas(id);

                return Ok(listarMinhasPresencas);
            }
            catch (Exception error)
            {

                return BadRequest(error.Message);
            }
        }
    }
}
