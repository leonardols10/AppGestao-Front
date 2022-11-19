import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { colaborador } from 'src/app/models/colaborador';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-colaborador-list',
  templateUrl: './colaborador-list.component.html',
  styleUrls: ['./colaborador-list.component.css']
})
export class ColaboradorListComponent implements OnInit {

  ELEMENT_DATA:   colaborador[] = []
 
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<colaborador>(this.ELEMENT_DATA);


  constructor(private service: ColaboradorService) { }

  ngOnInit(): void {
    this.findAll()
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  //chama o serviço que faz a requisição para listar todos os colaborades 
  findAll(){
    this.service.findall().subscribe( resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<colaborador>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}


