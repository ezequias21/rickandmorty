import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import api from '../../services/api'
import { Ionicons } from '@expo/vector-icons';
import { SearchContainer, Search, Container, IconContainer } from './style';

export function SearchBar({ checkIsSearching, handleFilteredCharacteres }: any) {

    const [text, onChangeText] = useState<string>("");



    useEffect(() => {

        api.get('/character/?name=' + text)
            .then(({ data }) => {
                handleFilteredCharacteres(data.results)
            })
            .catch((err) => {
                handleFilteredCharacteres([])
            });

    }, [text])

    const handleOnChangeText = (value: string) => {
        value == '' ? checkIsSearching(false) : checkIsSearching(true)
        onChangeText(value)
    }
    return (
        <Container>


            <SearchContainer>


                <IconContainer>


                    <Ionicons name="search" size={15} color={"black"}></Ionicons>
                </IconContainer>
                <Search
                    onChangeText={(value) => handleOnChangeText(value)}
                    value={text}
                    placeholder="Busque por um personagem"
                />
            </SearchContainer>
        </Container>
    )
}
