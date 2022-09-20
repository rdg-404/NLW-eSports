import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { ModalProps, Text } from 'react-native';
import { Modal, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';


import { Heading } from '../Heading';
import { useState } from 'react';


interface Props extends ModalProps{
    discord: string;
    onClose: () => void;
}

export function DuoMatch({discord, onClose, ...rest}: Props) {

    const [isCoping, setIscoping ] = useState(false);

    async function handleCopyClipboard(){
        setIscoping(true);
        await Clipboard.setStringAsync(discord);

        Alert.alert("Discord copiado", "Usuário salvo na área de tranferência.");
        setIscoping(false);
    }
  return (
    <Modal
        animationType="fade"
        transparent
        statusBarTranslucent
        {...rest}
    >   

        
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                    />

                    <Heading
                        title="Vamos Jogar!!"
                        subtitle="Agora é só  começar a jogar!"
                        style={{alignItems: 'center', marginTop: 24}}
                    />


                    <Text style={styles.label}>
                        Adicione seu Discord
                    </Text>

                    <TouchableOpacity 
                        style={styles.discordButton}
                        onPress={handleCopyClipboard}
                        disabled={isCoping}
                    
                    >
                        <Text style={styles.discord}>

                            {isCoping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
    </Modal>
  );
}