import React from 'react';
import { TouchableOpacity, Text, View, TouchableOpacityProps } from 'react-native';
import { ButtonContainer, ButtonText, ButtonContent } from './style';
import { Ionicons } from '@expo/vector-icons';

/* import { HeartIcont } from 'react-native-vector-icons/FontAwesome'; */
type Props =  TouchableOpacityProps & {
    title: string
    hasIcone?: Boolean | true,
    roundedBorders?:Boolean | true,
    fontSize?: number | 16 
} 
export function Button({ title, hasIcone, fontSize, roundedBorders, ...props } : Props) {
    return (
        <ButtonContainer roundedBorders={roundedBorders} { ...props}>
            <ButtonContent>
                <ButtonText fontSize={fontSize} >{title}</ButtonText>
               { hasIcone && ( <Ionicons name="arrow-forward" size={24} color={"white"}></Ionicons> )}
            </ButtonContent>
        </ButtonContainer>
    )
}