import React, { useState } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';

import { ThemeButton } from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';


const LoginScreen: React.FC = ({ navigation }: any) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const auth = useAuth();

    function handleNavigateBack() {
        navigation.goBack();
    }

    async function handleLogin() {

    }

    return (
        <SafeAreaView style={styles.window}>
            <View style={styles.container}>
                <View style={styles.medium}>
                    <View style={styles.TextPadding}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Email..."
                            onChangeText={setEmail}
                            value={email}
                            textContentType='emailAddress'
                            keyboardType="email-address"
                            autoCapitalize="none"
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
                        />
                    </View>
                    <View style={styles.TextPadding}>
                        <ThemeButton
                        title="Entrar"
                        type="black"
                        onPress={handleLogin}
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
