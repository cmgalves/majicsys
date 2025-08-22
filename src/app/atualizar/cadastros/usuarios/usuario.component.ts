import { Component, OnInit, ViewChild } from '@angular/core';
import { funcsService } from '../../../funcs/funcs.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

// tslint:disable-next-line:class-name
export interface cadUsuario {
  empresa: string;
  nome: string;
  email: string;
  senha: string;
  perfil: string;
  telefone: string;
  depto: string;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {
  arrUserLogado = JSON.parse(localStorage.getItem('user'))[0];
  arrUsuario: any = [];
  arrUsuarioTab: any = [];
  arrEmpresa: any = [];
  arrEmpresaTab: any = [];
  valEmpresa: any = [];
  valPerfil: string = '';
  arrLinhas: any = [];
  valLinha: any = [];
  aPerfil: any = [];
  cFilPerfil: string = '';
  usuarioCodigo: string = '';
  usuarioEmpresas: string = '';
  usuarioNome: string = '';
  usuarioEmail: string = '';
  usuarioSenha: string = '';
  usuarioFone: string = '';
  usuarioDepto: string = '';
  altIncuser: string = '';
  usuarios: Observable<any>;
  dataSource: MatTableDataSource<cadUsuario>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  linhaValor: string;
  empresaValor: string;


  constructor(
    public router: Router,
    private fj: funcsService,
  ) { }

  ngOnInit(): void {
    if (this.arrUserLogado.perfil === 'Administrador') {
      this.buscaUsuarios();
    } else {
      alert('Sem Acesso')
      this.router.navigate(['opResumo']);
    }
    this.altIncuser = 'i';
  }

  
  buscaUsuarios() {
    const obj = {};
    let cPerf = ''
    this.arrUsuario = this.fj.buscaPrt('cadUsuarios', obj);
    this.aPerfil.push('Todos');

    this.arrUsuario.subscribe(cada => {
      cada.forEach(xy => {
        this.arrUsuarioTab.push({
          'codUser': xy.codigo,
          'empresa': xy.empresa,
          'nome': xy.nome,
          'email': xy.email,
          'senha': xy.senha,
          'perfil': xy.perfil,
          'depto': xy.depto,
          'telefone': xy.telefone,
          'linha': xy.linha
        })
        if (cPerf.indexOf(xy.perfil) === -1) {
          cPerf += xy.perfil
          this.aPerfil.push(xy.perfil)
        }
      });
      this.dataSource = new MatTableDataSource(this.arrUsuarioTab)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  incUser() {
    let conta = 0;
    if (this.altIncuser === 'i') {
      this.arrUsuarioTab.forEach(xy => {
        if (this.usuarioEmail == xy.email) {
          conta++
        }
      });
    }


    if (conta === 0) {
      let obj = {
        'codUser': this.usuarioCodigo == '' ? 0 : this.usuarioCodigo,
        'empresa': this.valEmpresa.join(' - '),
        'nome': this.usuarioNome,
        'email': this.usuarioEmail,
        'senha': this.usuarioSenha,
        'perfil': this.valPerfil,
        'depto': this.usuarioDepto,
        'telefone': this.usuarioFone,
        'linha': this.linhaValor
      }


      if (this.usuarioNome === '' || this.usuarioEmail === '') {
        alert('Usuário ou Email em branco')
        return true
      } else {
        this.fj.buscaPrt('incluiAlteraUsuario', obj).subscribe(q => { window.location.reload() });

      }
    } else {
      alert('Email já em Uso')
    }
  }

  editUser(xcObl) {
    this.usuarioCodigo = xcObl.codUser
    this.usuarioEmpresas = xcObl.empresa
    this.valEmpresa = xcObl.empresa ? [...xcObl.empresa.split(' - ')] : [];
    this.atualizaEmpresaValor();
    this.valLinha = xcObl.linha != null ? [...xcObl.linha.split(' - ')] : [];
    this.atualizaLinhaValor();
    this.usuarioNome = xcObl.nome
    this.usuarioEmail = xcObl.email
    this.usuarioSenha = xcObl.senha
    this.valPerfil = xcObl.perfil
    this.usuarioDepto = xcObl.depto
    this.usuarioFone = xcObl.telefone
    this.altIncuser = 'e';
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  altFilter(dd) {
    if (dd.value == 'Todos') {
      this.dataSource = new MatTableDataSource(this.arrUsuarioTab)
    } else {
      let array = this.arrUsuarioTab.filter(q => dd.value === q.perfil);
      this.dataSource = new MatTableDataSource(array)
    }
  }

  atualizaLinhaValor() {
    let array = this.arrLinhas.filter(q => this.valLinha.includes(q.linha));
    this.linhaValor = array.map(q => q.linha).join(' - ');
  }

  atualizaEmpresaValor() {
    let array = this.arrEmpresaTab.filter(q => this.valEmpresa.includes(q.codFil));
    this.empresaValor = array.map(q => q.codFil).join(' - ');
  }


}
