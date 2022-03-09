import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LikesContext } from './../../contexts/context'
import './../../global/types/types.ts'

import {
    CardContainer,
    ImageContainer,
    ContentContainer,
    Title,
    ImageThumb,
    Info,
    ContentRow,
    IconContainer,
    TextContainer
} from './style'

type Props = {

    data: Characteres,
    isLiked: Boolean
}


export function Cards({ data, isLiked }: Props) {

    const [likes, setLikes] = useContext(LikesContext);

    return (
        <CardContainer>
            <ImageContainer>
                <ImageThumb source={{ uri: data.image }} />
            </ImageContainer>


            <ContentContainer>

                <Title numberOfLines={1} >{data.name}</Title>
                <Info
                    bold={false}
                    fontSize={16}
                    color={"secondary"}
                >Species: {isLiked}
                </Info>

                <Info
                    bold
                    fontSize={16}
                    color={"primary"}
                >
                    {data.species}
                </Info>
                <Info
                    bold={false}
                    fontSize={16}
                    color={"secondary"}
                >Origin:
                </Info>


                <ContentRow>
                    <TextContainer>

                        <Info
                            bold
                            fontSize={16}
                            color={"primary"}
                            numberOfLines={1}
                        >
                            {data.origin.name}
                        </Info>
                    </TextContainer>
                    <IconContainer>

                        {isLiked === true && (<AntDesign name="heart" size={24} color="black" />)}
                        {isLiked !== true && (<AntDesign name="hearto" size={24} color="black" />)}
                    </IconContainer>

                </ContentRow>
            </ContentContainer>

        </CardContainer>
    )
}

