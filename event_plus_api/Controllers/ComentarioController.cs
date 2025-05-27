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
        public ComentarioController(ContentSafetyClient contentSafetyClient, IComentarioRepository comentarioRepository)
        {
            _comentarioRepository = comentarioRepository;
            _contentSafetyClient = contentSafetyClient;
        }

        //-----------------------------------------------------
        // Cadastrar Comentario Evento
        [HttpPost]
        public async Task<IActionResult> Post(ComentarioEvento comentario)
        {
            try
            {
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
