import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { cliente } from 'src/app/models/cliente';
import { colaborador } from 'src/app/models/colaborador';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { clienteService } from 'src/app/services/cliente';


@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
      this.findById();
    this.findAllClientes();
    this.findAllColaboradores();
  }

  findById():void {
    this.chamadoService.findById(this.chamado.id).subscribe( resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    })
  }

  update():void{
    this.chamadoService.update(this.chamado).subscribe(resposta => {
      this.toast.success('Chamado atualizado com sucesso', 'Chamado atualizado !');
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

  rertornaStatus(status: any): string {
    if(status == '0'){
      return 'ABERTO'
    } else if (status == 1){
      return 'EM ANDAMENTO'
    }else {
      return 'ENCERRADO'
    }
  }

  rertornaPrioridade(prioridade: any): string {
    if(prioridade == '0'){
      return 'BAIXA'
    } else if (prioridade == 1){
      return 'MÉDIA'
    }else {
      return 'ALTA'
    }
  }
}
