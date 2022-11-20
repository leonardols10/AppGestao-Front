import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cliente } from 'src/app/models/cliente';
import { clienteService } from 'src/app/services/cliente';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class clienteListComponent implements OnInit {

  ELEMENT_DATA:   cliente[] = []
 
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<cliente>(this.ELEMENT_DATA);


  constructor(private service: clienteService) { }

  ngOnInit(): void {
    this.findAll()
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  //chama o serviço que faz a requisição para listar todos os colaborades 
  findAll(){
    this.service.findall().subscribe( resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<cliente>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}


