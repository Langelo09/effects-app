import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;

  // constructor( public usuarioService: UsuarioService ) { }
  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {

    // this.usuarioService.getUsers()
    //   .subscribe( users => {
    //     console.log(users);

    //     this.usuarios = users;

    //   });

    this.store.select('usuarios').subscribe( ({users, loading, error}) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });

    this.store.dispatch( cargarUsuarios() );

  }

}
