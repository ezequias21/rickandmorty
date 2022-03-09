import styled from "styled-components/native";
import { theme } from './../../global/styles/theme';


/* export const SearchContainer = styled.View`
    flex: 1;
    flex-direction: row;
    background: #ffffff;
    height: 50px;
   
` */

export const Container = styled.View`
    height: 50px;
    background: white;
    border-radius: 6px;
`
export const SearchContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    height: 100%;
    padding: 15px;

`

export const Search = styled.TextInput`
    flex: 1;
    height: 50px;
`
export const IconContainer = styled.View`
    padding-right: 15px;
`