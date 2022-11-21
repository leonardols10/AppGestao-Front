import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chamados-create',
  templateUrl: './chamados-create.component.html',
  styleUrls: ['./chamados-create.component.css']
})
export class ChamadosCreateComponent implements OnInit {


  prioridade: FormControl = new FormControl(null, [ Validators.required]);
  status: FormControl = new FormControl(null, [ Validators.required]);
  titulo: FormControl = new FormControl(null, [ Validators.required]);
  descricao: FormControl = new FormControl(null, [ Validators.required]);
  colaborador: FormControl = new FormControl(null, [ Validators.required]);
  cliente: FormControl = new FormControl(null, [ Validators.required]);


  constructor() { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.prioridade.valid &&
                this.status.valid &&
                      this.titulo.valid &&
                           this.descricao.valid &&
                                this.colaborador.valid &&
                                     this.cliente.valid 
  }

}
