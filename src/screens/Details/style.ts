import styled from 'styled-components/native';
import { theme } from './../../global/styles/theme';

import {  TextInputProps } from 'react-native';

type StatusProps = TextInputProps & {
    status?: string | "none";
}
export const Container = styled.View`
    height: 100%;
    background: ${theme.colors.backgroundLevel1};
`
export const ImageContainer = styled.View`
    flex: 7;

`
export const ImageThumb = styled.Image`
    width: 100%;  
`
export const ContentContainer = styled.View`
    flex: 6;
    padding: 20px;
`
export const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
`
export const Title = styled.Text`
    font-size: 24px;
    font-family: ${theme.fonts.text700};
    color: ${theme.textColors.primary};
`
export const TextQuestion = styled.Text`
    font-size: 16px;
    font-family: ${theme.fonts.text400};
    color: ${theme.textColors.primary};
`
export const TextAnswer = styled.Text<StatusProps>`
    font-size: 16px;
    font-family: ${theme.fonts.text700};

    ${({ status }) =>{
        switch(status){
            case "alive":
                return `color: ${theme.status.alive}`;
            case "dead":
                return `color:  ${theme.status.dead}`;
            case "unknown":
                return `color: ${theme.status.unknown}`;
            default:
                return `color: ${theme.textColors.primary}`;
        }
    }}
`
export const ButtonLike = styled.TouchableHighlight`
    width: 24px;
    height: 24px;
    opacity: 1;
    background: transparent;
`
export const ContainerText = styled.View`
    flex-direction: row;
    padding-bottom: 20px;
`
export const ContainerTextColumn = styled.View`
    flex: 2;

`