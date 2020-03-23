import React from 'react';
import api from '~/services/api';

// import { Container } from './styles';

export default function Dashboard() {
  api.get('recipients');
  return <h1>Dashboad</h1>;
}
