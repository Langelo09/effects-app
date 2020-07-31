import { createReducer, on } from '@ngrx/store';
import * as usuariosActions from '../actions';
import { Usuario } from '../../models/usuario.model';

export interface UsuariosState {
    users: Usuario[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const usuariosInitialState: UsuariosState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
};

const _usuariosReducer = createReducer(usuariosInitialState,

    on( usuariosActions.cargarUsuarios, state => ({ ...state, loading: true}) ),

    on( usuariosActions.cargarUsuariosSuccess, (state, { usuarios }) => ({
        ...state,
         loading: false,
         loaded: true,
         users: [ ...usuarios ]
        }) ),

    on( usuariosActions.cargarUsuariosError, (state, { payload }) => ({
        ...state,
         loading: false,
         loaded: false,
         error: {
             url: payload.url,
             name: payload.name,
             message: payload.message
         }
        }) )

);

export function usuariosReducer(state, action) {
    return _usuariosReducer(state, action);
}

