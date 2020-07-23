import LocalStoregeService from './localstoregeService'

export const USUARIO_LOCAGO = '_usuario_logado'

export default class AuthService {

  static isUsuarioAutenticado() {
    const usario = LocalStoregeService.obterItem(USUARIO_LOCAGO)
    
    return usario && usario.id
  }

  static removerUsuarioAutenticado() {
    LocalStoregeService.removerItem(USUARIO_LOCAGO)
  }

  static logar(usuario) {
    LocalStoregeService.adicionarItem(USUARIO_LOCAGO, usuario)
  }

  static obterUsuarioAutenticado(){
    return LocalStoregeService.obterItem(USUARIO_LOCAGO)
  }

}