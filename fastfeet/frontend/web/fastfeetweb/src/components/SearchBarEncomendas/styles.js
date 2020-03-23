import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  color: #aaa;
  font-size: 16px;
  align-items: right;
  display: flex;

  div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      width: 250px;
      height: 32px;
      border: 0;
      background: #fff;
      border-radius: 5px;
      text-indent: 32px;
    }
    span {
      position: absolute;
      top: 8px;
      left: 10px;
    }
  }
`;

export const Cadastrar = styled.button`
  background: #7d40e7 0% 0% no-repeat padding-box;
  border: 0;
  margin: 0;
  padding: 7px 15px;
  border-radius: 4px;
  color: #fff;

  div {
    color: #fff;

    div {
      svg {
        padding: 5px;
      }
      strong {
        padding: 0 5px;
      }
    }
  }
`;
