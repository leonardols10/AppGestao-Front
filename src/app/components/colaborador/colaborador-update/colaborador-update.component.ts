import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { colaborador } from 'src/app/models/colaborador';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-colaborador-update',
  templateUrl: './colaborador-update.component.html',
  styleUrls: ['./colaborador-update.component.css']
})
export class ColaboradorUpdateComponent implements OnInit {

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
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.colaborador.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById():void{
    this.service.findById(this.colaborador.id ).subscribe( resposta =>{
      resposta.perfis = [];
      this.colaborador = resposta;
    })
  }

  update(): void{
    this.service.update(this.colaborador).subscribe( () => { 
      this.toast.success('Colaborador atualizado com sucesso', 'Atualização concluida');
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
