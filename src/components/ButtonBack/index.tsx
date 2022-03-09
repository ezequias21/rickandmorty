import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { Ionicons} from '@expo/vector-icons';

import { ButtonBackContainer } from './style';


export function ButtonBack(props : TouchableOpacityProps){

    return (
        <ButtonBackContainer {...props}>
            <Ionicons name="arrow-back" size={20} color={"white"}/>
        </ButtonBackContainer>
    )
}