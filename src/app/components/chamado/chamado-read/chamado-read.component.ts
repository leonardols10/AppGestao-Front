import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

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



  constructor(
    private chamadoService: ChamadoService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
      this.findById();
  }

  findById():void {
    this.chamadoService.findById(this.chamado.id).subscribe( resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    })
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
