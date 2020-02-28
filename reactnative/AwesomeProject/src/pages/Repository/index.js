import React from 'react';
import PropTypes from 'prop-types';

import { Browser } from './styles';

export default function Repository({ route }) {
  const repository = route.params;
  console.tron.log('Repositório');
  console.tron.log(repository);

  return <Browser source={{ uri: repository.html_url }} />;
}

// Repository.propTypes = {
//   navigation: PropTypes.shape({
//     getParam: PropTypes.func,
//   }).isRequired,
// };

// Repository.navigationOptions = ({ navigation }) => ({
//   title: navigation.getParam('repository').name,
// });
