import React, { Component } from 'react';
import TechItem from './TechItem';

class TechList extends Component {
    state = {
        newTech: '',
        techs: []
    };

    //executa assim que o componente aparece em tela
    componentDidMount(){
        const techs = localStorage.getItem('techs');

        if(techs){ //se tem alguma coisa em localstorage
            this.setState({ techs: JSON.parse(techs)});
        }
    }

    //executado quando há alteração nas props ou estado
    componentDidUpdate(_, prevState){
        if(prevState.techs != this.state.techs){
            localStorage.setItem('techs', JSON.stringify(this.state.techs));
        }


    }

    //executa quando componente deixa de existir
    componentWillUnmount(){

    }

    handleInputChange = e => {
        this.setState({ newTech: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault(); //para não recargar a tela
        this.setState({
            techs: [
                ...this.state.techs, this.state.newTech
            ],
            newTech: ''
        });

    }

    handleDelete = (tech) => {
        this.setState({ techs: this.state.techs.filter(t => t != tech) })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>{this.state.newTech}</h1>
                <ul>
                    {this.state.techs.map(tech => 
                    <TechItem 
                        key={tech} 
                        tech={tech}
                        onDelete={() => this.handleDelete(tech)} 
                    />)}
                    
                </ul>
                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={this.state.newTech}>
                </input>
                <button type="submit">Enviar</button>
            </form>
        )
    };
}

export default TechList;