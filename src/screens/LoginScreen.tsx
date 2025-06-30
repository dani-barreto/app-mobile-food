import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icons from 'react-native-vector-icons/Feather';

import { useAuth } from '../context/AuthContext';
import { login_styles } from '../styles/login_styles';

const LoginScreen: React.FC = ({ navigation }: any) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // Pega o objeto de autenticação completo
    const auth = useAuth();

    function handleNavigateBack() {
        navigation.goBack();
    }

    async function handleLogin() {
        console.log("--- Botão 'Logar' pressionado. ---");

        // Log para verificar o que o contexto está fornecendo no momento do clique
        console.log("Verificando o objeto 'auth' recebido do contexto:", auth);

        if (!email || !password) {
            Alert.alert("Erro", "Por favor, preencha o email e a senha.");
            return;
        }

        // Verificação explícita se a função 'login' existe antes de chamá-la
        if (auth && typeof auth.login === 'function') {
            try {
                console.log("A função 'auth.login' existe. Tentando executar...");
                // Chama a função de login diretamente do objeto 'auth'
                const success = await auth.login(email, password);
                
                if (success) {
                    console.log("Login bem-sucedido, o AuthProvider deve redirecionar o usuário.");
                } else {
                    // Se o login falhar (retornar false), exibe um alerta.
                    Alert.alert("Erro de Login", "Email ou senha inválidos.");
                }

            } catch (error) {
                console.error("Erro inesperado no handleLogin:", error);
                Alert.alert("Erro de Aplicação", "Ocorreu um erro inesperado.");
            }
        } else {
            // Este alerta aparecerá se a função 'login' não for encontrada
            console.error("ERRO CRÍTICO: auth.login não é uma função!", auth);
            Alert.alert("Erro de Aplicação", "A função de login não está disponível.");
        }
    }

    return (
        <SafeAreaView style={login_styles.window}>
            <View style={login_styles.container}>
                <View style={login_styles.top}>
                    <TouchableOpacity onPress={handleNavigateBack}>
                        <Icons name="chevron-left" size={60} color="#000" />
                    </TouchableOpacity>
                    <Text style={login_styles.title}>Login</Text>
                </View>

                <View style={login_styles.medium}>
                    <View style={login_styles.TextPadding}>
                        <TextInput
                            style={login_styles.TextInput}
                            placeholder="Email..."
                            onChangeText={setEmail}
                            value={email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={login_styles.TextPadding}>
                        <TextInput
                            style={login_styles.TextInput}
                            placeholder="Senha..."
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            value={password}
                        />
                    </View>
                    <View style={login_styles.TextPadding}>
                        <TouchableOpacity
                            style={login_styles.ButtomBlack}
                            onPress={handleLogin}
                        >
                            <Text style={login_styles.ButtomTitleBlack}>Logar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={login_styles.AreaSubTitle}>
                        <TouchableOpacity
                            style={login_styles.SubTitle}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={login_styles.TextSubTitle}>Não possui conta? Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
