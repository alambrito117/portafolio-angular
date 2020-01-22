import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  constructor(  private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise( (resolve, reject) => {
    this.http.get('https://angular-html-4f49c.firebaseio.com/productos_idx.json')
    .subscribe( (resp: Producto[])=>{
      
      console.log(resp);

     this.productos = resp;
     this.cargando = false;
     resolve();

     
    }); 
   });
  }

  getProducto (id:string){
    return this.http.get(`https://angular-html-4f49c.firebaseio.com/productos/${ id}.json`)
  }

  buscarProducto(  termino:string){

    if(this.productos.length == 0){
      //esperar que esten cargados los productos
      this.cargarProductos().then(()=>{
        //este codigo se ejecutara despues de obtener los productos
        //Aplicamos el filtro
        this.filtrarProductos( termino );
      });
    }else{
      //aplicamos el filtro
      this.filtrarProductos( termino );
    }

   
  }

  private filtrarProductos(termino: string){
    this.productosFiltrados = [];
    
    termino = termino.toLocaleLowerCase();//pasamos a minusculas

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf( termino) >= 0 || tituloLower.indexOf( termino ) >= 0){
        this.productosFiltrados.push(prod);

      }
    });
  }

}
