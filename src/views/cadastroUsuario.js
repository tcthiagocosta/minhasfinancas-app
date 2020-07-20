import React from 'react';
import { withRouter } from 'react-router-dom'
import { mensagemErro, mensagemSucesso } from '../components/toastr'

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

    const msgs = this.validar()

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg)
      })

      return false
    }

    const usuario = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha
    }

    this.service.salvar(usuario)
      .then( response => {
        mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
        this.props.history.push('/login')
      }).catch(erro => {
        mensagemErro(erro.response.data)
      })
  }

  cancelar = () => {
    this.props.history.push('/login')
  }

  validar() {
    const msgs = []

    if (!this.state.nome) {
      msgs.push('O campo Nome é obrigatório')
    }

    if (!this.state.email) {
      msgs.push('O campo Email é obrigatório')
    } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      msgs.push('Informe um Email válido')
    }

    if (!this.state.senha || !this.state.senhaRepeticao) {
      msgs.push('Digite a senha 2x.')
    } else if (this.state.senha !== this.state.senhaRepeticao) {
      msgs.push('As senhas não batem.')
    }

    return msgs
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

              <button onClick={this.cadastrar} className="btn btn-success">Salvar</button>
              <button onClick={this.cancelar} className="btn btn-danger">Cancelar</button>

            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default withRouter(Cardastrousuario)