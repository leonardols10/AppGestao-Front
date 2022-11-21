import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { cliente } from 'src/app/models/cliente';
import { colaborador } from 'src/app/models/colaborador';
import { ChamadoService } from 'src/app/services/chamado.service';
import { clienteService } from 'src/app/services/cliente';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-chamados-create',
  templateUrl: './chamados-create.component.html',
  styleUrls: ['./chamados-create.component.css']
})
export class ChamadosCreateComponent implements OnInit {

  chamado: Chamado ={
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    colaborador: '',
    cliente: '',
    nomeCliente: '',
    nomeColaborador: '',

  }

  clientes: cliente[] = [];
  colaboradores: colaborador[] = [];


  prioridade: FormControl = new FormControl(null, [ Validators.required]);
  status: FormControl = new FormControl(null, [ Validators.required]);
  titulo: FormControl = new FormControl(null, [ Validators.required]);
  observacoes: FormControl = new FormControl(null, [ Validators.required]);
  colaborador: FormControl = new FormControl(null, [ Validators.required]);
  cliente: FormControl = new FormControl(null, [ Validators.required]);


  constructor(
    private chamadoService: ChamadoService,
    private clienteService: clienteService,
    private colaboradorService: ColaboradorService,
    private toast: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllColaboradores();
  }

  create():void{
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toast.success('Chamado criado com sucesso', 'Chamado cadastrado !');
      this.router.navigate(['chamados'])
    }, ex => {
      this.toast.error(ex.error.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findall().subscribe( resposta => {
      this.clientes  = resposta;
    })
  }

  findAllColaboradores():void{
    this.colaboradorService.findall().subscribe(resposta => {
      this.colaboradores = resposta;
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid &&
                this.status.valid &&
                      this.titulo.valid &&
                           this.observacoes.valid &&
                                this.colaborador.valid &&
                                     this.cliente.valid 
  }

}
