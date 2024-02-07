import { Component } from '@angular/core';
import {JsonPipe, NgIf} from '@angular/common';
import {NgFor} from '@angular/common';
import {Clube} from "../model/Clube";
import {ClubeService} from "../service/clube.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgIf, NgFor, JsonPipe, FormsModule],
  templateUrl: './main.component.html'
})
export class MainComponent {

  clube = new Clube();

  //variavel para visibilidade dos botoes
  btnRegister:boolean = true;

  //JSON clubes
  clubes:Clube[] = [];

  table: boolean = true;

  //Constructor
  constructor(private service:ClubeService) {
  }

  getClube():void{
    this.service.getClubes().subscribe(retorno => this.clubes = retorno)
  }

  register():void{

    if(this.clube.nome.length > 0 && this.clube.estado.length > 0 && this.clube.ano.toString().length > 0){
      this.service.registerClube(this.clube)
        .subscribe(retorno => {
      this.clubes.push(retorno);

      this.clube = new Clube();

      alert('Clube Cadastrado com sucesso!')
      })
    }
    else{
      alert('Campos mandatórios precisam ser preenchidos!')
    }
  }

  edit():void{
    if(this.clube.nome.length > 0 && this.clube.estado.length > 0 && this.clube.ano.toString().length > 0) {
      this.service.editClube(this.clube)
        .subscribe(retorno => {
          let position = this.clubes.findIndex(obj => {
            return obj.id == retorno.id;
          });

          this.clubes[position] = retorno;

          this.clube = new Clube();

          this.btnRegister = true;
          this.table = true;

          alert('Clube editado com sucesso!')
        })
    }
    else{
      alert('Campos mandatórios precisam ser preenchidos!')
    }
  }

  delete():void{
    this.service.deleteClube(this.clube.id)
      .subscribe(retorno => {
        let position = this.clubes.findIndex(obj => {
          return obj.id == this.clube.id;
        });

        this.clubes.splice(position, 1)

        this.clube = new Clube();

        this.btnRegister = true;
        this.table = true;

        alert('Clube removido com sucesso!')
      })
  }

  getClubeByPosition(pos:number):void{
    this.clube = this.clubes[pos];

    this.btnRegister = false;
    this.table = false;
  }

  cancel():void{
    this.clube = new Clube();

    this.btnRegister = true;
    this.table = true;
  }

  ngOnInit(){
    this.getClube()
  }

}
