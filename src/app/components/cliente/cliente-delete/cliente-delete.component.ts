import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cliente } from 'src/app/models/cliente';
import { clienteService } from 'src/app/services/cliente';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class clienteDeleteComponent implements OnInit {

  cliente: cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''

  }




  constructor(private service: clienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById():void{
    this.service.findById(this.cliente.id ).subscribe( resposta =>{
      resposta.perfis = [];
      this.cliente = resposta;
    })
  }

  delete(): void{
    this.service.delete(this.cliente.id).subscribe( () => { 
      this.toast.success('cliente deletado com sucesso', 'Exclusão concluida');
      this.router.navigate(['clientes'])
    }, ex =>{
      console.log(ex);
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }



  
}
