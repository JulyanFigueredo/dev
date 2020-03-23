import React, { useState, useEffect } from 'react';
import { FaCircle } from 'react-icons/fa';
import api from '~/services/api';
import { Table, Status, CellRecipient, Container, Title } from './styles';
import SearchBarEncomendas from '~/components/SearchBarEncomendas';

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  async function fetchData() {
    const response = await api.get('deliveries');
    setDeliveries(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderTableData = () => {
    const resposta = deliveries.map(delivery => {
      const {
        id,
        recipient,
        deliveryman,
        startDate,
        endDate,
        canceledAt,
      } = delivery;

      let status = 'Retirada';
      let cor = '#4D85EE';

      if (startDate) {
        status = 'Pendente';
        cor = '#C1BC35';

        if (endDate) {
          status = 'Entregue';
          cor = '#2CA42B';
        }
      }
      if (canceledAt) {
        status = 'Cancelado';
        cor = '#DE3B3B';
      }

      const [firstName, lastName] = deliveryman.name.split(' ');
      const firstLetterName = firstName.substring(0, 1);
      const lastLetterName = lastName.substring(0, 1);

      return (
        <tr key={id}>
          <td>{`#${id}`}</td>
          <td>{recipient.name}</td>
          <td>
            <table>
              <tbody>
                <tr>
                  <CellRecipient cor={cor}>
                    {firstLetterName}
                    {lastLetterName}
                  </CellRecipient>
                  <td>{deliveryman.name}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>{recipient.city}</td>
          <td>{recipient.state}</td>
          {/* <Circle /> */}
          <Status cor={cor}>
            <div>
              <FaCircle size={10} color={cor} />
              <strong>{status}</strong>
            </div>
          </Status>
          <td>
            <button type="button">...</button>
          </td>
        </tr>
      );
    });
    return resposta;
  };

  function renderTableHeader() {
    return (
      <tr>
        <th>ID</th>
        <th>Destinatário</th>
        <th>Entregador</th>
        <th>Cidade</th>
        <th>Estado</th>
        <th>Status</th>
        <th>Ações</th>
      </tr>
    );
  }

  return (
    <Container>
      <Title>Gerenciando encomendas</Title>
      <SearchBarEncomendas />
      <Table>
        <tbody>
          {renderTableHeader()}
          {renderTableData()}
        </tbody>
      </Table>
    </Container>
  );
}

export default Deliveries; // exporting a component make it reusable and this is the beauty of react
