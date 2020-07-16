import React from 'react';
import {withRouter} from 'react-router-dom'

import Card from '../components/card'
import FormGroup from '../components/form-group'

class Cardastrousuario extends React.Component {

  state = {
    nome: '',
    email: '',
    senha: '',
    senhaRepeticao: ''
  }

  cadastrar = () => {
    console.log(this.state)
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