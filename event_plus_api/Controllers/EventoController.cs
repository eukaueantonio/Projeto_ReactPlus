using Microsoft.AspNetCore.Mvc;
using Projeto_Event_Plus.Domains;
using Projeto_Event_Plus.Interfaces;

namespace Projeto_Event_Plus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class EventoController : Controller
    {
        private readonly IEventoRepository _eventoRepository;
        public EventoController(IEventoRepository eventoRepository)
        {
            _eventoRepository = eventoRepository;
        }


        //-----------------------------------------------------
        // Listar Evento
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                List<Evento> listaDeEventos = _eventoRepository.Listar();

                return Ok(listaDeEventos);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //-----------------------------------------------------
        // Cadastrar Evento
        [HttpPost]
        public IActionResult Post(Evento novoEvento)
        {
            try
            {
                _eventoRepository.Cadastrar(novoEvento);

                return Created();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //-----------------------------------------------------
        // Deletar Evento
        [HttpDelete]
        public IActionResult Deletar(Guid id)
        {
            try
            {
                _eventoRepository.Deletar(id);

                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }

        //-----------------------------------------------------
        // Atualizar Evento
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, Evento Evento)
        {
            try
            {
                _eventoRepository.Atualizar(id, Evento);

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
                List<Evento> listaDeEventosPorId = _eventoRepository.ListarPorID(id);

                return Ok(listaDeEventosPorId);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //-----------------------------------------------------
        // Listar Próximos Eventos
        [HttpGet("ListarProximosEventos/{id}")]
        public IActionResult ListarProximosEventos()
        {
            try
            {
                List<Evento> listaProximoEventos = _eventoRepository.ListarProximosEventos();
                
                return Ok(listaProximoEventos);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
