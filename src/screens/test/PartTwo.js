import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, SafeAreaView, Text, Image, FlatList, StyleSheet, StatusBar, TextInput } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import hstkFetch from '../../hstkFetch';
import images from '../../../assets/images';

export default function PartTwo() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');

    const getData = async () => {
        try {
            const response = await hstkFetch('https://jsonplaceholder.typicode.com/posts');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const filterData = data.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image
                source={images.code}
                style={{
                    width: 38,
                    height: 38,
                }}
            />
            <View style={styles.textContainer}>
                <Text style={styles.idText}>{item.id}</Text>
                <Text style={styles.titleText}>{item.title}</Text>
            </View>
            <AntDesign name='right' size={24} style={styles.chevron} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                <>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by title..."
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    {filterData.length === 0 ? (
                        <Text style={styles.noResultsText}>No Results</Text>
                    ) : (
                        <FlatList
                            data={filterData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                        />
                    )}
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#292933',
    },
    item: {
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
        backgroundColor: 'white',
        opacity: 0.95,
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: 'white',
    },
    leftIcon: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        maxWidth: '50%',
    },
    idText: {
        fontSize: 16,
    },
    titleText: {
        fontSize: 14,
        color: 'black',
    },
    chevron: {
        marginLeft: 'auto',
    },
    searchInput: {
        height: 40,
        borderColor: '#DBDBDB',
        color: '#DBDBDB',
        borderWidth: 1,
        margin: 16,
        paddingLeft: 8,
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#DBDBDB',
    },
});
