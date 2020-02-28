import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RecyclerViewBackedScrollViewComponent } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Autor,
} from './styles';

export default function User({ route }) {
  const [stars, setStars] = useState(null);
  const [user, setUser] = useState(route.params.user);

  useEffect(() => {
    // const response = api.get(`/users/${user.login}/starred`);
    console.tron.log('pimba');
    const getResponse = async () => {
      console.tron.log('entrou getResponse');
      const response = await fetch(
        `https://api.github.com/users/${user.login}/starred`
      );
      const jsonResponse = await response.json();
      console.tron.log(jsonResponse);
      setStars(jsonResponse);
    };
    getResponse();
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <Stars
        data={stars}
        keyExtractor={star => String(star.id)}
        renderItem={({ item }) => (
          <Starred>
            <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
            <Info>
              <Title>{item.name}</Title>
              <Autor>{item.owner.login}</Autor>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
}
