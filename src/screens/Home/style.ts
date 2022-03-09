import styled from 'styled-components/native';
import { theme } from './../../global/styles/theme';

export const BandContainer = styled.View`
  
  height: 125px;
  background:${theme.colors.backgroundLevel3} ;
  padding: 23px;
`
export const Band = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const Title = styled.Text`
    font-size: 32px;
    font-family: ${theme.fonts.text700};
    color: white;
    `
export const Info = styled.Text`
    font-family: ${theme.fonts.text400};
    font-size: 14px;
    color: ${theme.textColors.colorLevel1};
    `
export const ContainerSearchBar = styled.View`
    margin-top: -25px;
    margin-bottom: 15px;
`
export const ContentContainer = styled.View`
    padding-left: 14px;
    padding-right: 14px;
    background-color: ${theme.colors.backgroundLevel2};
    height: 100%;
`
export const ListItem = styled.TouchableHighlight`

    background-color: ${theme.colors.backgroundLevel2};
    margin-bottom: 15px;
`

export const Loading = styled.View`
    padding: 15px;
`
