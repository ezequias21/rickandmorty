import styled from "styled-components/native";
import { theme } from './../../global/styles/theme';

export const ButtonBackContainer = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    background-color: ${theme.colors.backgroundLevel3};
    justify-content: center;
    align-items: center;
    border-radius: 20px;
`