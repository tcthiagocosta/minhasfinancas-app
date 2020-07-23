import React from 'react';
import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'


import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


import LocalStoregeService from '../../app/service/localstoregeService'
import LancamentoService from '../../app/service/lancamentoService'

class ConsultaLancamento extends React.Component {

  state = {
    ano: '',
    mes: '',
    tipo: '',
    descricao: '',
    lancamentos: [],
    showConfirmDialog: false,
    lancamentoDeletar: {}
  }

  constructor() {
    super()
    this.service = new LancamentoService()
  }

  editar = (id) => {
    this.props.history.push(`/cadastro-lancamento/${id}`)
  }

  abrirConfirmacao = (lancamento) => {
    this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
  }

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false, lancamentoDeletar: {} })
  }

  deletar = () => {
    this.service.deletar(this.state.lancamentoDeletar.id)
      .then(response => {

        // Removendo o lancamento do array
        const lancamentos = this.state.lancamentos
        const index = lancamentos.indexOf(this.state.lancamentoDeletar)
        lancamentos.splice(index, 1)
        this.setState({ lancamentos: lancamentos, showConfirmDialog: false })

        messages.mensagemSucesso('lançamento deletado com sucesso.')
      }).catch(erro => {
        messages.mensagemErro('Ocorrou um erro ao tentar deletar o lançamento.')
      })

  }

  buscar = () => {
    if (!this.state.ano) {
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
        this.setState({ lancamentos: resposta.data })
      }).catch(erro => {
        console.log(erro)
      })
  }

  preparaFormularioCadastro = () => {
    this.props.history.push('/cadastro-lancamento')
  }


  render() {

    const meses = this.service.obterListaMeses()
    const tipos = this.service.obterListaTipos()

    const confirmDialogFooter = (
      <div>
        <Button label="Confirma" icon="pi pi-check" onClick={this.deletar} />
        <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
      </div>
    )

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
              <button onClick={this.preparaFormularioCadastro} className="btn btn-danger">Cadastrar</button>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <LancamentosTable lancamentos={this.state.lancamentos} deleteAction={this.abrirConfirmacao} editAction={this.editar} />
            </div>
          </div>
        </div>
        <div>
          <Dialog header="Godfather I"
            visible={this.state.showConfirmDialog}
            style={{ width: '50vw' }}
            footer={confirmDialogFooter}
            modal={true}
            onHide={() => this.setState({ visible: false })}
          >
            Confirma a exclusão deste lançamento
        </Dialog>
        </div>
      </Card>
    )
  }

}

export default withRouter(ConsultaLancamento)