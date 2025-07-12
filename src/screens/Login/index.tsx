import React, { useState } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';

import { ThemeButton } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';


const LoginScreen: React.FC = ({ navigation }: any) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useAuth();

    async function signIn() {
        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        const success = await login(email, password);
        if (success) {
            navigation.navigate('Home');
        } else {
            alert('Senha ou usuário inválido.');
        }
    }

    return (
        <SafeAreaView style={styles.window}>
            <View style={styles.container}>
                <View style={styles.medium}>
                    <View style={styles.TextPadding}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Email..."
                            onChangeText={text => setEmail(text.toLowerCase())}
                            value={email}
                            textContentType='emailAddress'
                            keyboardType="email-address"
                            autoComplete='email'
                        />
                    </View>
                    <View style={styles.TextPadding}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Senha..."
                            secureTextEntry={true}
                            textContentType='password'
                            onChangeText={setPassword}
                            value={password}
                            autoFocus={true}
                            autoComplete='password'
                        />
                    </View>
                    <View style={styles.TextPadding}>
                        <ThemeButton
                        title="Entrar"
                        type="black"
                        onPress={signIn}
                        />
                    </View>
                    <View style={styles.AreaSubTitle}>
                        <ThemeButton
                            title="Não possui conta? Cadastre-se"
                            type="white"
                            onPress={() => navigation.navigate('Register')}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
