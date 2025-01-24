import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Colors from '../contantes/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../routes/public.routes';

type NavigationProps = NativeStackNavigationProp<PublicStackParamList, 'home'>;

export default function Home() {
    const navigation = useNavigation<NavigationProps>()

    return (
        <View style={styles.container}>
            
            <Svg height="100" width="300">
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0" stopColor="#F0534F" stopOpacity="1" /> 
                        <Stop offset="1" stopColor="#000000" stopOpacity="1" /> 
                    </LinearGradient>
                </Defs>
                <SvgText
                    fill="url(#grad)"
                    fontSize="60"
                    fontWeight="bold"
                    textAnchor="middle"
                    x="150" 
                    y="40" 
                >
                    Event
                </SvgText>
                <SvgText
                    fill="url(#grad)"
                    fontSize="60"
                    fontWeight="bold"
                    textAnchor="middle"
                    x="150" 
                    y="85" 
                >
                    Finding
                </SvgText>
            </Svg>

            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Bem-vindo
                </Text>

                <Text style={styles.text}>
                    Crie uma conta conosco e experimente um ótimo planejador de eventos
                </Text>
            </View>


            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('register')}>
                    <Text style={styles.buttonText}>
                        Criar uma Conta
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonWhite} onPress={() => navigation.navigate('login')}>
                    <Text style={styles.buttonTextWhite}>
                        Login
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
        gap: 100,
    },
    textContainer: {
        gap: 10,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        paddingHorizontal: 20,
        fontSize: 18,
    },
    buttonsContainer: {
        gap: 10,
        width: '70%',
    },
    button: {
        backgroundColor: Colors.salmon,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 8,
    },
    buttonWhite: {
        backgroundColor: Colors.white,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 8,
        borderColor: Colors.salmon,
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonTextWhite: {
        fontSize: 16,
        color: Colors.salmon,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
