import React from 'react';
import { withRouter } from 'react-router-dom'
import * as messages from '../components/toastr'

import Card from '../components/card'
import FormGroup from '../components/form-group'

import UsuarioService from '../app/service/usuarioService'

class Cardastrousuario extends React.Component {

  state = {
    nome: '',
    email: '',
    senha: '',
    senhaRepeticao: ''
  }

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  cadastrar = () => {

    const { nome, email, senha, senhaRepeticao } = this.state

    const usuario = { nome, email, senha, senhaRepeticao }

    try {
      this.service.validar(usuario)
    } catch (erro) {
      const mensagens = erro.mensagens
      mensagens.forEach(msg => messages.mensagemErro(msg));
      return false
    }

    this.service.salvar(usuario)
      .then(response => {
        messages.mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
        this.props.history.push('/login')
      }).catch(erro => {
        messages.mensagemErro(erro.response.data)
      })
  }

  cancelar = () => {
    this.props.history.push('/login')
  }

  render() {
    return (
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputNome">
                <input
                  value={this.state.nome}
                  onChange={e => this.setState({ nome: e.target.value })}
                  type="text"
                  name="nome"
                  id="inputNome"
                  className="form-control"
                />
              </FormGroup>

              <FormGroup label="Email: *" htmlFor="inputEmail">
                <input
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  type="email"
                  name="email"
                  id="inputEmail"
                  className="form-control"
                />
              </FormGroup>

              <FormGroup label="Senha: *" htmlFor="inputSenha">
                <input
                  value={this.state.senha}
                  onChange={e => this.setState({ senha: e.target.value })}
                  type="password"
                  name="senha"
                  id="inputSenha"
                  className="form-control"
                />
              </FormGroup>

              <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                <input
                  value={this.state.senhaRepeticao}
                  onChange={e => this.setState({ senhaRepeticao: e.target.value })}
                  type="password"
                  name="senhaRepeticao"
                  id="inputRepitaSenha"
                  className="form-control"
                />
              </FormGroup>

              <button onClick={this.cadastrar} className="btn btn-success"><i className="pi pi-save"></i> Salvar</button>
              <button onClick={this.cancelar} className="btn btn-danger"><i className="pi pi-times"></i> Cancelar</button>

            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default withRouter(Cardastrousuario)