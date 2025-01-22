import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import Colors from '../contantes/Colors';
import { useAuth } from '../context/hooks/useAuth';

export default function Login() {
        const {login} = useAuth();
        const [email, setEmail]= useState('');
        const [password, setPassword]= useState('');
        const [loading, setLoading]= useState('');

        function handleSign(){
            
        }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logoText}>
                <Text style={{ color: Colors.black }}>Even4</Text>
                </Text>


                <Text style={styles.slogan}>Seu evento na melhor plataforma</Text>
            </View>

            <View style={styles.form}>

                <View style={styles.label}>

                    <Text>Email</Text>
                    <TextInput
                        placeholder='Digite seu email'
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.label}>

                    <Text>Senha</Text>
                    <TextInput
                        placeholder='Digite sua senha'
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                
                <TouchableOpacity  style={styles.button} onPress={() => login("antonioac@gmail.com","antonio12")}>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </TouchableOpacity>

            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 34,
        backgroundColor: Colors.red,
        alignItems: 'center'
    },
    header: {
        paddingLeft: 14,
        paddingRight: 14,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 8,
    },
    slogan: {
        fontSize: 34,
        color: Colors.white,
        marginBottom: 34,
    },
    form: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 24,
        paddingLeft: 14,
        paddingRight: 14,
        width: '100%',
    },
    label: {
        color: Colors.zinc,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14,
    },
    button: {
        backgroundColor: Colors.red,
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 8,
    },
    buttonText:{
        color: Colors.white,
        fontWeight:'bold',
    },
    link:{
        marginTop: 16,
        textAlign:'center',
    }
})