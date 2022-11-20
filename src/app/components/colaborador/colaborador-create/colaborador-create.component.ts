import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { colaborador } from 'src/app/models/colaborador';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-colaborador-create',
  templateUrl: './colaborador-create.component.html',
  styleUrls: ['./colaborador-create.component.css']
})
export class ColaboradorCreateComponent implements OnInit {

  colaborador: colaborador = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''

  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));



  constructor(private service: ColaboradorService,
    private toast: ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  

  create(): void{
    this.service.create(this.colaborador).subscribe( () => { 
      this.toast.success('Colaborador cadastrado com sucesso', 'Cadastro concluido');
      this.router.navigate(['colaboradores'])
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

  addPerfil(perfil: any):void{
    if(this.colaborador.perfis.includes(perfil)){
      this.colaborador.perfis.splice(this.colaborador.perfis.indexOf(perfil), 1);
    }else {
      this.colaborador.perfis.push(perfil);
    }

  }

  validaCampos():boolean { 
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }
}
