import React from 'react';

import AuthService from '../app/service/authService'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer
export const AutoProvider = AuthContext.Provider


class ProvedorAutenticacao extends React.Component {

  state = {
    usuarioAutenticado: null,
    isAutenticado: false
  }

  iniciarSessao = (usuario) => {
    AuthService.logar(usuario)
    this.setState({ isAutenticado: true, usuarioAutenticado: usuario})
  }

  encerraSessao = () => {
    AuthService.removerUsuarioAutenticado()
    this.setState({isAutenticado: false, usuarioAutenticado: null})
  }

  render() {

    const contexto = {
      usuarioAutenticado: this.state.usuarioAutenticado,
      isAutenticado: this.state.isAutenticado,
      iniciarSessao: this.iniciarSessao,
      encerraSessao: this.encerraSessao
    }

    return (
      <AutoProvider value={contexto}>
        {this.props.children}
      </AutoProvider>

    )
  }
}

export default ProvedorAutenticacao