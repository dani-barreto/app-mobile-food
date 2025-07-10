import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { ThemeButton } from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';


const RegisterScreen: React.FC = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [checked, setChecked] = useState<'cliente' | 'admin'>('cliente');

    const { register } = useAuth();

    async function handleCreateUser() {
        if (!name || !email || !password || !passwordConfirm) return;
        if (password !== passwordConfirm) return;
        const tipo: 'cliente' | 'admin' = checked === 'cliente' ? 'cliente' : 'admin';
        const newUser = { nome: name, email, senha: password, tipo };
        const success = await register(newUser);
        if (success) {
            navigation.navigate('Login');
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
                        onChangeText={setEmail}
                        value={email}
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="988588787"
                        textContentType='telephoneNumber'
                        onChangeText={setNumber}
                        value={number}
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Senha..."
                        textContentType='password'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Confirmação Senha..."
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={setPasswordConfirm}
                        value={passwordConfirm}
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