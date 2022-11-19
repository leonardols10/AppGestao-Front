import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { colaborador } from 'src/app/models/colaborador';

@Component({
  selector: 'app-colaborador-list',
  templateUrl: './colaborador-list.component.html',
  styleUrls: ['./colaborador-list.component.css']
})
export class ColaboradorListComponent implements OnInit {

  ELEMENT_DATA:   colaborador[] = [
    {
      id:1,
      nome: 'rafa',
      cpf: '122.205.059.52',
      email: 'rafa@gmail.com',
      senha: '1234',
      perfis: ['0'],
      dataCriacao: '15/08/2002'
    }
  ]
 
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<colaborador>(this.ELEMENT_DATA);


  constructor() { }

  ngOnInit(): void {
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}


