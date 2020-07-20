import React from 'react';
import {Route, Switch, HashRouter} from 'react-router-dom'

import Home from '../views/home'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamento'

function Rotas () {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/cadastro-usuario" component={CadastroUsuario} />
        <Route path="/consulta-lancamento" component={ConsultaLancamentos} />
      </Switch>
    </HashRouter>
  )
}

export default Rotas