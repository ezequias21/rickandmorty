import React, { useState, useEffect, useContext, } from "react";
import { View, FlatList, ActivityIndicator } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SearchBar } from '../../components/SearchBar';
import { Cards } from "../../components/Cards";

import api from '../../services/api';

import {
    Band,
    Title,
    Info,
    ContainerSearchBar,
    BandContainer,
    ContentContainer,
    ListItem
} from './style'

import './../../global/types/types.ts'
import { LikesContext } from "../../contexts/context";


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export function Home({ navigation }: Props) {

    const [page, setPage] = useState(1);
    const [characters, setCharacters] = useState<Characteres[]>([])
    const [filteredCharacters, setFilteredCharacters] = useState<Array<Characteres>>([])
    const [charactersToShow, setCharactersToShow] = useState<Array<Characteres>>([])
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [qtdeCharacters, setQtdeCharacters] = useState(0);
    const [userIsSearching, setUserIsSearching] = useState<Boolean>(false)


    const [likes, setLikes] = useContext(LikesContext)

    useEffect(() => {

        loadCharacters()
        getLikes()
    }, [])

    const getLikes = async () => {
        var value = ''
        try {
            const jsonValue = await AsyncStorage.getItem('likedIds1')
            if (jsonValue != null)
                value = JSON.parse(jsonValue)
        } catch (e) { /* */ }

        setLikes(value)

    }

    function loadCharacters() {

        if (isLoading) return


        setIsLoading(true);

        const response = api.get(`/character/?page=${page}`)
            .then(({ data }) => {
                setQtdeCharacters(data.info.count)
                setCharacters([...characters, ...data.results])
                setCharactersToShow([...characters, ...data.results])
            })

        setPage(page + 1)
        setIsLoading(false);
    }
    const handleEndReached = () => {

        if (!userIsSearching)
            loadCharacters()
    }
    
    const handleFilteredCharacteres = (filteredCharacteres: Characteres[]) => {

        setFilteredCharacters(filteredCharacteres)
        setCharactersToShow(filteredCharacteres)
    }
    const checkIsSearching = (isSearching: Boolean) => {
        if (!isSearching)
            loadCharacters()
        setUserIsSearching(isSearching)
    }

    const renderItem = ({ item }: { item: Characteres }) => {

        const isLiked = likes.includes(String(item.id))
        return (
            <ListItem
                key={item.id}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Details', { id: item.id })}>

                <Cards
                    data={item}
                    isLiked={isLiked}
                />
            </ListItem>

        );
    };

    const itemListLayout = (data: any, index: number) => {
        return {
            length: 350,
            offset: 350*index,
            index: index
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <BandContainer>
                <Band>
                    <Title>Listagem</Title>
                    <Info>{qtdeCharacters} personagens</Info>
                </Band>
            </BandContainer>
            <ContentContainer>

                <ContainerSearchBar>
                    <SearchBar
                        handleFilteredCharacteres={handleFilteredCharacteres}
                        checkIsSearching={checkIsSearching}
                    />
                </ContainerSearchBar>
                <FlatList
                    data={charactersToShow}
                    renderItem={renderItem}
                    extraData={likes}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={.2}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    updateCellsBatchingPeriod={20}
                    ListFooterComponent={<ActivityIndicator size={"large"} color={'#333'} />}
                />
            </ContentContainer>
        </View>)
}


