import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  //para poder utilizar el servicio, tenemos que inyectarlo primero
  constructor(public _infoService: InfoPaginaService) { }

  ngOnInit() {
  }

}
