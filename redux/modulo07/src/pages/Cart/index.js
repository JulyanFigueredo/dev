import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

export default function Cart() {
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </td>

            <td>
              <strong>Sandália</strong>
              <span>R$ 192,90</span>
            </td>
            <td>
              <div>
                <button type="button">
                  <MdRemoveCircleOutline size={20} color="#7159c1" />
                </button>
                <input type="number" readOnly value={1} />
                <button type="button">
                  <MdAddCircleOutline size={20} color="#7159c1" />
                </button>
              </div>
            </td>
            <td>
              <strong>R$258,29</strong>
            </td>
            <td>
              <button type="button">
                <MdDelete size={20} color="#7159c1" />
              </button>
            </td>
          </tr>
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>1920,28</strong>
        </Total>
      </footer>
    </Container>
  );
}
