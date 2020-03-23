import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  /* @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap'); */
  height: 100%;
  background: linear-gradient(-90deg, #7159c1, #7159c1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  padding: 50px 20px;
  width: 100%;
  max-width: 315px;
  text-align: center;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #333;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(127, 127, 127, 0.7);
      }
    }

    span {
      color: crimson;
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      align-self: flex-start;
      margin: 0 0 10px;
    }

    label {
      color: rgba(0, 0, 0, 0.8);
      font-family: 'Roboto';
      text-align: left;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7159c1;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2;

      &:hover {
        background: ${darken(0.1, '#7159c1')};
      }
    }
  }
`;
