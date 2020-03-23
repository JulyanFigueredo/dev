import React from 'react';
import { Input } from '@rocketseat/unform';
import { FaSearch, FaPlus } from 'react-icons/fa';

import { Container, Cadastrar } from './styles';

export default function SearchBarEncomendas() {
  const onChange = data => {
    console.tron.log(data.target.value);
  };

  return (
    <Container>
      <div>
        <div>
          <span className="fa-search">
            <FaSearch />
          </span>
          <Input
            name="busca"
            placeholder="Busca por Encomendas"
            onChange={onChange}
          />
        </div>
        <Cadastrar>
          <div>
            <FaPlus size={14} />
            <div>
              <strong>CADASTRAR</strong>
            </div>
          </div>
        </Cadastrar>
      </div>
    </Container>
  );
}
