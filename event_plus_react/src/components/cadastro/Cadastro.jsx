import "./Cadastro.css";
import Botao from "../botao/Botao"

const Cadastro = (props) => {
    return(
            <section className="section_cadastro">
                <form onSubmit={props.funcCadastroTipoEvento} action="" className="layout_grid form_cadastro">
                    <h1>{props.tituloCadastro}</h1>
                    <hr />
                    <div className="campos_cadastro">
                        <div className="banner_cadastro">
                        <img src={props.img_banner} alt="Banner de cadastro" />
                         </div>
                        <div className="campo_preen">
                         <div className="campo_cad_nome">
                            <label htmlFor=""></label>
                            <input type="text" nome="nome" placeholder={props.nomes}
                                value={props.valorInput}
                                onChange={(e) => props.setValorInput(e.target.value)}
                            />
                            </div>
                         <div className="campo_cad_genero" style={{display:props.visibilidade}}>
                         <label htmlFor="genero"></label>
                            <select name="genero" id="">
                            <option  value="" disabled selected>Selecione</option>
                            <option value="">Evento 1</option>
                            <option value="">Evento 2</option>
                            <option value="">Evento 3</option>
                         </select>
                            </div>
                            <Botao nomeBotao="Cadastrar"/>
                        </div>
                    </div>
                </form>
            </section>
    )
}

export default Cadastro;