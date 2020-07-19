import ApiService from '../apiservice'

class UsuarioService extends ApiService {

  constructor() {
    super('/api/usuarios')
  }

  autentiar(crendiciais) {
    return this.post('/autenticar', crendiciais)
  }

  obterSaldoPorUsuario(id) {
    return this.get(`/${id}/saldo`)
  }

}

export default UsuarioService