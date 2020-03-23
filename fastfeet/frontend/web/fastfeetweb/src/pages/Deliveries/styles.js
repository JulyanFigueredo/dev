import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 30px;
  width: 1200px;
`;

export const Title = styled.div`
  padding: 34px 0px;
  width: 1200px;
  font-weight: bold;
  font-size: 24px;
  color: #333;
`;

export const Status = styled.td`
  div {
    background: #dff0df 0% 0% no-repeat padding-box;
    padding: 2px;
    border-radius: 12px;
    width: 80%;
    text-align: center;

    strong {
      color: ${props => props.cor};
      padding: 5px;
    }
  }
`;

export const CellRecipient = styled.td`
  background: #f4effc 0% 0% no-repeat padding-box;
  opacity: 1;
  border-radius: 50%;
  color: ${props => props.cor};
`;

export const Table = styled.table`
  padding: 0;
  margin: 0;
  border-spacing: 0 20px;
  border-collapse: separate;
  width: 100%;
  text-align: left;
  color: #333;

  tr {
    background: #fff;
    height: 57px;
    border-radius: 4px;
    text-align: left;
    font-size: 16px;

    td {
      text-align: left;
      padding: 0px 20px;
    }

    th {
      text-align: left;
      padding: 0px 20px;
      background: none;
    }
  }
`;
