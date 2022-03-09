import styled from 'styled-components/native';

import { theme } from './../../global/styles/theme';
import {  TouchableOpacityProps, TextInputProps } from 'react-native';

type Props =  TouchableOpacityProps &  {
    roundedBorders?:Boolean | true;
}
type TextProps = TextInputProps & {
    fontSize?: number | 16;
}



export const ButtonContainer = styled.TouchableOpacity<Props>`
    width: 100%;
    height: 55px;
    background-color: ${theme.colors.backgroundButton};
    flex-direction: row;
    align-items: center;
    border-radius: ${ (props) => props.roundedBorders ? "8px" : "0"};
`

export const ButtonContent = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const ButtonText = styled.Text<TextProps>`
    font-family: ${theme.fonts.text400};
    font-size: ${ (props) => props.fontSize + "px"};
    color: white;
    text-align: center;
    margin-right: 18px;
`
export const ButtonIcon = styled.View`
    
`

