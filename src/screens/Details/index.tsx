import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AntDesign } from '@expo/vector-icons'
import api from './../../services/api'
import './../../global/types/types.ts'


import { Button } from './../../components/Button'
import { ButtonBack } from './../../components/ButtonBack'

import {
    ImageContainer,
    ContentContainer,
    ImageThumb,
    Container,
    TitleContainer,
    Title,
    TextQuestion,
    TextAnswer,
    ContainerTextColumn,
    ContainerText,
    ButtonLike
} from './style'

import { LikesContext } from './../../contexts/context'


type Props = NativeStackScreenProps<RootStackParamList, 'Details'>

export function Details({ route, navigation }: Props) {

    const [character, setCharacter] = useState<Characteres | undefined>();
    const [isCharacterLiked, setIsCharacterLiked] = useState(false);
    const [likes, setLikes] = useContext(LikesContext)


    const store  = async () => {
      try {
        const jsonValue = JSON.stringify(likes)
        await AsyncStorage.setItem("likedIds1", jsonValue)
      } catch(e) {
        // save error
      }
    }


    const handleLikeButton = () => {
   
        if(!likes.includes(String(route.params.id))){
            setIsCharacterLiked(true)
            setLikes([...likes, String(route.params.id)])
        }else{
            setIsCharacterLiked(false)
    
            const list = []
            for(const [_, like] of likes.entries()){
                if(like != String(route.params.id))
                list.push(like)
            }
            setLikes(list)
        }
        store()
       
    }




    useEffect(() => {

        setIsCharacterLiked(likes.includes(String(route.params.id)))

        //Override the default back button 
        navigation.setOptions({
            headerLeft: () => {
                return <ButtonBack onPress={() => navigation.goBack()} />
            }
        })

        api.get(`/character/${route.params.id}`)
            .then(({ data }) => {
                setCharacter(data)
            })
    }, [])
    return (
        <Container>
            {character &&
                (<>
                    <ImageContainer>
                        <ImageThumb style={{ resizeMode: "cover", width: "100%", height: "100%" }} source={{ uri: character.image }} />

                    </ImageContainer>
                    <ContentContainer>
                        <TitleContainer>
                            <Title>{character.name}</Title>

                            <ButtonLike
                            underlayColor="transparent"
                                onPress={handleLikeButton}
                            >
                                <>
                                    {isCharacterLiked === true && (<AntDesign name="heart" size={24} color="black" />)}
                                    {isCharacterLiked !== true && (<AntDesign name="hearto" size={24} color="black" />)}
                                </>
                            </ButtonLike>
                        </TitleContainer>

                        <ContainerText>

                            <ContainerTextColumn>
                                <TextQuestion>Species</TextQuestion>
                                <TextAnswer>{character.species}</TextAnswer>
                            </ContainerTextColumn>


                            <ContainerTextColumn>
                                <TextQuestion>Gender</TextQuestion>
                                <TextAnswer>{character.gender}</TextAnswer>
                            </ContainerTextColumn>

                        </ContainerText>



                        <ContainerText>

                            <ContainerTextColumn>
                                <TextQuestion>Location</TextQuestion>
                                <TextAnswer>{character.location.name}</TextAnswer>
                            </ContainerTextColumn>
                        </ContainerText>

                        <ContainerText>

                            <ContainerTextColumn>
                                <TextQuestion>Origin</TextQuestion>
                                <TextAnswer>{character.origin.name}</TextAnswer>
                            </ContainerTextColumn>
                            <ContainerTextColumn>
                                <TextQuestion>Status</TextQuestion>
                                <TextAnswer status={String(character.status).toLowerCase()}>{character.status}</TextAnswer>
                            </ContainerTextColumn>
                        </ContainerText>
                    </ContentContainer>

                    <Button
                        title={"Buscar no google"}
                        hasIcone={false}
                        fontSize={22}
                        roundedBorders={false}
                        activeOpacity={.9}
                    />
                </>)}
        </Container>
    )
}