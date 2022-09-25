import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { Entypo } from '@expo/vector-icons'

import { styles } from './styles';

export interface DuoCardsProps {
    id: string,
    hourEnd: string,
    hourStart: string,
    name: string,
    useVoiceChanne: boolean,
    weekDays:string[],
    yearsPlaying: number,
}

interface Props {
    data: DuoCardsProps;
    onConnect : () => void;
}

export function DuoCard({data, onConnect} : Props) {


    
  return (
    <View style={styles.container}>
        <DuoInfo 
            label='Nome'
            value={data.name}
        />

        <DuoInfo 
            label='Tempo de jogo'
            value={`${data.yearsPlaying} anos`}
        />

        <DuoInfo 
            label='Disponibilidade'
            value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
        />

        <DuoInfo 
            label='Chamada de áudio?'
            value={data.useVoiceChanne ? "Sim" : "Não"}
            colorValue={data.useVoiceChanne ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
        />

        <TouchableOpacity
           style={styles.button}
           onPress={onConnect} 
        >
        <Entypo name="game-controller"  color={THEME.COLORS.TEXT} size={30}/>
        <Text style={styles.buttonTitle}>Conectar</Text>
        </TouchableOpacity>



    </View>
  );
}