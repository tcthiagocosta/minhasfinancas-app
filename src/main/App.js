import React from 'react';
import Rotas from './rotas'
import 'toastr/build/toastr.min.js'

import ProvedorAutenticacao from './provedorAutenticacao'


import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


import Navbar from '../views/navbar';

class App extends React.Component {

  render() {
    return (

      <ProvedorAutenticacao>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App;
