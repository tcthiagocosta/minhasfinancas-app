import React from 'react';
import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'


import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'

import LocalStoregeService from '../../app/service/localstoregeService'
import LancamentoService from '../../app/service/lancamentoService'

class ConsultaLancamento extends React.Component {

  state = {
    ano: '',
    mes: '',
    tipo: '',
    descricao: '',
    lancamentos: []
  }

  constructor() {
    super()
    this.service = new LancamentoService()
  }

  buscar = () => {
    if(!this.state.ano) {
      messages.mensagemErro('O preenchimento do campo ano é obrigatório.')
      return false
    }


    const usuarioLogado = LocalStoregeService.obterItem('_usuario_logado')

    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id
    }

    this.service.consultar(lancamentoFiltro)
      .then(resposta => {
        this.setState({lancamentos : resposta.data})
      }).catch(erro => {
        console.log(erro)
      })
  }


  render() {

    const meses = this.service.obterListaMeses()
    const tipos = this.service.obterListaTipos()

    return (
      <Card title="Consulta Lançamentos">
        <div className="row">
          <div className="col-lg-6">
            <div className="bs-component">
              <FormGroup label="Ano: *" htmlFor="inputAno">
                <input
                  value={this.state.ano}
                  onChange={e => this.setState({ ano: e.target.value })}
                  type="text"
                  name="ano"
                  id="inputAno"
                  className="form-control"
                  placeholder="Digite o ano"
                />
              </FormGroup>

              <FormGroup label="Descrição:" htmlFor="inputDesc">
                <input
                  value={this.state.descricao}
                  onChange={e => this.setState({ descricao: e.target.value })}
                  type="text"
                  name="descricai"
                  id="inputDesc"
                  className="form-control"
                  placeholder="Digite a descrição"
                />
              </FormGroup>

              <FormGroup label="Mês: *" htmlFor="inputMes">
                <SelectMenu
                  lista={meses}
                  value={this.state.mes}
                  onChange={e => this.setState({ mes: e.target.value })}
                  id="inputMes"
                />
              </FormGroup>

              <FormGroup label="Tipo Lançamento: *" htmlFor="inputTipo">
                <SelectMenu
                  lista={tipos}
                  value={this.state.tipo}
                  onChange={e => this.setState({ tipo: e.target.value })}
                  id="inputTipo"
                />
              </FormGroup>

              <button onClick={this.buscar} className="btn btn-success">Buscar</button>
              <button className="btn btn-danger">Cadastrar</button>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <LancamentosTable lancamentos={this.state.lancamentos} />
            </div>
          </div>
        </div>
      </Card>
    )
  }

}

export default withRouter(ConsultaLancamento)