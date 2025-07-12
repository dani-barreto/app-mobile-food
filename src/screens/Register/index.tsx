import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { ThemeButton } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';


const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [checked, setChecked] = useState<'cliente' | 'admin'>('cliente');

    const { register } = useAuth();
    async function handleCreateUser() {
        const missingFields = [];
        if (!name) missingFields.push('Nome');
        if (!email) missingFields.push('Email');
        if (!number) missingFields.push('Telefone');
        if (!password) missingFields.push('Senha');
        if (!passwordConfirm) missingFields.push('Confirmação Senha');

        if (missingFields.length > 0) {
            Alert.alert(
                'Campos obrigatórios',
                `Preencha os seguintes campos: ${missingFields.join(', ')}`
            );
            return;
        }

        if (email.length < 5 || !email.includes('@') || !email.includes('.')) {
            Alert.alert('Email inválido', 'Digite um email válido.');
            return;
        }

        if (password !== passwordConfirm) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        const tipo: 'cliente' | 'admin' = checked === 'cliente' ? 'cliente' : 'admin';
        const newUser = { nome: name, email, telefone: number, senha: password, tipo };
        const success = await register(newUser);
        if (success) {
            navigation.replace('Login');
        }
    }

    return (
        <SafeAreaView style={styles.window}>
            <View style={styles.container}>
                <View style={styles.medium}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Nome..."
                        onChangeText={setName}
                        value={name}
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email..."
                        textContentType='emailAddress'
                        onChangeText={text => setEmail(text.toLowerCase())}
                        value={email}
                        autoComplete='email'
                        onBlur={() => {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (email && !emailRegex.test(email)) {
                                Alert.alert('Email inválido', 'Digite um email válido.');
                            }}}
                        />
                        <TextInput
                            style={styles.TextInput}
                            placeholder="(99) 99999-9999"
                            textContentType='telephoneNumber'
                            onChangeText={text => {
                                const cleaned = text.replace(/\D/g, '');
                                let masked = cleaned;
                                if (masked.length > 2) {
                                    masked = `(${masked.slice(0, 2)}) ${masked.slice(2)}`;
                                }
                                if (masked.length > 9) {
                                    masked = `${masked.slice(0, 10)}-${masked.slice(10, 14)}`;
                                }
                                setNumber(masked);
                            }}
                            value={number}
                            keyboardType="numeric"
                            maxLength={15}
                        />
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Senha..."
                            textContentType='password'
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            value={password}
                            autoFocus={true}
                            autoComplete='password'
                        />
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Confirmação Senha..."
                            secureTextEntry={true}
                            textContentType='password'
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                            autoFocus={true}
                            autoComplete='password'
                        />
                    <View style={styles.radio}>
                        <RadioButton
                            value="cliente"
                            status={checked === 'cliente' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('cliente')}
                            color="black"
                        />
                        <Text style={styles.TextRadio}>Cliente</Text>
                        <RadioButton
                            value="admin"
                            status={checked === 'admin' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('admin')}
                            color="black"
                        />
                        <Text style={styles.TextRadio}>Admin</Text>
                    </View>
                </View>

                <View style={styles.bottom}>
                    <ThemeButton
                    title="Criar Conta"
                    type="black"
                    onPress={handleCreateUser}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;