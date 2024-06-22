import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function ListaScreen({ listData }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes Cadastrados</Text>
      <FlatList
        style={styles.list}
        data={listData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>Nome: {item.nome}</Text>
            <Text>CPF: {item.cpf}</Text>
            <Text>Idade: {item.idade}</Text>
            <Text>CEP: {item.cep}</Text>
            <Text>Endereço: {item.endereco}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,  // Aumentando o tamanho da fonte para 28
    marginBottom: 20,
    color: '#4CAF50',  // Alterando a cor do título para verde (#4CAF50)
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  listItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
