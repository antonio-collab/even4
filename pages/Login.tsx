import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Colors from '../contantes/Colors';
import { useAuth } from '../context/hooks/useAuth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa a biblioteca de ícones

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedEmail, setFocusedEmail] = useState(false);
    const [focusedPassword, setFocusedPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleSign() {
        if (!email || !password) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        setLoading(true);

        login(email, password)
            .then(() => {
                alert("Login realizado com sucesso!");
            })
            .catch((error) => {
                alert("Erro ao fazer login: " + error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <View style={styles.container}>

            <View style={styles.form}>
                <Text>E-mail</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Digite seu email"
                        placeholderTextColor={focusedEmail ? Colors.black : Colors.gray}
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setFocusedEmail(true)}
                        onBlur={() => setFocusedEmail(false)}
                    />
                </View>

                <Text>Senha</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Digite sua senha"
                        placeholderTextColor={focusedPassword ? Colors.black : Colors.gray}
                        style={styles.input}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setFocusedPassword(true)}
                        onBlur={() => setFocusedPassword(false)}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                        <Icon 
                            name={showPassword ? "eye-off" : "eye"}
                            size={20}
                            color={Colors.gray}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSign}>
                    <Text style={styles.buttonText}>
                        {loading ? "Carregando..." : "Login"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
});
