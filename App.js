import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import ListaScreen from './ListaScreen';  // Certifique-se de criar e ajustar ListaScreen.js conforme mostrado anteriormente

const Stack = createStackNavigator();

export default function App() {
  const [listData, setListData] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro">
        <Stack.Screen name="Cadastro">
          {props => <CadastroScreen {...props} listData={listData} setListData={setListData} />}
        </Stack.Screen>
        <Stack.Screen name="Lista">
          {props => <ListaScreen {...props} listData={listData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CadastroScreen({ navigation, listData, setListData }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBlurCep = async () => {
    if (cep.trim().length !== 8) {
      alert('Por favor, insira um CEP válido.');
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;
      const enderecoCompleto = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;
      setEndereco(enderecoCompleto);
    } catch (error) {
      console.error('Erro ao obter o endereço:', error);
      alert('Erro ao obter o endereço. Por favor, verifique o CEP e tente novamente.');
    }
  };

  const handleCadastro = async () => {
    if (!nome.trim() || !cpf.trim() || !idade.trim() || !cep.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const newCliente = { nome, cpf, idade, cep, endereco };
      const response = await axios.post('http://localhost:3000/clientes', newCliente);

      setListData(prevListData => [
        ...prevListData,
        response.data
      ]);

      setNome('');
      setCpf('');
      setIdade('');
      setCep('');
      setEndereco('');
    } catch (error) {
      console.error('Erro ao cadastrar o cliente:', error);
      alert('Erro ao cadastrar o cliente. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre um novo cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        onBlur={handleBlurCep}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço completo"
        value={endereco}
        onChangeText={setEndereco}
        editable={false}
      />
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : (
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Lista')}
      >
        <Text style={styles.buttonText}>Ver Clientes Cadastrados</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',  // Alterando a cor de fundo para verde (#4CAF50)
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,  // Aumentando o tamanho da fonte para 28
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
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

