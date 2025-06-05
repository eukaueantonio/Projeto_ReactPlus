using Projeto_Event_Plus.Domains;
using Projeto_Event_Plus.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Azure.AI.ContentSafety;
using Azure;
using Projeto_Event_Plus.Repositories;

namespace Projeto_Event_Plus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ComentarioController : Controller
    {
        private readonly IComentarioRepository _comentarioRepository;
        private readonly ContentSafetyClient _contentSafetyClient;
        private readonly Context _contexto;
        public ComentarioController(ContentSafetyClient contentSafetyClient, IComentarioRepository comentarioRepository, Context contexto)
        {
            _comentarioRepository = comentarioRepository;
            _contentSafetyClient = contentSafetyClient;
            _contexto = contexto;
        }

        //-----------------------------------------------------
        // Cadastrar Comentario Evento
        [HttpPost]
        public async Task<IActionResult> Post(ComentarioEvento comentario)
        {
            try
            {

                Evento? eventoBuscado = _contexto.Evento.FirstOrDefault(e => e.IdEvento == comentario.IdEvento);
                if(eventoBuscado == null)
                {
                    return NotFound("Evento não encontrado!");
                }
                if (eventoBuscado.DataEvento >= DateTime.UtcNow)
                {
                    return BadRequest("Não é possível comentar um evento que ainda não aconteceu");
                }

                if(string.IsNullOrEmpty(comentario.Descricao))
                {
                    return BadRequest("O texto a ser moderado não pode estar vazio!");
                }

                // Criar objeto de análise do Content Safety.
                var request = new AnalyzeTextOptions(comentario.Descricao);

                // Chamar a API do Content Safety.
                Response<AnalyzeTextResult> response = await _contentSafetyClient.AnalyzeTextAsync(request);

                // Verificar se o texto analisado tem alguma severidade.
                bool temConteudoImproprio = response.Value.CategoriesAnalysis.Any(c => c.Severity > 0); 
                // true

                // Se o comentário foi impróprio, não exibe. Caso contrário, exibirá.
                comentario.Exibe = !temConteudoImproprio; // false

                // Cadastra de FATO o comentário.
                _comentarioRepository.Cadastrar(comentario);

                return Ok();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
