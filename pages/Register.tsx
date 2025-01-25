import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Colors from '../contantes/Colors';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../routes/public.routes';

type NavigationProps = NativeStackNavigationProp<PublicStackParamList, 'register'>;

export default function Register() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignUp({ name, email, password }: SignUpFormDataProps) {
    try {
      const response = await api.post("register", { name, email, password });
    } catch (error) {}

    setLoading(true);

    login(email, password)
      .then(() => {
        alert("Cadastro realizado com sucesso!");
      })
      .catch((error) => {
        alert("Erro ao fazer login: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function handleSign() {
    
  }

<<<<<<< HEAD
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>Nome</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Digite seu Nome" style={styles.input} />
=======
            <View style={styles.form}>
                <Text>Nome</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Digite seu Nome"
                        style={styles.input}
                    />
                </View>

                <Text>E-mail</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Digite seu E-mail"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <Text>Senha</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Digite sua Senha"
                        style={styles.input}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                        <Icon 
                            name={showPassword ? "eye-off" : "eye"}
                            size={20}
                            color={Colors.gray}
                        />
                    </TouchableOpacity>
                </View>

                <Text>Telefone</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Digite seu Telefone"
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
                    <Text style={styles.buttonText}>
                        Criar Conta
                    </Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text>
                        Já possui uma conta?
                    </Text>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('login')}>
                        <Text style={styles.textFooter}>Faça login</Text>
                    </TouchableOpacity>
                </View>

            </View>
>>>>>>> a47ea5565d39f8835ecc8451b439f9d95aa87953
        </View>

        <Text>E-mail</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite seu E-mail"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text>Senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite sua Senha"
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.icon}
          >
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color={Colors.gray}
            />
          </TouchableOpacity>
        </View>

        <Text>Telefone</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite seu Telefone"
            style={styles.input}
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSign}>
          <Text style={styles.buttonText}>
            {loading ? "Carregando..." : "Criar Conta"}
          </Text>
        </TouchableOpacity>

        <View style={styles.textFooter}>
          <Text>Já possui uma conta?{"  "}</Text>
          <TouchableOpacity>
            <Text style={styles.linkFooter}>Faça login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  form: {
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 7,
    color: Colors.black,
  },
  icon: {
    margin: 5,
  },
  button: {
    backgroundColor: Colors.salmon,
    paddingTop: 14,
    paddingBottom: 14,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "bold",
  },
  link: {
    marginTop: 16,
    textAlign: "left",
    color: Colors.salmon,
    fontSize: 14,
    fontWeight: "500",
  },
  linkFooter: {
    color: Colors.salmon,
    fontWeight: "bold",
  },
  textFooter: {
    flex: 1,
    flexDirection: "row",
  },
=======
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    form: {
        paddingLeft: 14,
        paddingRight: 14,
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 8,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        paddingLeft: 7,
        color: Colors.black,
    },
    icon: {
        margin: 5,
    },
    button: {
        backgroundColor: Colors.salmon,
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 8,
        marginBottom: 15,
    },
    buttonText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 16,
        textAlign: 'left',
        color: Colors.salmon,
        fontSize: 14,
        fontWeight: '500',
    },
    footerContainer: {
        alignItems: 'center'
    },
    textFooter: {
        color: Colors.salmon,
        fontWeight: 'bold'
    }
>>>>>>> a47ea5565d39f8835ecc8451b439f9d95aa87953
});
