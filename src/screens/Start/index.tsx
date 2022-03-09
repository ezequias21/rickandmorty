import React from 'react';
import { View, Image, Text, ImageBackground, StatusBar } from 'react-native';
import { Button } from '../../components/Button';

import BackgroundHome from '../../assets/home.png';
import Logo from './../../assets/logo.png';

import { Container, BackgroundImage, ImageLogo, Content } from './style';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Start: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
  Details: {id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>

export function Start({ navigation} : Props) {
  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
        />
      <BackgroundImage source={BackgroundHome} resizeMode="cover">
        <Content>
          <ImageLogo source={Logo} />
          <Button 
            title={"Prosseguir"}
            hasIcone
            roundedBorders
            fontSize={15}
            activeOpacity={.9}
            onPress={() => navigation.navigate('Home')}
            />
        </Content>
      </BackgroundImage>
    </Container>
  );
}