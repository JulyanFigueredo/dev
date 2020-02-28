import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  RecyclerViewBackedScrollViewComponent,
  Modal,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

import { WebView } from 'react-native-webview';
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
  Loading,
} from './styles';

export default function User(props) {
  const { route } = props;

  const [stars, setStars] = useState(null);
  const [user, setUser] = useState(route.params.user);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const getResponse = async () => {
    const response = await fetch(
      `https://api.github.com/users/${user.login}/starred?page=${page}`
    );
    const jsonResponse = await response.json();
    setStars(jsonResponse);
  };

  useEffect(() => {
    setLoading(true);
    getResponse();
    setLoading(false);
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const toRefresh = () => {
    setRefresh(true);
    setPage(1);
    getResponse();
    setRefresh(false);
  };

  return (
    <Container>
      <Modal visible={loading}>
        <ActivityIndicator animating={loading} />
      </Modal>

      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <Stars
          onRefresh={toRefresh}
          refreshing={refresh}
          onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          onEndReached={loadMore} // Função que carrega mais itens
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred
              onPress={() => props.navigation.navigate('Repository', item)}
            >
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Autor>{item.owner.login}</Autor>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  );
}
