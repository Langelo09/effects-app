import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';


@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ) {}

    cargarUsuario$ = createEffect(
        () => this.actions$
            .pipe(
                ofType( usuarioActions.cargarUsuario ),
                // ver información que fluye despues del ofType
                // tap( data => console.log('effect tap: ', data) ),
                mergeMap( // mergeMap unir observable a la solicitud anterior
                    ( action ) => this.usuarioService.getUsersById( action.id )
                            .pipe(
                            // ver información que fluye despues del mergeMap, al traer getUser
                            // tap( data => console.log('getUser effect: ', data) )
                                map( user => usuarioActions.cargarUsuarioSuccess( {usuario: user} ) ),
                                catchError( err => of(usuarioActions.cargarUsuarioError( {payload: err} )) )
                            )
                )
            )
    );

}

