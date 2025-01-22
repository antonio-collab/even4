import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { useState } from 'react';
import Colors from '../contantes/Colors';

export default function Dashboard() {

        const [email, setEmail]= useState('');
        const [password, setPassword]= useState('');
        const [loading, setLoading]= useState('');

        function handleSign(){
            
        }
    return (
        <View style={styles.container}>
         <Text>Crie seus eventos aqui</Text>

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
        backgroundColor: Colors.green,
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 8,
    },
    buttonText:{
        color: Colors.zinc,
        fontWeight:'bold',
    },
    link:{
        marginTop: 16,
        textAlign:'center',
    }
})