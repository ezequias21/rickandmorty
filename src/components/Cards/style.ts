
import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import { theme } from './../../global/styles/theme';
export const CardContainer = styled.View`

    height: 150px;
    flex-direction: row;
    background-color: ${theme.colors.backgroundLevel1};
    border-radius: 6px;
`
export const ImageContainer = styled.View`
    flex: 4;
`
export const ContentContainer = styled.View`
    flex: 6;
    padding: 10px;
`

export const ImageThumb = styled.Image`
    width: 100%;
    height:100% ;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
`
export const Title = styled.Text`
    font-family: ${theme.fonts.text700};
    font-size: 20px;
    padding: 3px;
`
type TextProps = TextInputProps & {
    bold: boolean;
    fontSize: number;
    color: string
}
export const Info = styled.Text<TextProps>`
   
    font-family: ${({ bold }) => bold ? theme.fonts.text700 : theme.fonts.text400};
    font-size: ${({ fontSize }) => fontSize + "px"};
    color: ${({ color }) => {
        switch (color) {
            case "primary":
                return `${theme.textColors.secondary}`;
            case "secondary":
                return `${theme.textColors.secondary}`;
            default:
                return `#000000`;
        }
    }};
    color: ${theme.textColors.secondary};
    padding: 1px;
    
`


export const ContentRow = styled.View`
/*     flex: 1; */
    flex-direction : row;
    justify-content: space-between;
`
export const IconContainer = styled.View`
    flex: 2;

`
export const TextContainer = styled.View`
   flex: 9;
`