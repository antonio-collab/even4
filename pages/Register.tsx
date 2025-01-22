import { View, 
    Text, 
    StyleSheet, 
    TextInput,
     Pressable, 
     SafeAreaView,
    ScrollView
 } from 'react-native'

import Colors from '../contantes/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { api } from '../services/api';

type FormDataProps = {
    name: string;
    email: string;
    password: string;
  };

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [loading, setLoading]= useState('');

    async function handleSignUp({name, email, password}: FormDataProps){
        try {
            const response = await api.post('register', {name, email, password})
            
        } catch (error) {
            
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
            <View style={styles.header}>

                <Pressable
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color={Colors.white} />
                </Pressable>


                <Text style={styles.logoText}>
                    Dev <Text style={{ color: Colors.green }}>App 16:23</Text>
                </Text>


                <Text style={styles.slogan}>Criar uma conta</Text>
            </View>

            <View style={styles.form}>

                <View style={styles.label}>

                    <Text>Nome completo</Text>
                    <TextInput
                        placeholder='Nome completo...'
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

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

                <Pressable style={styles.button} onPress={() => handleSignUp({name, email, password}) }>
                    <Text style={styles.buttonText}> Cadastrar</Text>
                </Pressable>

            </View>


        </View>
        </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 34,
        backgroundColor: Colors.zinc,
        alignItems: 'center'
    },
    header: {
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
        backgroundColor: Colors.green,
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 8,
    },
    buttonText: {
        color: Colors.zinc,
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: 'rgba(255,255,255,0.55)',
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
    },
})