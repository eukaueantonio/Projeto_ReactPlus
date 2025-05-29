import "./Cadastro.css";
import Botao from "../botao/Botao"

const Cadastro = (props) => {
    return (
        <section className="section_cadastro">
            <form onSubmit={props.funcCadastroTipoEvento} action="" className="layout_grid form_cadastro">
                <h1>{props.tituloCadastro}</h1>
                <hr />

                <div className="campos_cadastro">
                    <div className="banner_cadastro">
                        <img src={props.img_banner} alt="Banner de cadastro" />
                    </div>

                    {/* nome do eventoooooo */}
                    <div className="campo_preen">
                        <div className="campo_cad_nome">
                            <label htmlFor=""></label>
                            <input type="text" nome="nome" placeholder={props.nomes}
                                value={props.valorInput}
                                onChange={(e) => props.setValorInput(e.target.value)}
                            />
                        </div>

                        {/* data do eventoooooo */}
                        <div className="div_data campo_cadNome" style={{ display: props.visibilidade }}>
                            <input type="date"
                                style={{ display: props.data }}
                                value={props.valorDate}
                                onChange={(e) => props.setValorDate(e.target.value)}
                            />
                        </div>

                        {/* tipo do eventoooooo */}
                        <div className="campo_cadTipoEvento" style={{ display: props.visivel }}>
                            <label htmlFor="Nome"></label>
                            <select name="Tipo Dde Evento" id="" className="select_cad"
                                value={props.valorSelect}
                                onChange={(e) => props.setValorSelect(e.target.value)}
                            >
                                <option value="" disabled>Tipo de evento</option>
                                {props.lista && props.lista.length > 0 && props.lista.map((itemTipoEvento) => (
                                    (
                                        <option
                                            key={itemTipoEvento.idTipoEvento}
                                            value={itemTipoEvento.idTipoEvento}
                                        >
                                            {itemTipoEvento.tituloTipoEvento}

                                            {/*<option value={itemTipoEvento.idTipoEvento}>{itemTipoEvento.tituloTipoEvento}</option>*/}
                                        </option>

                                    ))
                                )}
                            </select>
                        </div>

                        {/* instituicaoooooooo */}
                        <div className="campo_Instituiçao campo_cadNome" style={{ display: props.visibilidade }}>
                            <select name="Instituiaçao" id="" value={props.valorSelect1} onChange={(e) => props.setValorSelect1(e.target.value)}>
                                <option selected value="">Senai</option>
                            </select>
                        </div>

                        {/* descricaoooooooooo */}
                        <div className="div_descricao" style={{ display: props.visibilidade }}>
                            <textarea name="" id="" placeholder="Descrição" className="descricao"
                                style={{ display: props.desc }}
                                value={props.valorText}
                                onChange={(e) => props.setValorText(e.target.value)}
                            ></textarea>
                        </div>

                        <Botao nomeBotao="Cadastrar" />
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Cadastro;