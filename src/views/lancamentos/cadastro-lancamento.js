import React from 'react';
import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import LocalStoregeService from '../../app/service/localstoregeService'
import LancamentoService from '../../app/service/lancamentoService'


class CadastroLancamento extends React.Component {

  state = {
    id: null,
    descricao: '',
    ano: '',
    mes:'',
    valor: '',
    tipo: '',
    status: '',
    usuario: null,
    atualizando: false
  }

  constructor() {
    super();
    this.service = new LancamentoService()
  }

  componentDidMount() {
    // pegando parametro da url
    const params = this.props.match.params

    if (params.id) {
      this.service.obeterPoId(params.id)
        .then(response => {
          this.setState({...response.data, atualizando: true})
        }).catch(erro => {
          messages.mensagemErro(erro.response.data)
        })
    }
  }

  submit = () => {
    const usuarioLogado = LocalStoregeService.obterItem('_usuario_logado')

    const {descricao, valor, mes, ano, tipo} = this.state
    const lancamento = {descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id}

    try {
      this.service.validar(lancamento)
    } catch (erro) {
      const mensagens = erro.mensagens
      mensagens.forEach(msg => messages.mensagemErro(msg));
      return false
    }

    this.service.salvar(lancamento)
      .then(response => {
        this.props.history.push('/consulta-lancamento')
        messages.mensagemSucesso('Lançamento cadastro com sucesso.')        
      }).catch(erro => {
        messages.mensagemErro(erro.response.data)
      })
  }

  atualizar =() => {
    const {descricao, valor, mes, ano, tipo, status, id, usuario} = this.state
    const lancamento = {descricao, valor, mes, ano, tipo, id, usuario, status}

    this.service.atualizar(lancamento)
      .then(response => {
        this.props.history.push('/consulta-lancamento')
        messages.mensagemSucesso('Lançamento atualziado com sucesso.')        
      }).catch(erro => {
        messages.mensagemErro(erro.response.data)
      })
  }

  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState({ [name] : value})
  }

  render() {

    const tipos = this.service.obterListaTipos()
    const meses = this.service.obterListaMeses()

    return (

      <Card title={ this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
        <div className="row">
          <div className="col-md-12">
            <FormGroup label="Descrição: *" htmlFor="inputDescricao">
              <input
                value={this.state.descricao}
                onChange={this.handleChange}
                type="text"
                name="descricao"
                id="inputDescricao"
                className="form-control"
                placeholder="Digite a descrição"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup label="Ano: *" htmlFor="inputAno">
              <input
                value={this.state.ano}
                onChange={this.handleChange}
                type="text"
                name="ano"
                id="inputAno"
                className="form-control"
                placeholder="Digite a ano"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup label="Mês: *" htmlFor="inputMes">
              <SelectMenu
                lista={meses}
                value={this.state.mes}
                name="mes"
                onChange={this.handleChange}
                id="inputMes"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup label="Valor: *" htmlFor="inputValor">
              <input
                value={this.state.valor}
                onChange={this.handleChange}
                type="text"
                name="valor"
                id="inputValor"
                className="form-control"
                placeholder="Digite a valor"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup label="Tipo: *" htmlFor="inputStatus">
              <SelectMenu
                lista={tipos}
                value={this.state.tipo}
                name="tipo"
                onChange={this.handleChange}
                id="inputStatus"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup label="Status:" htmlFor="inputStatus">
              <input
                value={this.state.status}
                onChange={this.handleChange}
                type="text"
                name="status"
                id="inputStatus"
                className="form-control"
                disabled
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {this.state.atualizando ?
              (
                <button onClick={this.atualizar} className="btn btn-primary"><i className="pi pi-refresh"></i> Atualizar</button>
              ) : (
                <button onClick={this.submit} className="btn btn-success"><i className="pi pi-save"></i> Salvar</button>
              )
            }
            <button onClick={e => this.props.history.push('/consulta-lancamento')} className="btn btn-danger"><i className="pi pi-times"></i> Cancelar</button>
          </div>
        </div>
      </Card>
    )
  }
}

export default withRouter(CadastroLancamento)