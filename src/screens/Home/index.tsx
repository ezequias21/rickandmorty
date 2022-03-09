import React, { useState, useEffect, useContext, } from "react";
import { View, FlatList, ActivityIndicator, TouchableHighlight, Text } from 'react-native';


import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SearchBar } from '../../components/SearchBar';
import { Cards } from "../../components/Cards";
import { Loading } from './style'

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

type isSearching = {
    isSearching: Boolean
}

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
         if( jsonValue != null) 
             value =  JSON.parse(jsonValue)
        } catch(e) {console.log(e)}
      
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
    const handleSearchOnBlur = () => {
        console.log("é sim")
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

    const renderItem = ({ item } : {item : Characteres}) => {

        const isLiked = likes.includes(String(item.id))
        return (
            <ListItem key={item.id}

            activeOpacity={0.6}
            underlayColor="#dddddd"
            onPress={() => navigation.navigate('Details', { id: item.id })}>

            <Cards
                data={item}
                isLiked={isLiked}
            />
        </ListItem>
          
        );
      };


    return (
        <View>
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
                        handleSearchOnBlur={handleSearchOnBlur}
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
                    ListFooterComponent={<FooterList></FooterList>}
                />
            </ContentContainer>
        </View>)
}




function FooterList() {

    return (
        <Loading >
            <ActivityIndicator size={30} color={'black'} />
        </Loading>
    )
}