import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from "reactstrap";
import Filtrados from './components/filtrados';

const data = [ 
  {id: 1, nombre: "Carlos villagran", telefono: "55555555", Email:"ivan@email.com"},
  {id: 2, nombre: "Alan brito", telefono: "30224564", Email:"alanbrito@email.com"},
  {id: 3, nombre: "Rosa Marin", telefono: "12930293", Email:"Rosa@email.com"},
];

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      nombre: "",
      telefono: "",
      Email: ""
    }, 
    dataSearch: [],
    modalInsertar: false,
    modalActualizar: false,
    modalConfirmacion: false
  };

  handleChange = e =>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    })
  }
 
  //#region metodos de modales
  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarConfirmacion = (dato) => {
    this.setState({
      form: dato,
      modalConfirmacion: true
    });
    
  };

  cerrarConfirmacion = () =>{
    this.setState({ modalConfirmacion: false });
  }
//#endregion
  
  //#region CRUD
  insertar = () =>{
    let valorNuevo = this.state.form;
    valorNuevo.id = this.state.data.length + 1;
    let lista = this.state.data;
    lista.push(valorNuevo)
    this.setState({data: lista, modalInsertar: false})
  }
  
  editar = (dato) =>{
    let contador = 0;
    let lista = this.state.data;
    lista.map((registro)=>{
      if(dato.id === registro.id){
        lista[contador].nombre = dato.nombre;
        lista[contador].telefono = dato.telefono;
        lista[contador].Email = dato.Email;
      }
      contador++;
    });
    this.setState({data: lista, modalActualizar: false})
  }

  eliminar = (dato) =>{
    let contador = 0; 
    let lista = this.state.data;
    lista.map((registro) => { 
        if(registro.id === dato.id){
          lista.splice(contador, 1);
        }
         contador++;
      });
      this.setState({data: lista, modalConfirmacion: false});
  }

  filtrar = (e) =>{
    const { value } = e.target;
    let lista = this.state.data;
    const filtered = lista.filter(fltr => fltr.nombre.toLowerCase().includes(value.toLowerCase()));
    
    // this.setState({data: filtered});
    this.setState({ dataSearch: !value ?  [] : filtered});   
  }
  //#endregion

  render() {  
    return (
      <>     
        <nav className="navbar navbar-dark bg-warning">
          <div class="container-fluid">
            <a class="navbar-brand">Agenda de contatos</a>            
            <form  class="d-flex">
              <input class="form-control me-2" onChange={this.filtrar} type="search" placeholder="Search" aria-label="Search"></input> "         "               
            </form>
            </div>
        </nav>        
          
        <Container>             
          <Filtrados 
            data = {this.state.dataSearch.length ? this.state.dataSearch : this.state.data}
            eliminar = {this.mostrarConfirmacion}
            editar = {this.mostrarModalActualizar}
          />   
          
          <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Adicionar Contato</Button>
          <br />
          <br/> 
        </Container>
        {/* Modal insertar */}
        <Modal isOpen = {this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Cadastrar Contato</h3>
            </div>       
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>id:</label> 
              <input className="form-control" readOnly type= "text" value = {this.state.data.length+1}/>
            </FormGroup> 

            <FormGroup>
              <label>Nome</label> 
              <input className="form-control" name="nombre" type= "text" onChange={this.handleChange}/>
            </FormGroup> 

            <FormGroup>
              <label>Celular</label> 
              <input className="form-control" name="telefono" type= "text" onChange={this.handleChange}/>
            </FormGroup> 
            <FormGroup>
              <label>Email</label> 
              <input className="form-control" name="Email" type= "text" onChange={this.handleChange}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>Salvar</Button>
            <Button color="danger" onClick={() => this.cerrarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>


        {/* Modal actualizar */}
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
                <h3>Editar contato</h3>
            </div>       
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>id:</label> 
              <input className="form-control" readOnly type= "text" value={this.state.form.id}/>
            </FormGroup> 

            <FormGroup>
              <label>Nome</label> 
              <input className="form-control" name="nome" type= "text" onChange={this.handleChange} value={this.state.form.nombre}/>
            </FormGroup> 

            <FormGroup>
              <label>Celular</label> 
              <input className="form-control" name="celular" type= "text" onChange={this.handleChange} value={this.state.form.telefono}/>
            </FormGroup> 

            <FormGroup>
              <label>Email</label> 
              <input className="form-control" name="Email" type= "text" onChange={this.handleChange} value={this.state.form.Email}/>
            </FormGroup> 
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={()=>this.cerrarModalActualizar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen = {this.state.modalConfirmacion}>
          <ModalHeader>
            <h4> Deseja apagar este contato? </h4>
          </ModalHeader>
          <ModalBody>
            <Button color="primary" onClick={()=> this.eliminar(this.state.form)}> Sim </Button> {"   "}
            <Button color="danger" onClick={()=>this.cerrarConfirmacion()}> N??o </Button>
          </ModalBody>        
        </Modal>      
      </>
    );
  }
}

export default App;

